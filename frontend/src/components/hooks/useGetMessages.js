import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        if (isMounted) setMessages(data); // Only set state if still mounted
      } catch (error) {
        if (isMounted) toast.error(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
