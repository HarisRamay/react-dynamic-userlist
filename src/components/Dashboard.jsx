import { useEffect, useState } from "react";
import React, { memo } from "react";

 function Dashboard() {
  console.log("Dashboard rendered");
  const [seconds, setSeconds] = useState(0);
  

  useEffect(() => {
    console.log("Timer started");

    const timer = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      console.log("Timer cleaned up");
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p>Seconds since dashboard loaded: {seconds}</p>
    </div>
  );
}

export default memo(Dashboard);