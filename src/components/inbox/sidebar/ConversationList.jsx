import Model from "./Model";
import SendMessageIcon from "../../ui/SendMessageIcon";
import ConversationItem from "./ConversationItem";
import { useState } from "react";

const ConversationList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 p-4 border-b border-gray-300 flex md:justify-end justify-center">
        <SendMessageIcon onClick={handleModelIsOpen} />
      </div>
      <ul className="overflow-auto">
        <ConversationItem />
      </ul>
      <Model open={isOpen} control={handleModelIsOpen} />
    </div>
  );
};

export default ConversationList;
