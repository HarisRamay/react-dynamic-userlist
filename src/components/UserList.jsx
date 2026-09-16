import UserCard from "./UserCard";

export default function UserList({ users, onToggle }) {
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