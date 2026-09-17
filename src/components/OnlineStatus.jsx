import { useEffect, useState } from "react";
import React, { memo } from "react";
function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  console.log("Rendering OnlineStatus:");

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Subscribe
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <p>{isOnline ? "Online" : "Offline"}</p>;
}
export default memo(OnlineStatus);