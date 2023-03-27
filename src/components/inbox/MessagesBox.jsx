import MessagesBoxHeader from "./MessagesBoxHeader";
import Messages from "./Messages";
import Options from "./Options";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../features/messages/messagesApi";
import Error from "../ui/Error";

const MessagesBox = () => {
  const { id } = useParams();

  const {
    data: messages,
    isLoading,
    isError,
    isSuccess,
  } = useGetMessagesQuery(id);

  // decided what to render
  let content;
  if (isLoading) {
    content = <h3>Loading.....</h3>;
  }
  if (isError) {
    content = <Error message="Some error occurred" />;
  }
  if (isSuccess && messages?.length === 0) {
    content = <h3>You have no message !</h3>;
  }
  if (isSuccess && messages?.length > 0) {
    content = (
      <>
        <MessagesBoxHeader messages={messages[0]} />
        <Messages messages={messages} />
        <Options info={messages[0]} />
      </>
    );
  }

  return content;
};

export default MessagesBox;
