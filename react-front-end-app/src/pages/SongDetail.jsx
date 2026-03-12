import { getSongById } from "@/services/songService";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";


export default function SongDetail() {
    const [songDetails, setSongDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const songDetails = await getSongById(id);
                setSongDetails(songDetails.data);
            } catch (error) {
                setError("Failed to load Song details")
            } finally {
                setIsLoading(false);
            }
        }
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
        <div>

        </div>
    )

}