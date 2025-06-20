import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

const useFetchUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/user/${userId}`);
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
