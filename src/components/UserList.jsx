import UserCard from "./UserCard";
import { memo } from "react";
 function UserList({ users, onToggle }) {
  console.log("Rendering UserList:", users.length);
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default memo(UserList);