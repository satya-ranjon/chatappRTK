import { useState } from "react";
import { useGetUserQuery } from "../../../features/users/usersApi";
import isValidEmail from "../../../utils/isValidEmail";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import InputTextarea from "../../ui/InputTextarea";
import Error from "../../ui/Error";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import conversationsApi, {
  useAddConversationMutation,
  useEditConversationMutation,
} from "../../../features/conversations/conversationApi";

const Model = ({ open, control }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [useChecked, setUserChecked] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [conversation, setConversation] = useState(undefined);

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  const dispatch = useDispatch();

  const { data: partner } = useGetUserQuery(email, {
    skip: !useChecked,
  });

  const [addConversation, { isSuccess: addSuccess, isLoading: addIsLoading }] =
    useAddConversationMutation();
  const [
    editConversation,
    { isSuccess: editSuccess, isLoading: editIsLoading },
  ] = useEditConversationMutation();

  const debounce = (fun, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    if (isValidEmail(value)) {
      setUserChecked(true);
      setEmail(value);
    }
  };

  const handleSearch = debounce(doSearch, 500);

  useEffect(() => {
    if (partner?.length > 0 && partner[0]?.email !== myEmail) {
      // check conversation existence
      dispatch(
        conversationsApi.endpoints.getConversation.initiate({
          userEmail: myEmail,
          participantEmail: email,
        })
      )
        .unwrap()
        .then((data) => {
          setConversation(data);
        })
        .catch((err) => {
          setResponseError("There was a problem!");
        });
    }
  }, [partner]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (conversation?.length > 0) {
      editConversation({
        sender: myEmail,
        id: conversation[0].id,
        data: {
          participants: `${myEmail}-${partner[0].email}`,
          users: [loggedInUser, partner[0]],
          message,
          timestamp: new Date().getTime(),
        },
      });
    }
    if (conversation?.length === 0) {
      addConversation({
        sender: myEmail,
        data: {
          participants: `${myEmail}-${partner[0].email}`,
          users: [loggedInUser, partner[0]],
          message,
          timestamp: new Date().getTime(),
        },
      });
    }
  };

  useEffect(() => {
    if (addSuccess || editSuccess) {
      // setEmail("");
      // setMessage("");
      control();
    }
  }, [addSuccess, editSuccess]);

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer">
          X
        </div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                type="email"
                placeholder="Send to"
                name="email"
                className="rounded-t-md"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <InputTextarea
                type="text"
                name="message"
                className="rounded-b-md"
                placeholder="Messages"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              disabled={
                conversation === undefined ||
                (partner?.length > 0 && partner[0].email === myEmail) ||
                partner?.length === 0 ||
                message === "" ||
                addIsLoading ||
                editIsLoading
              }>
              Send Message
            </Button>
            {partner?.length === 0 && <Error message="User not found !" />}
            {partner?.length > 0 && partner[0].email === myEmail && (
              <Error message="You can not send message to yourself!" />
            )}
            {responseError && <Error message={responseError} />}
          </form>
        </div>
      </>
    )
  );
};

export default Model;
