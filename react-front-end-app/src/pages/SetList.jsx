import { getAllSongs } from "@/services/songService";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import SongCard from "@/components/SongCard";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 py-12 gap-4">
        {songs.map((song) => (
            <SongCard song={song} key={song.id} />
        ))}
    </div>
  </main>

  )
}
