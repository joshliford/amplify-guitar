import { completeLesson, getLessonById } from "@/services/lessonService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

export default function LessonDetail() {
  const [lessonDetails, setLessonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  // destructure parameter for the returned object
  const { id } = useParams();

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const lessonData = await getLessonById(id);
        setLessonDetails(lessonData.data);
        setCompleted(lessonData.data.completed);
      } catch (error) {
        if (error.response?.status === 409) {
          // lesson already complete, update UI to reflect this
          setCompleted(true);
        } else {
          setError("Failed to load lesson details");
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessonData();
  }, [id]);

  // lessons have sections that are seeded using headings
  // use JSON.parse to parse the response so we can extract each section individually
  const lessonSections = lessonDetails ? JSON.parse(lessonDetails.content) : [];

  const handleCompleteLesson = async () => {
    try {
      await completeLesson(id);
      setCompleted(true);
    } catch (error) {
      setError("Failed to complete lesson");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-(--bg-base)">
        <LoadingSpinner page={"Lesson"} />
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
    <main className="flex flex-col items-center min-h-screen px-8 py-16 bg-(--bg-base)">
      <ScrollProgress />
      <div className="flex flex-col w-2/3 border bg-(--bg-surface) rounded-xl min-h-screen gap-4 px-10 py-12 border-primary transition-all duration-300">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-1">
            <div className="group flex flex-row gap-3 hover:rounded-full hover:bg-(--bg-elevated)/90 transition-all duration-300 text-accent px-2 py-1 w-fit cursor-pointer">
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <button
                className="text-sm cursor-pointer"
                onClick={() => navigate("/jamroom")}
              >
                Back to JamRoom
              </button>
            </div>
          </div>
          <h1 className="flex-1 text-center text-2xl text-(--text-high) underline underline-offset-4 decoration-primary">
            {lessonDetails.title}
          </h1>
          <span className="flex-1 text-right font-bold text-accent text-sm">
            +{lessonDetails.xpReward} XP
          </span>
        </div>
        <div className="flex flex-col px-16 py-12 gap-10">
          <p className="text-center text-(--text-med) text-sm leading-relaxed">
            {lessonDetails.description}
          </p>
          {/* map over each section and render content based on section type */}
          <div className="flex flex-col text-(--text-med) leading-relaxed gap-10">
            {lessonSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-(--text-high) font-semibold mb-2">
                  {section.heading}
                </h3>
                {section.text && <p>{section.text}</p>}
                {section.list && (
                  <ul className="list-decimal">
                    {section.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.videoUrl && (
                  <div className="w-full aspect-video">
                    <iframe
                      src={section.videoUrl}
                      title="Lesson Video"
                      className="w-full h-full rounded-xl shadow-xl"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className={`text-lg rounded-full hover:rounded-full hover:bg-(--bg-elevated)/90 hover:text-primary hover:cursor-pointer text-(--text-high) px-2 py-0.5 w-fit transition-colors duration-300 ${completed ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
            onClick={() => {
              handleCompleteLesson();
            }}
            disabled={completed}
          >
            {completed ? "Lesson Complete!" : "Click to Complete Lesson"}
          </button>
        </div>
      </div>
    </main>
  );
}
