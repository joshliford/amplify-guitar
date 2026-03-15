import SectionCard from "@/components/SectionCard";
import { getAllGoals } from "@/services/practiceGoalsService";
import {
  endSession,
  getTotalPracticeTime,
  startSession,
} from "@/services/practiceSessionService";
import { ChartSpline, Save, Timer } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Select, Label, Field, Textarea } from "@headlessui/react";
import LoadingSpinner from "@/components/LoadingSpinner";

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
        // parallel fetching using Promise.all for faster load times
        const [goalsData, practiceTimeData] = await Promise.all([
          getAllGoals(),
          getTotalPracticeTime(),
        ]);
        setGoals(goalsData.data);
        setSelectedGoalId(goalsData.data[0]);
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
      // initialize session on backend only when starting timer for the first time
      if (sessionId === null) {
        const response = await startSession(selectedGoalId.id);
        setSessionId(response.data.id);
      }
      // subract runTime from current time to allow resuming the timer
      const startTime = Date.now() - runTime;
      // store interval ID in a Ref to persist across re-renders
      intervalRef.current = setInterval(() => {
        // gives total runtime since the start of the timer
        setRunTime(Date.now() - startTime);
      }, 10); // executes the callback every 10 ms for ms UI display
      setIsRunning(true);
    }
  };

  const handleSaveSession = async () => {
    try {
      // convert to seconds to align with backend logic
      const durationInSeconds = Math.floor(runTime / 1000);
      // complete (partially update (PATCH)) the existing session by updating records with notes and duration
      await endSession(sessionId, notes, durationInSeconds);
      setSessionComplete(true);
      // refresh total practice time to reflect newly completed session
      const updatedTime = await getTotalPracticeTime();
      setTotalPracticeTime(updatedTime.data);
    } catch (error) {
      setError("Failed to save practice session");
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setRunTime(0);
    setIsRunning(false);
    setSessionId(null);
    setSessionComplete(false);
  };

  // slice(-2) adds a leading 0 for formatting (i.e. 00:00:00)
  const formatTime = (time) => {
    const minutes = ("0" + Math.floor(time / 60000)).slice(-2);
    const seconds = ("0" + Math.floor((time % 60000) / 1000)).slice(-2);
    const milliseconds = ("0" + Math.floor((time % 1000) / 10)).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // format seconds from the backend into readable string for better UI/UX
  const formatTotalTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // conditionally hide hours or minutes if they are 0 for better UI/UX
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const canSaveSession = !isRunning && runTime > 0 && !sessionComplete;

  if (isLoading) {
    return <LoadingSpinner page={"The Shed"}/>
  }

  return (
    <main className="grid grid-cols-2 min-h-screen bg-(--bg-base) py-12 px-16 gap-10">
      {/* left side practice timer */}
      <div className="col-span-1 flex flex-col">
        <SectionCard title={"Practice Timer"} icon={<Timer size={25} />}>
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
        <SectionCard title={"Session Details"} icon={<ChartSpline size={25} />}>
          <p className="text-xs tracking-widest text-(--text-med)">
            TOTAL PRACTICE TIME
          </p>
          <div className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-(--bg-elevated) border">
            <div>
              <p className="text-(--text-high) font-semibold">
                {/* backend expects format in seconds */}
                {formatTotalTime(totalPracticeTime)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center w-full py-12">
            <Field className="w-full">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-xs tracking-widest text-(--text-med)">
                  PRACTICE GOAL
                </p>
                <Select
                  name="practice-goal"
                  className="w-full hover:cursor-pointer dark:hover:bg-[#313131] hover:bg-(--bg-elevated) border hover:border-primary/50 rounded-xl bg-(--bg-elevated) text-(--text-high) px-3 py-1 duration-300 transition-all"
                  defaultValue="Free Play"
                  value={selectedGoalId?.id}
                  // find and store full goal object & cast value to Number for comparison since e.target.value is always a string
                  onChange={(e) =>
                    setSelectedGoalId(
                      goals.find((goal) => goal.id === Number(e.target.value)),
                    )
                  }
                >
                  {goals.map((goal, index) => (
                    <option key={index} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </Select>
                {selectedGoalId?.title !== "Free Play" && (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                    <span className="text-(--text-med) text-xs">
                      Required duration:
                    </span>
                    <span className="text-accent text-xs font-semibold">{selectedGoalId?.durationInMinutes} minutes</span>
                    </div>
                    <div>
                      <span className="text-(--text-med) text-xs">XP reward: </span>
                      <span className="text-accent text-xs font-semibold">+{selectedGoalId?.xpReward} XP</span>
                    </div>
                  </div>
                )}
              </div>
            </Field>
          </div>

          <div className="w-full items-center mt-6">
            <Field>
              <Label className="text-xs tracking-widest text-(--text-med)">
                SESSION NOTES
              </Label>
              <Textarea
                className="mt-3 block px-3 py-1.5 w-full rounded-lg text-md bg-(--bg-elevated) border text-(--text-high) data-focus:outline-1 data-focus:outline-primary/50 placeholder:text-sm"
                rows={8}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What are you working on? Chord changes, a new scale, practicing a song..."
              />
            </Field>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mt-4">{error}</p>
          )}
          {sessionComplete && (
            <p className="text-green-400 text-sm text-center mt-4">Session saved!</p>
          )}
          <div className="group flex justify-center mt-6 mb-2">
            <button
              disabled={!canSaveSession}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold duration-300 transition-colors ${!canSaveSession ? "cursor-not-allowed bg-(--bg-elevated) text-(--text-low) opacity-50" : "cursor-pointer bg-primary hover:bg-primary/70"}`}
              onClick={() => handleSaveSession()}
            >
              <Save size={18} />
              {canSaveSession ? "Save Session" : "Start Session to Save"}
            </button>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
