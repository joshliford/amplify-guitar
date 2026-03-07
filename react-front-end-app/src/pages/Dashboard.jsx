import SectionCard from "../components/SectionCard";
import {
  BookOpen,
  Zap,
  Trophy,
  Link2,
  Clock,
  Music2,
  Flame,
  ZapIcon,
  Layers,
  Guitar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAllChords, getTotalChords } from "@/services/chordService";
import { getAllScales, getTotalScales } from "@/services/scaleService";

const StatRow = ({ icon, value, label, color }) => {
  return (
    <div className="flex justify-between border-b">
      <div className="flex flex-row gap-2 items-center mb-2">
        <span style={{ color }}>{icon}</span>
        <p>{label}</p>
      </div>
      <span>{value}</span>
    </div>
  );
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [chordCount, setChordCount] = useState(0);
  const [scaleCount, setScaleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [userData, chordsData, scalesData] = await Promise.all([
          getUser(),
          getTotalChords(),
          getTotalScales(),
        ]);
        setUser(userData.data);
        setChordCount(chordsData.data);
        setScaleCount(scalesData.data);
      } catch (error) {
        setError("Failed to load dashboard details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
    // empty dependency array so fetchUser runs once on mount
  }, []);

  if (isLoading) {
    return <LoadingSpinner page={"Dashboard"} />;
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
      <main className="grid grid-cols-3 grid-rows-2 min-h-screen items-start auto-rows-auto gap-4 bg-[#eff2f1] dark:bg-[#1a2536] py-12 px-16">
        {/* Left user card */}
        <SectionCard
          title={`Welcome back, ${user.displayName}!`}
          icon={<Zap size={20} />}
          className="col-span-2"
        >
          <div className="flex gap-6 h-full">
          {/* left side */}
          <div className="flex flex-col flex-1">
            <StatRow
              icon={<Music2 size={12} />}
              value={user.currentLevel}
              label={"Level"}
              color={"#415a77"}
            />

            <StatRow
              icon={<Flame size={12} />}
              value={user.currentStreak}
              label={"Streak"}
              color={"#415a77"}
            />

            <StatRow
              icon={<ZapIcon size={12} />}
              value={`${user.currentXp} XP`}
              label={"Current XP"}
              color={"#415a77"}
            />

            <StatRow
              icon={<BookOpen size={12} />}
              value={user.lessonsCompleted}
              label={"Lessons Completed"}
              color={"#415a77"}
            />

            <StatRow
              icon={<Guitar size={12} />}
              value={chordCount}
              label={"Chords Available"}
              color={"#415a77"}
            />

            <StatRow
              icon={<Layers size={12} />}
              value={scaleCount}
              label={"Scales Available"}
              color={"#415a77"}
            />
          </div>

          <div className="w-px bg-gray-100 dark:bg-gray-700/50 self-stretch" />

          {/* right side */}
          <div className="flex flex-col flex-1">
            <p>test</p>
          </div>
        </div>
        </SectionCard>

        {/* Top right card */}
        <SectionCard
          title={"Continue Where You Left Off"}
          icon={<BookOpen size={20} />}
          className="col-span-1 self-start"
        >
          <div className="flex justify-center">
            <p>Placeholer Text</p>
          </div>
        </SectionCard>

        {/* Bottom left card */}
        <SectionCard
          title={"Rewards"}
          icon={<Trophy size={20} />}
          className="col-span-1 self-start"
        >
          <div>
            <p>Placeholder Text</p>
          </div>
        </SectionCard>

        {/* Bottom center card */}
        <SectionCard
          title={"Quick Links"}
          icon={<Link2 size={20} />}
          className="col-span-1 self-start"
        >
          <div>
            <p>Placeholder Text</p>
          </div>
        </SectionCard>

        {/* Bottom right card */}
        <SectionCard
          title={"Recent Activity"}
          icon={<Clock size={20} />}
          className="col-span-1 self-start"
        >
          <div>
            <p>Placeholder Text</p>
          </div>
        </SectionCard>
      </main>
    );
  }
}
