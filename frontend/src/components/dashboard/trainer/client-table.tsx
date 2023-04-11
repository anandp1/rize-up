import { Fragment, useRef, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import useSWR from "swr";
import axios from "axios";

import {
  Customer,
  Message,
  TrainerInformation,
} from "../../../../interfaces/interface";

import Model from "../../model/model";
import { fetcher } from "../../../../utils/fetcher";

interface ClientTableProps {
  trainerDetails: TrainerInformation;
}

const ClientTable: React.FC<ClientTableProps> = ({
  trainerDetails,
}: ClientTableProps) => {
  const classes = {
    text: "text-left font-medium py-1",
    sentMessage:
      "text-right text-sm text-white py-1 rounded-full border border-blue-500 px-2 ml-auto bg-blue-500",
    receivedMessage:
      "text-left text-sm text-white py-1 rounded-full border border-gray-500 px-2 mr-auto bg-gray-500 opacity-95",
  };
  const [chatOpen, setChatOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [member, setMember] = useState<Customer>();

  const { data, error } = useSWR<Customer[]>(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/clients/${trainerDetails.trainerInfo.email}`,
    fetcher
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/client/chat/add`,
        {
          sender: trainerDetails.trainerInfo.email,
          receiver: member?.email,
          content: message,
          mEmail: member?.email,
          tEmail: trainerDetails.trainerInfo.email,
        }
      );

      if (response.status === 200) {
        // set data locally to avoid api call
        setChatHistory((prev) => [
          ...prev,
          {
            sender: trainerDetails.trainerInfo.email,
            receiver: member?.email ?? "",
            content: message,
            tEmail: member?.email ?? "",
            mEmail: trainerDetails.trainerInfo.email,
            time: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      alert("Failed to send message. Please try again later.");
    }
  };

  const openChatClicked = async (member: Customer): Promise<void> => {
    setMember(member);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/trainer/client/chat/history/${trainerDetails.trainerInfo.email}/${member.email}`
      );

      const sortedByDate = response.data.sort((a: Message, b: Message) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      });

      setChatHistory(sortedByDate);

      setChatOpen(true);
    } catch {
      alert("Failed to load chat history. Please try again later.");
    }
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await sendMessage();
      setMessage("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full max-h-96 overflow-y-auto">
      {chatOpen && (
        <Model open={chatOpen} setOpen={setChatOpen}>
          <h1 className="text-2xl font-bold">
            {member?.firstName} {member?.lastName}
          </h1>

          <div className="flex flex-col overflow-y-auto h-[15rem] my-4 mx-2 gap-y-1 border p-2 bg-slate-100 border-slate-100">
            {chatHistory.map((message: Message) => {
              if (message.sender === trainerDetails.trainerInfo.email) {
                return (
                  <p key={message.time} className={classes.sentMessage}>
                    {message.content}
                  </p>
                );
              } else {
                return (
                  <p key={message.time} className={classes.receivedMessage}>
                    {message.content}
                  </p>
                );
              }
            })}
          </div>
          <input
            ref={inputRef}
            className="rounded-full w-full border border-gray-500 px-2 py-1"
            placeholder="Type a message..."
            onChange={(typedMessageEvent) =>
              setMessage(typedMessageEvent.target.value)
            }
            onKeyDown={handleKeyPress}
          ></input>
        </Model>
      )}
      <div className="flex flex-col w-full mt-4">
        <div className="flex flex-row bg-slate-100">
          <div className="flex-1 px-4 py-2">
            <span>Name</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span>Email</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span>Age</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span>Gender</span>
          </div>
          <div className="flex-1 px-4 py-2"></div>
        </div>
        <div className="flex flex-row border">
          {data.map((member: Customer) => (
            <Fragment key={member.email}>
              <div className="flex-1 px-4 py-2 flex items-center truncate">
                <span>
                  {member.firstName} {member.lastName}
                </span>
              </div>
              <div className="flex-1 px-4 py-2 flex items-center truncate">
                {member.email}
              </div>
              <div className="flex-1 px-4 py-2 flex items-center">
                {member.age}
              </div>
              <div className="flex-1 px-4 py-2 flex items-center">
                {member.gender}
              </div>

              <div className="flex-1 px-4 py-2 flex items-center justify-end">
                <div className="flex">
                  <button className="mx-auto relative bg-slate-100 w-7 h-7 rounded-sm mr-2">
                    <BsChatDots
                      onClick={async () => await openChatClicked(member)}
                      className="absolute top-1.5 left-1.5"
                    />
                  </button>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
