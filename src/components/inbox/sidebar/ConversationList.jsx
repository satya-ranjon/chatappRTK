import ConversationItem from "./ConversationItem";
import { useGetConversationsQuery } from "../../../features/conversations/conversationApi";
import { useSelector } from "react-redux";
import Error from "../../ui/Error";

const ConversationList = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};

  const { data, isLoading, isError, isSuccess } =
    useGetConversationsQuery(email);

  let conversations = data || [];

  if (isSuccess && conversations?.length > 0) {
    conversations = conversations
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  // Decided what to render
  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (isError) {
    content = <Error message="Some error occurred" />;
  }
  if (isSuccess && conversations?.length === 0) {
    content = <li> You have no conversations </li>;
  }
  if (isSuccess && conversations?.length > 0) {
    content = conversations.map((conversation) => (
      <ConversationItem
        key={conversation.id}
        conversation={conversation}
        email={email}
      />
    ));
  }

  return <ul className="overflow-auto">{content}</ul>;
};

export default ConversationList;
