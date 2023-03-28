import ConversationItem from "./ConversationItem";
import conversationsApi, {
  useGetConversationsQuery,
} from "../../../features/conversations/conversationApi";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../ui/Error";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const ConversationList = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } =
    useGetConversationsQuery(email);

  let { data: conversations, totalCount } = data || {};

  // fetch more data
  const fetchMore = () => {
    setPage((prv) => prv + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        conversationsApi.endpoints.getMoreConversation.initiate({
          email,
          page,
        })
      );
    }
  }, [page, email, dispatch]);

  useEffect(() => {
    if (totalCount > 0) {
      const more =
        Math.ceil(
          totalCount / Number(import.meta.env.VITE_APP_CONVERSATIONS_PER_PAGE)
        ) > page;

      setHasMore(more);
    }
  }, [totalCount, page]);

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
    content = (
      <InfiniteScroll
        dataLength={conversations?.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={window.innerHeight - 129}>
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            email={email}
          />
        ))}
      </InfiniteScroll>
    );
  }

  return <ul className="overflow-auto">{content}</ul>;
};

export default ConversationList;
