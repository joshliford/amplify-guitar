import SectionCard from "../components/SectionCard";
import {
  Zap,
  Disc3,
  Trophy,
  Link2,
  Flame,
  Layers,
  Guitar,
  Rocket,
  CircleGauge,
  GraduationCap,
  BoomBox,
  Timer,
  ChevronRight,
  Star,
  Shield,
  Crown,
  Sparkles,
  Dumbbell,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/services/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getTotalChords } from "@/services/chordService";
import { getTotalScales } from "@/services/scaleService";
import { getAllSongs } from "@/services/songService";
import { xpForNextLevel, xpNeededToLevelUp } from "@/components/utils/xpUtils";
import XPBar from "@/components/XPBar";
import { Link } from "react-router";
import { getAllRewards, getEarnedRewards } from "@/services/rewardService";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import SongCard from "@/components/SongCard";
import { motion } from "motion/react";

// stagger timing across all child card wrappers
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// entrance animation each individual card plays when it becomes visible
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
};

// mapping of reward icon names to Lucid icons
const iconMap = {
  Star,
  Flame,
  Trophy,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Dumbbell,
  ArrowUp,
};

// inline component for displaying stats
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
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [chordCount, setChordCount] = useState(0);
  const [scaleCount, setScaleCount] = useState(0);
  const [allRewards, setAllRewards] = useState([]);
  const [earnedRewards, setEarnedRewards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          userData,
          songsData,
          chordsData,
          scalesData,
          allRewardsData,
          earnedRewardsData,
          // starts all requests in parallel rather than sequentially
        ] = await Promise.all([
          getUser(),
          getAllSongs(),
          getTotalChords(),
          getTotalScales(),
          getAllRewards(),
          getEarnedRewards(),
        ]);

        // takes song data and creates a random sort order for dashboard UI
        const shuffledSongs = [...songsData.data].sort(
          () => Math.random() - 0.5,
        );

        setUser(userData.data);
        setFeaturedSongs(shuffledSongs.slice(0, 3)); // grab the first 3 songs to display
        setChordCount(chordsData.data);
        setScaleCount(scalesData.data);
        setAllRewards(allRewardsData.data);
        setEarnedRewards(earnedRewardsData.data);
      } catch (error) {
        setError("Failed to load Dashboard details");
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
      <div className="flex flex-col bg-(--bg-base) min-h-screen">
        <p className="flex justify-center text-red-400 text-2xl mt-20">
          {error}
        </p>
      </div>
    );
  }

  if (user) {
    return (
      <motion.main
        className="grid min-h-screen auto-rows-auto bg-(--bg-base) grid-cols-1 gap-4 px-4 py-6 md:grid-cols-2 md:gap-5 md:px-6 md:py-8 lg:grid-cols-3 lg:gap-6 lg:px-16 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top user card */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-3 text-(--text-high)"
        >
          <SectionCard
            title={"Stats Overview"}
            icon={<Zap size={20} className="text-primary" />}
          >
            <div className="flex h-full flex-col gap-4 md:gap-5 lg:flex-row lg:gap-6">
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
                  icon={<Zap size={16} />}
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

              <div className="hidden lg:block w-px bg-(--bg-elevated) self-stretch" />

              {/* right side */}
              <div className="flex flex-col flex-1 justify-between gap-4">
                <div className="flex items-start justify-between gap-3 sm:items-center">
                  <div className="flex flex-col gap-2">
                    <p className="text-(--text-med)">Welcome back,</p>
                    <span className="font-bold text-3xl md:text-4xl break-all">
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
                        {xpNeededToLevelUp(user.currentXp, user.currentLevel)}{" "}
                        XP
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
        </motion.div>

        {/* middle left card */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-1 lg:col-span-2 text-(--text-high)"
        >
          <SectionCard
            title={"Rewards"}
            icon={<Trophy size={20} className="text-primary" />}
          >
            <TooltipProvider>
              <div className="flex flex-wrap gap-3 p-4 justify-center md:p-5 md:justify-between lg:p-6">
                {allRewards.map((reward) => {
                  // check if user has unlocked the specific reward
                  const isEarned = earnedRewards.some(
                    (earned) => earned.rewardId === reward.rewardId,
                  );

                  // lookup icon from iconMap using reward's icon name
                  const IconComponent = iconMap[reward.icon] || Star;

                  return (
                    <div
                      key={reward.rewardId}
                      className="flex flex-col items-center gap-1 w-14"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${isEarned ? "bg-accent border-accent" : "bg-(--bg-elevated) border-border"}`}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <IconComponent
                              size={16}
                              className={
                                isEarned ? "text-black" : "text-(--text-low)"
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>{reward.description}</TooltipContent>
                        </Tooltip>
                      </div>
                      <span
                        className={`text-[10px] text-center leading-tight ${isEarned ? "text-accent" : "text-(--text-low)"}`}
                      >
                        {reward.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>
          </SectionCard>
        </motion.div>

        {/* middle right card */}
        <motion.div variants={itemVariants} className="col-span-1">
          <SectionCard title={"Quick Links"} icon={<Link2 size={20} />}>
            <div className="flex flex-col gap-3 p-2.5 lg:flex-row">
              <Link to="/jamroom" className="flex-1">
                <div className="flex flex-col gap-2 p-4 rounded-lg border border-border hover:border-accent bg-(--bg-elevated) hover:bg-(--bg-elevated) hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BoomBox size={16} className="text-primary" />
                      <span className="font-semibold text-sm text-(--text-high)">
                        Jam Room
                      </span>
                    </div>
                    <ChevronRight size={12} className="text-(--text-low)" />
                  </div>
                  <span className="text-xs text-(--text-med)">
                    Lessons, chords & scales
                  </span>
                </div>
              </Link>

              <Link to="/shed" className="flex-1">
                <div className="flex flex-col gap-2 p-4 rounded-lg border text-start border-border hover:border-accent bg-(--bg-elevated) hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer size={16} className="text-primary" />
                      <span className="font-semibold text-sm text-(--text-high)">
                        The Shed
                      </span>
                    </div>
                    <ChevronRight size={12} className="text-(--text-low)" />
                  </div>
                  <span className="text-xs text-(--text-med)">
                    Practice timer
                  </span>
                </div>
              </Link>
            </div>
          </SectionCard>
        </motion.div>

        {/* bottom card */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-3"
        >
          <SectionCard title={"Featured Songs"} icon={<Disc3 size={20} />}>
            <div className="grid grid-cols-1 gap-4 px-1 py-2 md:grid-cols-2 md:gap-5 md:px-2 lg:grid-cols-3 lg:gap-6 lg:px-8">
              {featuredSongs.map((song) => (
                <Link
                  to={`/songs/${song.id}`}
                  key={song.id}
                  className="w-full max-w-none lg:max-w-sm lg:justify-self-center"
                >
                  <SongCard song={song} key={song.id} />
                </Link>
              ))}
            </div>
          </SectionCard>
        </motion.div>
      </motion.main>
    );
  }
}
