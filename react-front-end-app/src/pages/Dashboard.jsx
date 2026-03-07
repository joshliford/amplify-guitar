import { Link } from "react-router-dom";
import XPBar from "../components/XPBar";
import SectionCard from "../components/SectionCard";
import { dailyChallenges } from "../components/Data/dailyChallenges";
import { rewards } from "../components/Data/rewards";
import { Flame, AlarmClock, BookOpen, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { xpForNextLevel, xpNeededToLevelUp } from "@/components/utils/xpUtils";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response.data);
      } catch (error) {
        setError("Failed to load user details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
    // empty dependency array so fetchUser runs once on mount
  }, []);

  // const reward = rewards.find((r) => r.level === level);

  if (isLoading) {
    return <LoadingSpinner page={"Dashboard"}/>;
  }

  if (error) {
    return (
      <div className="flex justify-center text-red-400 text-xl mt-20">
        {error}
      </div>
    );
  }

  if (user) {
    return (
      <main className="grid grid-cols-3 grid-rows-2 min-h-screen gap-4 bg-[#eff2f1] dark:bg-[#1a2536] py-12 px-16">
        {/* Left user card */}
        <SectionCard
          title={`Welcome back, ${user.displayName}!`}
          icon={<Zap size={20} />}
          className="col-span-2 row-span-2"
        >
          <div className="flex gap-3 items-center mb-6 pb-4">
            <div className="p-2 bg-[#1F5D3D] dark:bg-[#EBD5B3] rounded-full"></div>
            <div>
              <span className="font-bold text-2xl text-[#1F5D3D] dark:text-[#EBD5B3] block"></span>
              <p className="text-sm italic dark:text-gray-300 mt-1"></p>
            </div>
          </div>
          <div className="flex justify-around items-center py-4 text-lg font-semibold mb-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-[#415a77] dark:text-[#149eca]">
                {user.currentLevel}
              </span>
              <span className="uppercase text-sm font-medium tracking-widest">
                Level
              </span>
            </div>
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="flex flex-col items-center gap-1 mt-10">
              <div className="flex items-center gap-1">
                <Flame size={20} className="fill-orange-500 animate-pulse" />
                <span className="text-4xl font-bold text-orange-500">
                  {user.currentStreak}
                </span>
              </div>
              <span className="uppercase text-sm font-medium tracking-widest">
                Streak
              </span>
            </div>
            <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-bold text-[#149eca]">
                {user.currentXp}
              </span>
              <span className="text-sm font-medium tracking-widest">XP</span>
            </div>
          </div>
          <div className="flex justify-center my-4">
            <XPBar
              xp={user.currentXp}
              xpToNextLevel={xpForNextLevel(user.currentLevel)}
            />
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-300">
            {xpForNextLevel(user.currentLevel) - user.currentXp} XP left until level {user.currentLevel + 1}
          </p>
        </SectionCard>

        {/* Top right lesson card */}
        <SectionCard title={"Lesson Suggestions"} icon={<BookOpen size={20} />}>
          <div className="flex justify-center">
            <Link to={"/jamroom"}>
              <button className="bg-[#415a77] hover:bg-[#31455a] dark:bg-[#149eca] dark:hover:bg-[#0e7ea3] text-white font-semibold py-2.5 px-6 hover:cursor-pointer rounded-lg transition-colors">
                GO TO THE JAM ROOM
              </button>
            </Link>
          </div>
        </SectionCard>
      </main>
    );
  }
}
