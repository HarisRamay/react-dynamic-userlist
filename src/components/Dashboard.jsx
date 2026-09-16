import { useEffect, useState } from "react";

export default function Dashboard() {
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