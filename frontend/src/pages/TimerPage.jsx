import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimerPage = () => {
  const startDate = new Date("2023-08-11T00:00:00");
  const targetDate = new Date("2025-10-22T00:00:00");

  // Calculate elapsed time since startDate
  const calculateTimeElapsed = () => {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  };

  // Calculate remaining time until targetDate
  const calculateTimeRemaining = () => {
    const now = new Date();
    let diff = targetDate - now;

    if (diff < 0) diff = 0;

    let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    diff -= years * 1000 * 60 * 60 * 24 * 365;

    let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.4375));
    diff -= months * 1000 * 60 * 60 * 24 * 30.4375;

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;

    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;

    let minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;

    let seconds = Math.floor(diff / 1000);

    return { years, months, days, hours, minutes, seconds };
  };

  const [elapsed, setElapsed] = useState(calculateTimeElapsed());
  const [remaining, setRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(calculateTimeElapsed());
      setRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTimeUnits = (timeObj) => {
    return [
      { label: "Years", value: timeObj.years },
      { label: "Months", value: timeObj.months },
      { label: "Days", value: timeObj.days },
      { label: "Hours", value: timeObj.hours },
      { label: "Minutes", value: timeObj.minutes },
      { label: "Seconds", value: timeObj.seconds },
    ];
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center text-pink-600 font-bold px-4">
      <h2 className="mb-6 text-3xl text-center">💕 Time Since 11th August 2023 💕</h2>
      <div className="flex flex-wrap gap-6 text-center mb-16 text-2xl">
        {renderTimeUnits(elapsed).map((unit) => (
          <div key={"elapsed-" + unit.label}>
            <AnimatePresence mode="popLayout" >
              <motion.div
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {unit.value}
              </motion.div>
            </AnimatePresence>
            <span className="text-pink-400 text-lg">{unit.label}</span>
          </div>
        ))}
      </div>

      <h2 className="mb-6 text-3xl text-center">💖 Countdown to 22nd October 2025 💖</h2>
      <div className="flex flex-wrap gap-6 text-center text-2xl">
        {renderTimeUnits(remaining).map((unit) => (
          <div key={"remaining-" + unit.label}>
            <AnimatePresence mode="popLayout" >
              <motion.div
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {unit.value}
              </motion.div>
            </AnimatePresence>
            <span className="text-pink-400 text-lg">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerPage;
