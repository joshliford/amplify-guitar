import SectionCard from "../components/SectionCard";
import {
  BookOpen,
  Zap,
  Trophy,
  Link2,
  Clock,
  Flame,
  ZapIcon,
  Layers,
  Guitar,
  Rocket,
  CircleGauge,
  GraduationCap,
  BoomBox,
  Timer,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getTotalChords } from "@/services/chordService";
import { getTotalScales } from "@/services/scaleService";
import { xpForNextLevel, xpNeededToLevelUp } from "@/components/utils/xpUtils";
import XPBar from "@/components/XPBar";
import { Link } from "react-router";

const StatRow = ({ icon, value, label, color }) => {
  return (
    <div className="flex justify-between items-center py-2.5 border-b">
      <div className="flex flex-row gap-2 items-center">
        <span style={{ color }}>{icon}</span>
        <p className="text-(--text-med)">{label}</p>
      </div>
      <span className="text-(--text-high)">{value}</span>
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
      <main className="grid grid-cols-3 grid-rows-2 min-h-screen items-start auto-rows-auto gap-4 bg-(--bg-base) py-12 px-16">
        {/* Left user card */}
        <SectionCard
          title={"Stats Overview"}
          icon={<Zap size={20} className="text-primary" />}
          className="col-span-2 text-(--text-high)"
        >
          <div className="flex gap-6 h-full">
            {/* left side */}
            <div className="flex flex-col flex-1">
              <StatRow
                icon={<CircleGauge size={16} />}
                value={user.currentLevel}
                label={"Level"}
                color={"#BB86FC"}
              />

              <StatRow
                icon={
                  <Flame size={16} fill="#fb5607" className="animate-pulse" />
                }
                value={user.currentStreak}
                label={"Daily Streak"}
                color={"#fb5607"}
              />

              <StatRow
                icon={<ZapIcon size={16} />}
                value={`${user.currentXp} XP`}
                label={"Current XP"}
                color={"#BB86FC"}
              />

              <StatRow
                icon={<GraduationCap size={16} />}
                value={user.lessonsCompleted}
                label={"Lessons Completed"}
                color={"#BB86FC"}
              />

              <StatRow
                icon={<Guitar size={16} />}
                value={chordCount}
                label={"Chords Available"}
                color={"#BB86FC"}
              />

              <StatRow
                icon={<Layers size={16} />}
                value={scaleCount}
                label={"Scales Available"}
                color={"#BB86FC"}
              />
            </div>

            <div className="w-px bg-(--bg-elevated) self-stretch" />

            {/* right side */}
            <div className="flex flex-col flex-1 justify-between">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-(--text-med)">Welcome back,</p>
                  <span className="font-bold text-2xl">
                    {user.displayName}!
                  </span>
                </div>
                <span className="rounded-full bg-accent/20 text-accent border-accent px-3 py-1 text-sm">
                  {user.currentTitle || "Beginner"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <span className="font-bold text-3xl">{user.currentXp}</span>
                  <span className="text-sm text-(--text-med)">
                    / {xpForNextLevel(user.currentLevel)} XP
                  </span>
                </div>
                <XPBar
                  xp={user.currentXp}
                  xpToNextLevel={xpForNextLevel(user.currentLevel)}
                />
                <div className="flex justify-between text-(--text-med) text-xs">
                  Level {user.currentLevel}
                  <span>
                    <span className="font-bold text-accent">
                      {xpNeededToLevelUp(user.currentXp, user.currentLevel)} XP
                    </span>{" "}
                    to level {user.currentLevel + 1}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm pt-4">
                <Rocket size={12} className="text-accent" />
                <span className="font-bold">{user.totalXp}</span>
                <span className="text-(--text-med)">total XP earned</span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Top right card */}
        <SectionCard
          title={"Continue Where You Left Off"}
          icon={<BookOpen size={20} className="text-primary" />}
          className="col-span-1 self-start text-(--text-high)"
        >
          <div className="flex justify-center">
            <p>Placeholer Text</p>
          </div>
        </SectionCard>

        {/* Bottom left card */}
        <SectionCard
          title={"Rewards"}
          icon={<Trophy size={20} className="text-primary" />}
          className="col-span-1 self-start text-(--text-high)"
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
          <div className="flex gap-3 p-4">
            <Link to="/jamroom" className="flex-1">
              <div className="flex flex-col gap-2 p-4 rounded-lg border border-border hover:border-accent bg-(--bg-elevated) hover:bg-(--bg-elevated) transition-all duration-200 cursor-pointer h-full">
                <div className="flex items-center justify-between">
                  <BoomBox size={16} className="text-primary" />
                  <span className="font-semibold text-sm text-(--text-high)">
                    Jam Room
                  </span>
                  <ChevronRight size={12} className="text-(--text-low)" />
                </div>
                <span className="text-xs text-(--text-med)">
                  Lessons, chords & scales
                </span>
              </div>
            </Link>

            <Link to="/shed" className="flex-1">
              <div className="flex flex-col gap-2 p-4 rounded-lg border text-center border-border hover:border-accent bg-(--bg-elevated) transition-all duration-200 cursor-pointer h-full">
                <div className="flex items-center justify-between">
                  <Timer size={16} className="text-primary" />
                  <span className="font-semibold text-sm text-(--text-high)">
                    The Shed
                  </span>
                  <ChevronRight size={12} className="text-(--text-low)" />
                </div>
                <span className="text-xs text-(--text-med)">
                  Practice timer
                </span>
              </div>
            </Link>
          </div>
        </SectionCard>

        {/* Bottom right card */}
        <SectionCard
          title={"Recent Activity"}
          icon={<Clock size={20} className="text-primary" />}
          className="col-span-1 self-start text-(--text-high)"
        >
          <div>
            <p>Placeholder Text</p>
          </div>
        </SectionCard>
      </main>
    );
  }
}
