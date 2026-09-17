import { useCallback, useEffect, useState } from "react";
import {
  getUsers,
  searchUsers,
  updateUserStatus,
} from "../api/usersApi";
import { initialUsers } from "../data/users";

export default function useUsers(search) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);

    getUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setUsers(initialUsers);
      return;
    }

    const controller = new AbortController();

    console.log("Search request started:", search);

    searchUsers(search, controller.signal)
      .then((data) => {
        console.log("Search request completed:", search);

        setUsers(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Search request aborted:", search);
          return;
        }

        console.error(error);
      });

    return () => {
      console.log("Aborting request:", search);

      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUser = useCallback((userId, previousStatus) => {
    const newStatus = !previousStatus;

    // Optimistic UI update
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? { ...user, active: newStatus }
          : user
      )
    );

    updateUserStatus(userId, newStatus)
      .then(() => {
        console.log("Status update successful");
      })
      .catch((error) => {
        console.error(error);

        // Rollback
        setUsers((currentUsers) =>
          currentUsers.map((user) =>
            user.id === userId
              ? { ...user, active: previousStatus }
              : user
          )
        );
      });
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    updateUser,
  };
}