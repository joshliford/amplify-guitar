import SectionCard from "@/components/SectionCard";
import { getAllGoals } from "@/services/practiceGoalsService";
import {
  endSession,
  getTotalPracticeTime,
  startSession,
} from "@/services/practiceSessionService";
import { ChartSpline, FileMusic, Timer } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Select, Label, Field, Textarea } from "@headlessui/react";

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
      setTotalPracticeTime((prev) => prev + durationInSeconds);
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

  return (
    <main className="grid grid-cols-2 min-h-screen bg-(--bg-base) py-12 px-16 gap-10">
      {/* left side practice timer */}
      <div className="col-span-1 flex flex-col">
        <SectionCard
          title={"Practice Timer"}
          icon={<Timer size={25} />}
        >
          <div className="flex flex-col items-center mx-auto bg-(--bg-elevated) rounded-xl border shadow-lg hover:shadow-xl p-12 space-y-4 m-8 w-full max-w-2xl">
            <div>
              <p className="text-5xl font-mono text-(--text-high)">
                {formatTime(runTime)}
              </p>
            </div>
            <div className="flex gap-6">
              {/* pause/start button renders depending on isRunning state */}
              <button
                onClick={handleTimer}
                className={`px-6 py-2 rounded-xl font-semibold transition
                    ${
                      isRunning
                        ? "bg-red-800 hover:bg-red-900 text-white hover:cursor-pointer"
                        : "bg-primary hover:bg-primary/70 text-white dark:text-black hover:cursor-pointer"
                    }`}
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-xl font-semibold transition bg-primary hover:bg-primary/70 text-white dark:text-black hover:cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* right side details */}
      <div className="col-span-1 flex flex-col">
        <SectionCard
          title={"Session Details"}
          icon={<ChartSpline size={25} />}
        >

          <div className="flex flex-col py-12 px-8">
            <Field>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-widest text-(--text-med)">PRACTICE GOAL</span>
                <Select
                  name="practice-goal"
                  className="hover:cursor-pointer hover:bg-[#313131] border hover:border-primary rounded-xl bg-(--bg-elevated) text-(--text-high) px-3 py-1 duration-300 transition-all"
                  defaultValue="Free Play"
                >
                  <option value={""}>Free Play</option>
                </Select>
              </div>
            </Field>
          </div>

          <div className="w-full mx-auto max-w-2xl items-center mt-6">
              <Field>
                  <Label className="text-xs tracking-widest text-(--text-med)">
                    SESSION NOTES
                  </Label>
                <Textarea
                  className="mt-3 block px-3 py-1.5 w-full rounded-lg text-md bg-(--bg-elevated) border text-(--text-high) data-focus:outline-1 data-focus:outline-primary duration-200 transition-all placeholder:text-sm"
                  rows={8}
                  placeholder="What are you working on? Chord changes, a new scale, practicing a song..."
                />
              </Field>
            </div>

            {!isRunning && runTime > 0 && !sessionComplete && (
            <div className="flex justify-center mt-6 mb-2">
              <button
                className="px-6 py-3 rounded-xl font-semibold bg-primary hover:bg-primary/70 hover:cursor-pointer duration-300 transition-colors text-white dark:text-black"
                onClick={() => handleSaveSession()}
              >
                Save Session
              </button>
            </div>
          )}


        </SectionCard>
      </div>
    </main>
  );
}
