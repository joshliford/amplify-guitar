import LoadingSpinner from "@/components/LoadingSpinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllChords } from "@/services/chordService";
import { getAllLessons } from "@/services/lessonService";
import { getAllScales } from "@/services/scaleService";
import { Layers, GraduationCap, Lock, Guitar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function JamRoom() {
  const [activeTab, setActiveTab] = useState("Lessons");
  const [selectedItem, setSelectedItem] = useState(null);
  const [chords, setChords] = useState([]);
  const [scales, setScales] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const renderDetailContent = () => {
    if (!selectedItem) {
      return null;
    }

    if (activeTab === "Lessons") {
      if (selectedItem.locked) {
        return (
          <div className="flex flex-row gap-2 items-center justify-center text-red-400">
            <Lock size={20} />
            <p>
              Lesson locked until you reach level {selectedItem.requiredLevel}
            </p>
          </div>
        );
      } else {
        return (
          <div className="flex mt-4">
            <div className="flex flex-1 group gap-2 items-center text-primary justify-center">
              <button
                className="text-xl cursor-pointer"
                onClick={() => navigate(`/lessons/${selectedItem.id}`)}
              >
                {selectedItem.completed ? "Review Lesson" : "Start Lesson"}
              </button>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        );
      }
    }

    if (activeTab === "Chords") {
      return (
        <div className="flex flex-col gap-4">
          {selectedItem.imageUrl && (
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="mx-auto max-w-[400px] p-2 bg-(--bg-elevated) dark:bg-gray-600/40 rounded-xl border border-border shadow-lg shadow-gray-300 dark:shadow-black mb-4"
            />
          )}
          <div className="flex flex-col gap-4 border-t border-accent">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-high)">
              Chord Details:
            </p>
            <p className="text-sm leading-relaxed text-(--text-med)">
              {selectedItem.details}
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t border-accent">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-high)">
              Chord Tips:
            </p>
            <p className="text-sm leading-relaxed text-(--text-med)">
              {selectedItem.tips}
            </p>
          </div>
          <div className="flex flex-col border-t border-accent gap-4">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-high)">
              Finger Positions:
            </p>
            <p className="text-sm text-(--text-med)">
              {selectedItem.fingerPositions}
            </p>
          </div>
        </div>
      );
    }

    if (activeTab === "Scales") {
      return (
        <div className="flex flex-col gap-4">
          {selectedItem.imageUrl && (
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="mx-auto max-w-[400px] bg-(--bg-elevated) rounded-xl border border-border shadow-lg shadow-gray-300 dark:shadow-black mb-4"
            />
          )}
          <div className="flex flex-col gap-4 border-t border-[#e76f51]">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-high)">
              Scale Details:
            </p>
            <p className="text-sm leading-relaxed text-(--text-med)">
              {selectedItem.details}
            </p>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#e76f51]">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-high)">
              Scale Tips:
            </p>
            <p className="text-sm leading-relaxed text-(--text-med)">
              {selectedItem.tips}
            </p>
          </div>
          <div className="flex flex-col border-t border-[#e76f51] gap-4">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-high)">
              Position:
            </p>
            <p className="text-sm text-(--text-med)">{selectedItem.position}</p>
          </div>
        </div>
      );
    }
  };

  const tabData = {
    Lessons: {
      headerDesc: "Guided lessons to build your skills",
      color: "#BB86FC",
      bgColor: "var(--bg-elevated)",
    },
    Chords: {
      headerDesc: "Master chord shapes and transitions",
      color: "#E09F3E",
      bgColor: "var(--bg-elevated)",
    },
    Scales: {
      headerDesc: "Unlock the fretboard with scales",
      color: "#e76f51",
      bgColor: "var(--bg-elevated)",
    },
  };

  const currentTab = tabData[activeTab];

  // reset selectedItem to the first valid item when the active tab changes
  useEffect(() => {
    if (lessons.length === 0 && chords.length === 0 && scales.length === 0) {
      return;
    }

    if (activeTab === "Lessons") {
      let lesson = lessons.find((lesson) => !lesson.locked) || lessons[0];
      setSelectedItem(lesson);
    }

    if (activeTab === "Chords") {
      setSelectedItem(chords[0]);
    }

    if (activeTab === "Scales") {
      setSelectedItem(scales[0]);
    }
  }, [activeTab, lessons, chords, scales]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // fetch all 3 datasets in parellel
        const [chordsData, scalesData, lessonsData] = await Promise.all([
          getAllChords(),
          getAllScales(),
          getAllLessons(),
        ]);
        // extract data from axios response above
        setChords(chordsData.data);
        setScales(scalesData.data);
        setLessons(lessonsData.data);
        if (lessonsData.data.length > 0) {
          setSelectedItem(lessonsData.data[0]);
        }
      } catch (error) {
        setError("Failed to load JamRoom data");
      } finally {
        setIsLoading(false);
      }
    };
    // invoke on component mount
    fetchAllData();
  }, []);

  const getFilteredItems = () => {
    let items =
      activeTab === "Lessons"
        ? lessons
        : activeTab === "Chords"
          ? chords
          : scales;

    if (difficultyFilter !== "All") {
      items = items.filter((item) => item.difficulty === difficultyFilter);
    }

    return items;
  };

  if (isLoading) {
    return <LoadingSpinner page={"Jam Room"} />;
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
    <main className="grid grid-cols-[500px_1fr] min-h-screen px-8 py-10 gap-8 bg-(--bg-base)">
      {/* Header */}
      <div className="col-span-2 flex flex-row justify-center items-center">
        <Tabs defaultValue="lessons">
          <TabsList className="px-1.5 py-5.5 gap-2 text-(--text-high) bg-(--bg-base)">
            <TabsTrigger
              className="px-3 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/60 duration-300 transition-colors"
              value="lessons"
              onClick={() => setActiveTab("Lessons")}
              style={
                activeTab === "Lessons"
                  ? {
                      backgroundColor: tabData.Lessons.color,
                      borderColor: tabData.Lessons.bgColor,
                      color: "black",
                    }
                  : {}
              }
            >
              Lessons
            </TabsTrigger>
            <TabsTrigger
              className="px-3 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/60 duration-300 transition-colors"
              value="chords"
              onClick={() => setActiveTab("Chords")}
              style={
                activeTab === "Chords"
                  ? {
                      backgroundColor: tabData.Chords.color,
                      borderColor: tabData.Chords.color,
                      color: "black",
                    }
                  : {}
              }
            >
              Chords
            </TabsTrigger>
            <TabsTrigger
              className="px-3 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700/60 duration-300 transition-colors"
              value="scales"
              onClick={() => setActiveTab("Scales")}
              style={
                activeTab === "Scales"
                  ? {
                      backgroundColor: tabData.Scales.color,
                      borderColor: tabData.Scales.color,
                      color: "black",
                    }
                  : {}
              }
            >
              Scales
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* Left pannel */}
      <div
        className="flex flex-col rounded-xl border bg-(--bg-surface) shadow-lg hover:shadow-xl overflow-hidden"
        style={{
          "--tab-color": currentTab.color,
          "--tab-bg": currentTab.bgColor,
          borderColor: currentTab.color,
        }}
      >
        <div className="flex flex-col gap-4 max-h-[calc(100vh-150px)] overflow-y-auto [scrollbar-gutter:stable]">
          <div
            className="rounded-t-xl px-4 py-4 flex flex-col gap-3"
            style={{ backgroundColor: currentTab.bgColor }}
          >
            <div className="flex flex-row justify-between">
              <div>
                <p className="uppercase text-xs tracking-wide text-(--text-low)">
                  Browse
                </p>
                <p className="mt-1 text-xs text-(--text-high)">
                  {currentTab.headerDesc}
                </p>
              </div>
              {activeTab === "Lessons" && (
                <p className="text-accent text-sm font-bold">
                  {lessons.filter((lesson) => lesson.completed).length}/
                  {lessons.length} complete
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {["All", "BEGINNER", "INTERMEDIATE", "ADVANCED"].map(
                (difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setDifficultyFilter(difficulty)}
                    className={`text-xs font-medium rounded-full py-1 px-3 border transition-all cursor-pointer ${
                      difficultyFilter === difficulty
                        ? "bg-(--tab-color) text-black border-(--tab-color)"
                        : "bg-(--bg-surface) text-(--text-high) border-border hover:border-(--tab-color) hover:text-(--tab-color)"
                    }`}
                  >
                    {difficulty === "All"
                      ? "All"
                      : difficulty.charAt(0) +
                        difficulty.slice(1).toLowerCase()}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="px-6 py-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {getFilteredItems().map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`rounded-lg border-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:border-(--tab-color) ${
                      selectedItem?.id === item.id
                        ? "border-(--tab-color) border-l-4 -translate-y-1 shadow-lg"
                        : "border-border"
                    }`}
                  >
                    <div className="p-2 flex flex-row justify-between">
                      <p className="font-semibold text-(--text-high)">
                        {item.title}
                      </p>
                      {item.xpReward && (
                        <span className="font-bold text-xs text-accent">
                          +{item?.xpReward} XP
                        </span>
                      )}
                    </div>
                    <div>
                      <span
                        className={`text-xs font-medium rounded-full py-0.5 px-2 ml-1 mb-2 w-fit inline-block bg-(--bg-elevated) text-primary`}
                      >
                        {item.difficulty.charAt(0) +
                          item.difficulty.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Right pannel */}
      <div
        className="flex flex-col rounded-xl border bg-(--bg-surface) hover:shadow-xl overflow-hidden"
        style={{ borderColor: currentTab.color }}
      >
        <div className="flex flex-col gap-6 px-8 py-8 max-h-[calc(100vh-150px)] overflow-y-auto">
          <div className="flex flex-row justify-between text-sm text-(--text-med)">
            {activeTab === "Lessons" ? (
              <div
                className="flex flex-row gap-2"
                style={{ color: currentTab.color }}
              >
                <GraduationCap size={20} />
                <p className="text-sm font-semibold tracking-wide">Lessons</p>
              </div>
            ) : activeTab === "Chords" ? (
              <div
                className="flex flex-row gap-2"
                style={{ color: currentTab.color }}
              >
                <Guitar size={20} />
                <p className="text-sm font-semibold tracking-wide">Chords</p>
              </div>
            ) : (
              <div
                className="flex flex-row gap-2"
                style={{ color: currentTab.color }}
              >
                <Layers size={20} />
                <p className="text-sm font-semibold tracking-wide">Scales</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <p className="text-3xl font-semibold tracking-wide text-(--text-high)">
                {selectedItem?.title}
              </p>
              {activeTab !== "Lessons" && (
                <p className="text-xs text-gray-500">
                  Tip: Notes indicated with the
                  <span className="text-[#03DAC6] ml-1 font-semibold">
                    teal circle
                  </span>{" "}
                  are "root" notes.
                </p>
              )}
            </div>
            <div className="flex flex-row justify-between">
              <span
                className={`text-xs font-medium rounded-full py-0.5 px-2 w-fit inline-block bg-(--bg-elevated) text-primary`}
              >
                {selectedItem?.difficulty.charAt(0) +
                  selectedItem?.difficulty.slice(1).toLowerCase()}
              </span>
              {selectedItem.xpReward && (
                <span className="text-xs text-accent font-bold">
                  +{selectedItem.xpReward} XP
                </span>
              )}
            </div>
            <p className="text-sm text-(--text-med)">
              {selectedItem.description}
            </p>
          </div>
          {renderDetailContent()}
        </div>
      </div>
    </main>
  );
}
