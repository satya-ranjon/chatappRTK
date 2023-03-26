import Model from "./Model";
import SendMessageIcon from "../../ui/SendMessageIcon";
import { useState } from "react";
import ConversationList from "./ConversationList";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 p-4 border-b border-gray-300 flex md:justify-end justify-center">
        <SendMessageIcon onClick={handleModelIsOpen} />
      </div>
      <ConversationList />
      <Model open={isOpen} control={handleModelIsOpen} />
    </div>
  );
};

export default SideBar;
