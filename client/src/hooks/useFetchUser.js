import { useEffect, useState } from "react";
import axios from "axios";

const useFetchUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://192.168.29.102:4000/api/user/${userId}`
        );
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  return { user, loading };
};

export default useFetchUser;
