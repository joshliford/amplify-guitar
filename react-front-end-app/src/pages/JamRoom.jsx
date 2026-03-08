import LoadingSpinner from "@/components/LoadingSpinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllChords } from "@/services/chordService";
import { getAllLessons } from "@/services/lessonService";
import { getAllScales } from "@/services/scaleService";
import { Layers, GraduationCap, Lock, Guitar } from "lucide-react";
import { useEffect, useState } from "react";

export default function JamRoom() {
  const [activeTab, setActiveTab] = useState("Lessons");
  const [selectedItem, setSelectedItem] = useState(null);
  const [chords, setChords] = useState([]);
  const [scales, setScales] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const renderDetailContent = () => {
    if (!selectedItem) {
      return null;
    }

    if (activeTab === "Lessons") {
      if (selectedItem.locked) {
        return (
          <div className="flex flex-row gap-4 text-red-500">
            <Lock size={30} />
            <p>
              Lesson locked until you reach level {selectedItem.requiredLevel}
            </p>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col">
            <span>+{selectedItem.xpReward} XP</span>
            <p>{selectedItem.content}</p>
            {selectedItem.videoUrl && <iframe src={selectedItem.videoUrl} />}
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
              className="mx-auto max-w-[400px]"
            />
          )}
          <div className="flex flex-col gap-4 border-t border-border">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-med)">
              Chord Details:
            </p>
            <p className="text-sm leading-relaxed">{selectedItem.details}</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-border">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-med)">
              Chord Tips:
            </p>
            <p className="text-sm leading-relaxed">{selectedItem.tips}</p>
          </div>
          <div className="flex flex-col border-t border-border gap-4">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-med)">
              Finger Positions:
            </p>
            <p className="text-sm">{selectedItem.fingerPositions}</p>
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
              className="mx-auto max-w-[400px]"
            />
          )}
          <div className="flex flex-col gap-4 border-t border-border">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-med)">
              Scale Details:
            </p>
            <p className="text-sm leading-relaxed">{selectedItem.details}</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-border">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-med)">
              Scale Tips:
            </p>
            <p className="text-sm leading-relaxed">{selectedItem.tips}</p>
          </div>
          <div className="flex flex-col border-t border-border gap-4">
            <p className="mt-6 text-xs uppercase tracking-wide font-semibold text-(--text-med)">
              Position:
            </p>
            <p className="text-sm">{selectedItem.position}</p>
          </div>
        </div>
      );
    }
  };

  const tabData = {
    Lessons: {
      headerDesc: "Guided lessons to build your skills",
      color: "#415a77",
      bgColor: "#2A2A2A",
    },
    Chords: {
      headerDesc: "Master chord shapes and transitions",
      color: "#03DAC6",
      bgColor: "#2A2A2A",
    },
    Scales: {
      headerDesc: "Unlock the fretboard with scales",
      color: "#e76f51",
      bgColor: "#2A2A2A",
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
      <div>
        <p className="flex justify-center text-red-400 text-xl mt-20">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-[500px_1fr] px-8 py-10 gap-8 bg-(--bg-base)">
      {/* Header */}
      <div className="col-span-2 flex flex-row gap-16 items-center">
        <p className="text-2xl font-semibold text-(--text-high)">Jam Room</p>
        <Tabs defaultValue="lessons">
          <TabsList className="px-1.5 py-5.5 text-(--text-high)">
            <TabsTrigger
              className="px-4 py-4"
              value="lessons"
              onClick={() => setActiveTab("Lessons")}
            >
              Lessons
            </TabsTrigger>
            <TabsTrigger
              className="px-4 py-4"
              value="chords"
              onClick={() => setActiveTab("Chords")}
            >
              Chords
            </TabsTrigger>
            <TabsTrigger
              className="px-4 py-4"
              value="scales"
              onClick={() => setActiveTab("Scales")}
            >
              Scales
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* Left pannel */}
      <div
        className="flex flex-col rounded-xl border-2 bg-(--bg-surface) shadow-lg hover:shadow-xl overflow-hidden"
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
                <p className="mt-1 text-xs text-(--text-high)">{currentTab.headerDesc}</p>
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
                        ? "bg-(--tab-color) text-white border-(--tab-color)"
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
                      <p className="font-semibold">{item.title}</p>
                      {item.xpReward && (
                        <span className="font-bold text-xs text-accent">
                          +{item?.xpReward} XP
                        </span>
                      )}
                    </div>
                    <div>
                      <span
                        className={`text-xs font-medium rounded-full py-0.5 px-2 ml-1 mb-2 w-fit inline-block ${item.difficulty === "BEGINNER" ? "bg-green-50 text-green-700" : item.difficulty === "INTERMEDIATE" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}
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
        className="flex flex-col rounded-xl border-2 bg-(--bg-surface) hover:shadow-xl overflow-hidden"
        style={{ borderColor: currentTab.color }}
      >
        <div className="flex flex-col gap-6 px-8 py-8 max-h-[calc(100vh-150px)] overflow-y-auto">
          <div className="flex flex-row justify-between text-sm text-(--text-med)">
            {activeTab === "Lessons" ? (
              <div className="flex flex-row gap-2" style={{color: currentTab.color}}>
                <GraduationCap size={20} />
                <p className="text-sm">Lessons</p>
              </div>
            ) : activeTab === "Chords" ? (
              <div className="flex flex-row gap-2" style={{color: currentTab.color}}>
                <Guitar size={20} />
                <p className="text-sm">Chords</p>
              </div>
            ) : (
              <div className="flex flex-row gap-2" style={{color: currentTab.color}}>
                <Layers size={20} />
                <p className="text-sm">Scales</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
              <p className="text-3xl font-semibold tracking-wide">
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
            <span
              className={`text-xs font-medium rounded-full py-0.5 px-2 w-fit inline-block ${selectedItem?.difficulty === "BEGINNER" ? "bg-green-50 text-green-700" : selectedItem?.difficulty === "INTERMEDIATE" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"}`}
            >
              {selectedItem?.difficulty.charAt(0) +
                selectedItem?.difficulty.slice(1).toLowerCase()}
            </span>
            <p className="text-sm text-(--text-med)">{selectedItem.description}</p>
          </div>
          {renderDetailContent()}
        </div>
      </div>
    </main>
  );
}
