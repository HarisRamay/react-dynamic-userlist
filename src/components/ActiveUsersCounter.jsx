export default function ActiveUsersCounter({ users }) {
  const activeUsers = users.filter((user) => user.active).length;

  return (
    <div className="counter">
      Active Users: <strong>{activeUsers}</strong>
    </div>
  );
}