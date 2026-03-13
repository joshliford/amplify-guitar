import { getSongById } from "@/services/songService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";

export default function SongDetail() {
  const [songDetails, setSongDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const songDetails = await getSongById(id);
        setSongDetails(songDetails.data);
      } catch (error) {
        setError("Failed to load Song details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-(--bg-base)">
        <LoadingSpinner page={"Song Details"} />
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
    <main className="bg-(--bg-base) flex flex-col">
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center blur-xs scale-110"
          style={{ backgroundImage: `url(${songDetails.albumCoverUrl})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center shadow-md">
          <h2 className="text-4xl font-bold text-center text-white dark:text-(--text-high)">
            {songDetails.title}
          </h2>
          <div className="flex flex-row items-center justify-center gap-12 text-lg dark:text-(--text-high) mt-12">
            <p className="text-white/50 dark:text-(--text-med)">
              {songDetails.artist}
            </p>
            <p className="text-white/50 dark:text-(--text-med)">
              Key: {songDetails.songKey}
            </p>
            <p className="text-white/50 dark:text-(--text-med)">
              {songDetails.releaseDate}
            </p>
          </div>
          <div className="flex mx-auto items-center mt-16">
          <div className="flex flex-1 group gap-2 items-center text-white dark:text-(--text-med) hover:text-white/70 dark:hover:text-white/70 transition-all duration-200">
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <button
              className="text-xl cursor-pointer"
              onClick={() => navigate(`/songs`)}
            >
              Back to Setlist
            </button>
          </div>
        </div>
        </div>
      </div>
      <section className="px-8 py-6 text-(--text-high)">
        <h3 className="text-2xl font-semibold mb-2">Backstory</h3>
        <p className="leading-relaxed text-(--text-med)">{songDetails.details}</p>
      </section>
    </main>
  );
}
