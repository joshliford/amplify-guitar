import { getAllGoals } from "@/services/practiceGoalsService";
import {
  endSession,
  getTotalPracticeTime,
  startSession,
} from "@/services/practiceSessionService";
import { useEffect, useState, useRef } from "react";

export default function Shed() {
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runTime, setRunTime] = useState(0);
  const [notes, setNotes] = useState("");
  const [sessionComplete, setSessionComplete] = useState(false);
  const [totalPracticeTime, setTotalPracticeTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPracticeData = async () => {
      try {
        const [goalsData, practiceTimeData] = await Promise.all([
          getAllGoals(),
          getTotalPracticeTime(),
        ]);
        setGoals(goalsData.data);
        setTotalPracticeTime(practiceTimeData.data);
      } catch (error) {
        setError("Failed to load the Shed details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPracticeData();
  }, []);

  const intervalRef = useRef(null);

  const handleTimer = async () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      // only create new session on first start of timer
      if (sessionId === null) {
        const response = await startSession(selectedGoalId);
        setSessionId(response.data.id);
      }
      // (- runTime) = allows resuming the timer from a paused state
      const startTime = Date.now() - runTime;
      // returns an Id that identifies the running interval
      // stored in intervalRef.current later - won't be lost on re-render
      intervalRef.current = setInterval(() => {
        // gives total runtime since the start of the timer
        setRunTime(Date.now() - startTime);
        // executes the callback every 10 ms
      }, 10);
      setIsRunning(true);
    }
  };

  const handleSaveSession = async () => {
    try {
      // convert to seconds to align with backend logic
      const durationInSeconds = Math.floor(runTime / 1000);
      await endSession(sessionId, notes);
      setSessionComplete(true);
      // add new session time
      setTotalPracticeTime(prev => prev + durationInSeconds);
    } catch (error) {
      setError("Failed to save practice session");
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunTime(0);
    setIsRunning(false);
  };

  // slice(-2) adds a leading 0 for formatting (i.e. 00:00:00)
  const formatTime = (time) => {
    const minutes = ("0" + Math.floor(time / 60000)).slice(-2);
    const seconds = ("0" + Math.floor((time % 60000) / 1000)).slice(-2);
    const milliseconds = ("0" + Math.floor((time % 1000) / 10)).slice(-2);

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return <main className="mt-8 bg-(--bg-base) px-4"></main>;
}
