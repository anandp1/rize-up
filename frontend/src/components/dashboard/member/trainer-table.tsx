import { useRef, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

import Model from "../../model/model";

const TrainerTable = () => {
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

  const removeTrainerClicked = () => {
    // api to remove trainer from user
  };

  const sendMessage = () => {
    // api to send message to trainer
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
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
          <h1 className="text-2xl font-bold">Joe</h1>

          <div className="flex flex-col overflow-y-auto h-[15rem] my-4 mx-2 gap-y-1">
            <p className={classes.sentMessage}>Hello</p>
            <p className={classes.receivedMessage}>Hi back</p>
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
            <span>Clients</span>
          </div>
          <div className="flex-1 px-4 py-2">
            <span>Email</span>
          </div>
          <div className="flex-1 px-4 py-2"></div>
        </div>
        <div className="flex flex-row border">
          <div className="flex-1 px-4 py-2 flex items-center">
            <span>John Doe</span>
          </div>
          <div className="flex-1 px-4 py-2 flex items-center">15</div>
          <div className="flex-1 px-4 py-2 flex items-center">
            johndoe@example.com
          </div>
          <div className="flex-1 px-4 py-2 flex items-center justify-end">
            <div className="flex">
              <button className="mx-auto relative bg-slate-100 w-7 h-7 rounded-sm mr-2">
                <BsChatDots
                  onClick={() => setChatOpen(true)}
                  className="absolute top-1.5 left-1.5"
                />
              </button>
              <button className="mx-auto relative bg-slate-100 w-7 h-7 rounded-sm">
                <MdOutlineCancel
                  onClick={removeTrainerClicked}
                  className="absolute top-1.5 left-1.5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerTable;
