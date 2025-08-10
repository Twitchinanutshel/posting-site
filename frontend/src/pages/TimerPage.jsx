import React, { useState, useEffect } from "react";

const TimerPage = () => {
  const startDate = new Date("2023-08-11T00:00:00");

  const calculateTimeElapsed = () => {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Handle negative seconds → minutes
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }

    // Handle negative minutes → hours
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }

    // Handle negative hours → days
    if (hours < 0) {
      hours += 24;
      days--;
    }

    // Handle negative days → months
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    // Handle negative months → years
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  };

  const [elapsed, setElapsed] = useState(calculateTimeElapsed());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateTimeElapsed());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center text-pink-600 text-2xl font-bold">
      <h2 className="mb-6 text-3xl">💕 Time Since 11th August 2023 💕</h2>
      <div className="flex flex-wrap gap-4 text-center">
        <div>{elapsed.years} <span className="text-pink-400 text-lg">Years</span></div>
        <div>{elapsed.months} <span className="text-pink-400 text-lg">Months</span></div>
        <div>{elapsed.days} <span className="text-pink-400 text-lg">Days</span></div>
        <div>{elapsed.hours} <span className="text-pink-400 text-lg">Hours</span></div>
        <div>{elapsed.minutes} <span className="text-pink-400 text-lg">Minutes</span></div>
        <div>{elapsed.seconds} <span className="text-pink-400 text-lg">Seconds</span></div>
      </div>
    </div>
  );
};

export default TimerPage;
