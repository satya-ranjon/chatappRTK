import EmojiIcon from "../ui/EmojiIcon";
import SendIcon from "../ui/SendIcon";

const Options = () => {
  return (
    <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
      <EmojiIcon />

      <input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
      />
      <SendIcon />
    </div>
  );
};

export default Options;
