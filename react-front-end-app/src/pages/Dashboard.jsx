import { Link } from "react-router-dom";
import XPBar from "../components/XPBar";
import SectionCard from "../components/SectionCard";
import { dailyChallenges } from "../components/Data/dailyChallenges";
import { rewards } from "../components/Data/rewards";
import { Flame, AlarmClock, BookOpen, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { xpForNextLevel } from "@/components/utils/xpUtils";

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
    // empty dependency array so it runs once on mount
  }, []);

  // const reward = rewards.find((r) => r.level === level);

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="flex justify-center text-red-400 text-xl mt-20">{error}</div>
    );
  }

  if (user) {
    return (
      <main className="grid lg:grid-cols-2 lg:grid-rows-2 gap-4 bg-[#f9fafb] dark:bg-[#1a2536] font-['Nunito_Sans'] py-12 px-16">
        <SectionCard
          title={`Welcome Back, ${user.displayName}!`}
          icon={<Zap size={35} className="text-[#FFFEF7] dark:text-black" />}
          className="relative flex h-full flex-col"
        >
          <div className="flex gap-3 items-center mb-6 pb-4 border-b-2 border-[#D4A574] dark:border-[#EBD5B3]">
            <div className="p-2 bg-[#1F5D3D] dark:bg-[#EBD5B3] rounded-full"></div>
            <div>
              <span className="font-bold text-2xl font-['Lora'] text-[#1F5D3D] dark:text-[#EBD5B3] block"></span>
              <p className="text-sm font-['Nunito_Sans'] italic dark:text-gray-300 mt-1"></p>
            </div>
          </div>
          <div className="flex justify-between items-center text-xl font-semibold font-['Lora'] mb-4">
            <p>Level: {user.currentLevel}</p>
            <div className="flex items-center gap-2">
              <Flame size={25} className="fill-orange-500 animate-pulse" />
              <p>Streak: {user.currentStreak} (in days)</p>
            </div>
          </div>
          <div className="flex flex-row justify-between px-1 py-2 font-bold text-lg">
            <p>EXPERIENCE POINTS</p>
            <p className="text-amber-700 dark:text-[#EBD5B3]">{user.currentXp} XP</p>
          </div>
          <div className="flex justify-center my-4">
            <XPBar xp={user.currentXp} xpToNextLevel={xpForNextLevel(user.currentLevel)} />
          </div>
          <p className="text-center text-sm dark:text-gray-300">
            {user.currentXp} XP left until level {user.currentLevel + 1}
          </p>
        </SectionCard>

        <SectionCard
          title={"Lesson Suggestions"}
          icon={
            <BookOpen
              size={35}
              className="m-2 text-[#FFFEF7] dark:text-black"
            />
          }
        >
          <div className="flex justify-center">
            <Link to={"/jamroom"}>
              <button className="px-8 py-3 bg-amber-700 dark:bg-[#e5c391] dark:hover:bg-[#D4A574] dark:text-black hover:bg-amber-800 rounded-xl shadow-lg text-white hover:cursor-pointer hover:shadow-xl transition">
                GO TO THE JAM ROOM
              </button>
            </Link>
          </div>
        </SectionCard>
      </main>
    );
  }
}
