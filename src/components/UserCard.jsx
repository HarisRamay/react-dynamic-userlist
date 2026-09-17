import { memo } from "react";

function UserCard({ user, onToggle }) {
  console.log("Rendering UserCard:", user.name);

  return (
    <article className="user-card">
      <div>
        <h3>{user.name}</h3>
        <p>{user.role}</p>

        <span className={user.active ? "active" : "inactive"}>
          {user.active ? "Active" : "Inactive"}
        </span>
      </div>

      <button onClick={() => onToggle(user.id, user.active)}>
        {user.active ? "Mark Inactive" : "Mark Active"}
      </button>
    </article>
  );
}

export default memo(UserCard);