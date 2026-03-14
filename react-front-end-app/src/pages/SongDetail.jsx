import { getSongById } from "@/services/songService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
    // invoke component on mount and re-run hook on each songId change
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
    <main className="bg-(--bg-base) flex flex-col space-y-6">
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
        <p className="leading-relaxed text-(--text-med)">
          {songDetails.details}
        </p>
      </section>
      <section className="px-8 py-6">
        <h4 className="text-2xl font-semibold mb-2 text-(--text-high)">
          Chords & Scales
        </h4>
        <div className="flex flex-1 gap-12">
          <div className="">
            <p className="text-(--text-med) mb-2">Chords</p>
            <div className="flex flex-wrap gap-2">
              {songDetails.chordsUsed.split(", ").map((chord) => (
                <span
                  key={chord}
                  className="bg-(--bg-elevated) border border-accent text-accent rounded-full px-3 py-1 text-sm"
                >
                  {chord}
                </span>
              ))}
            </div>
          </div>
          <div className="">
            <p className="text-(--text-med) mb-2">Scales</p>
            <div className="flex flex-wrap gap-2">
              {songDetails.scalesUsed.split(", ").map((scale) => (
                <span
                  key={scale}
                  className="bg-(--bg-elevated) border border-primary text-primary rounded-full px-3 py-1 text-sm"
                >
                  {scale}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-6">
        <div className="flex flex-col">
          <h5 className="text-2xl font-semibold text-(--text-high)">
            Learn the Song
          </h5>
          <p className="text-sm text-(--text-low)">
            Click the tab link below to learn the song
          </p>
          <div className="flex">
            <div className="flex group mt-4 gap-2 items-center text-(--text-low) dark:text-(--text-med) hover:text-(--text-low) dark:hover:text-white/70 transition-all duration-200">
              <a
                href={songDetails.tabUrl}
                target="_blank"
                className="text-lg cursor-pointer"
              >
                View Full Tab
              </a>
              <ArrowUpRight
                size={20}
                className="group-hover:-translate-y-1 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="flex justify-center aspect-video mt-6">
            <iframe
              src={songDetails.videoUrl}
              title="Song Video"
              allowFullScreen
              className="w-[90%] h-[90%] rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
