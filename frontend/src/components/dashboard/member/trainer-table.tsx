import axios from "axios";
import { useRef, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import useSWR from "swr";

import { Customer, Message, Trainer } from "../../../../interfaces/interface";
import { fetcher } from "../../../../utils/fetcher";
import Model from "../../model/model";

interface TrainerTableProps {
  memberDetails: Customer;
}

const TrainerTable: React.FC<TrainerTableProps> = ({
  memberDetails,
}: TrainerTableProps) => {
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
  const [trainer, setTrainer] = useState<Trainer>();

  const {
    data,
    error,
    mutate: revalidateData,
  } = useSWR<Trainer[]>(
    `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/assigned/${memberDetails.email}`,
    fetcher
  );

  if (error) {
    return <div>Failed to load</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const removeTrainerClicked = async (trainerEmail: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/remove/${trainerEmail}/${memberDetails.email}`
      );

      if (response.status === 200) {
        revalidateData();
      }
    } catch {
      alert("Failed to remove trainer. Please try again later.");
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/chat/add`,
        {
          sender: memberDetails.email,
          receiver: trainer?.email,
          content: message,
          tEmail: trainer?.email,
          mEmail: memberDetails.email,
        }
      );

      if (response.status === 200) {
        // set data locally to avoid api call
        setChatHistory((prev) => [
          ...prev,
          {
            sender: memberDetails.email,
            receiver: trainer?.email ?? "",
            content: message,
            tEmail: trainer?.email ?? "",
            mEmail: memberDetails.email,
            time: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      alert("Failed to send message. Please try again later.");
    }
  };

  const openChatClicked = async (trainer: Trainer): Promise<void> => {
    setTrainer(trainer);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_RIZE_API_URL}/member/trainer/chat/history/${trainer.email}/${memberDetails.email}`
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
            {trainer?.firstName} {trainer?.lastName}
          </h1>

          <div className="flex flex-col overflow-y-auto h-[15rem] my-4 mx-2 gap-y-1 border p-2 bg-slate-100 border-slate-100">
            {chatHistory.map((message: Message) => {
              if (message.sender === memberDetails.email) {
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
            <span>Age</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span>Gender</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span>Email</span>
          </div>

          <div className="flex-1 px-4 py-2"></div>
        </div>
        {data.map((trainer) => (
          <div key={trainer.email} className="flex flex-row border">
            <div className="flex-1 px-4 py-2 flex items-center truncate">
              <span>
                {trainer.firstName} {trainer.lastName}
              </span>
            </div>
            <div className="flex-1 px-4 py-2 flex items-center">
              {trainer.age}
            </div>
            <div className="flex-1 px-4 py-2 flex items-center truncate">
              {trainer.gender}
            </div>
            <div className="flex-1 px-4 py-2 flex items-center truncate">
              {trainer.email}
            </div>
            <div className="flex-1 px-4 py-2 flex items-center justify-end">
              <div className="flex">
                <button className="mx-auto relative bg-slate-100 w-7 h-7 rounded-sm mr-2">
                  <BsChatDots
                    onClick={async () => await openChatClicked(trainer)}
                    className="absolute top-1.5 left-1.5"
                  />
                </button>
                <button className="mx-auto relative bg-slate-100 w-7 h-7 rounded-sm">
                  <MdOutlineCancel
                    onClick={async () =>
                      await removeTrainerClicked(trainer.email)
                    }
                    className="absolute top-1.5 left-1.5"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerTable;
