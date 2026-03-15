import { getAllSongs } from "@/services/songService";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import SongCard from "@/components/SongCard";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

// stagger timing across all child card wrappers
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
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

export default function SetList() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const songData = await getAllSongs();
        setSongs(songData.data);
      } catch (error) {
        setError("Failed to load Setlist details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-(--bg-base)">
        <LoadingSpinner page={"Setlist"} />
      </div>
    );
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

  return (
    <main className="bg-(--bg-base) min-h-screen">
      <motion.div
        className="grid grid-cols-1 gap-4 px-4 py-6 md:grid-cols-2 md:gap-5 md:px-6 md:py-8 lg:grid-cols-3 lg:gap-6 lg:px-10 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {songs.map((song) => (
          <motion.div key={song.id} variants={itemVariants}>
            <Link to={`/songs/${song.id}`}>
              <SongCard song={song} key={song.id} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
