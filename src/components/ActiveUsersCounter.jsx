import  React, { memo } from "react";

function ActiveUsersCounter({ users }) {
const activeUsers = users.filter((user) => user.active).length;
 console.log("Rendering ActiveUsersCounter:",typeof React);
  return (
    <div className="counter">
      Active Users: <strong>{activeUsers}</strong>
    </div>
  );
}


export default memo(ActiveUsersCounter);