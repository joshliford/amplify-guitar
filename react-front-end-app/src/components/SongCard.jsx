import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function SongCard({ song }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-cover bg-center h-64 rounded-xl hover:-translate-y-1 duration-400 transition-all"
      style={{ backgroundImage: `url(${song.albumCoverUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60 rounded-xl" />
      <div className="absolute inset-0 z-10 flex flex-col p-4 shadow-md hover:shadow-xl">
        <div className="flex flex-col items-center justify-between dark:text-(--text-high)">
          <h2 className="text-xl text-white dark:text-(--text-high)">
            {song.title}
          </h2>
          <p className="text-white dark:text-(--text-high)">{song.artist}</p>
          <div className="flex flex-col">
            <p className="text-sm text-white/50 dark:text-(--text-med)">
              {song.releaseDate}
            </p>
          </div>
        </div>
        <div className="flex mx-auto items-center mt-auto">
          <div className="flex flex-1 group gap-2 items-center text-white dark:text-(--text-high) hover:text-white/70 dark:hover:text-white/70 transition-all duration-200">
            <button
              className="text-xl cursor-pointer"
              onClick={() => navigate(`/songs/${song.id}`)}
            >
              View Song Details
            </button>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
