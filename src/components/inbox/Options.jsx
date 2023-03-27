import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEditConversationMutation } from "../../features/conversations/conversationApi";
import EmojiIcon from "../ui/EmojiIcon";
import SendIcon from "../ui/SendIcon";

const Options = ({ info }) => {
  const [message, setMessage] = useState("");
  const [editConversation, { isSuccess }] = useEditConversationMutation();

  useEffect(() => {
    if (isSuccess) {
      setMessage("");
    }
  }, [isSuccess]);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const participantUser =
    info.receiver.email !== loggedInUser.email ? info.receiver : info.sender;

  const handleSubmit = (e) => {
    e.preventDefault();
    // add conversation
    editConversation({
      id: info?.conversationId,
      sender: loggedInUser?.email,
      data: {
        participants: `${loggedInUser.email}-${participantUser.email}`,
        users: [loggedInUser, participantUser],
        message,
        timestamp: new Date().getTime(),
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <EmojiIcon />

      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendIcon />
    </form>
  );
};

export default Options;
