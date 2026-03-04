import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllChords } from "@/services/chordService";
import { getAllLessons } from "@/services/lessonService";
import { getAllScales } from "@/services/scaleService";
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

  const tabData = {
    Lessons: {
      headerDesc: "Guided lessons to build your skills",
      color: "#415a77",
      bgColor: "#eef2f7",
    },
    Chords: {
      headerDesc: "Master chord shapes and transitions",
      color: "#2a9d8f",
      bgColor: "#eef8f7",
    },
    Scales: {
      headerDesc: "Unlock the fretboard with scales",
      color: "#7b5ea7",
      bgColor: "#f3f0fa",
    },
  };

  const currentTab = tabData[activeTab];

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
    <main className="grid grid-cols-[340px_1fr] px-8 py-10 gap-8 bg-[#f9fafb]">
      {/* Header */}
      <div className="px-10 col-span-2 flex flex-row justify-between items-center">
        <p className="text-2xl font-semibold">Jam Room</p>
        <Tabs defaultValue="lessons">
          <TabsList className="px-1.5 py-5.5">
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
        className="flex flex-col gap-4 rounded-xl border-2 bg-white shadow-lg hover:shadow-xl"
        style={{ borderColor: currentTab.color }}
      >
        <div
          className="rounded-t-xl px-4 py-4 flex flex-col gap-3"
          style={{ backgroundColor: currentTab.bgColor }}
        >
          <div className="flex flex-row justify-between">
            <div>
              <p className="uppercase text-xs tracking-wide text-gray-400">
                Browse
              </p>
              <p className="mt-1 text-xs">{currentTab.headerDesc}</p>
            </div>
            {activeTab === "Lessons" && (
              <p className="text-[#e09f3e] text-sm font-bold">
                {lessons.filter((lesson) => lesson.completed).length}/
                {lessons.length} complete
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setDifficultyFilter("All")}
              className="text-xs font-medium rounded-full py-1 px-3 border transition-all cursor-pointer"
              style={
                difficultyFilter === "All"
                  ? {
                      backgroundColor: currentTab.color,
                      color: "white",
                      borderColor: currentTab.color,
                    }
                  : {
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "lightgray",
                    }
              }
            >
              All
            </button>
            <button
              onClick={() => setDifficultyFilter("BEGINNER")}
              className="text-xs font-medium rounded-full py-1 px-3 border transition-all cursor-pointer"
              style={
                difficultyFilter === "BEGINNER"
                  ? {
                      backgroundColor: currentTab.color,
                      color: "white",
                      borderColor: currentTab.color,
                    }
                  : {
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "lightgray",
                    }
              }
            >
              Beginner
            </button>
            <button
              onClick={() => setDifficultyFilter("INTERMEDIATE")}
              className="text-xs font-medium rounded-full py-1 px-3 border transition-all cursor-pointer"
              style={
                difficultyFilter === "INTERMEDIATE"
                  ? {
                      backgroundColor: currentTab.color,
                      color: "white",
                      borderColor: currentTab.color,
                    }
                  : {
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "lightgray",
                    }
              }
            >
              Intermediate
            </button>
            <button
              onClick={() => setDifficultyFilter("ADVANCED")}
              className="text-xs font-medium rounded-full py-1 px-3 border transition-all cursor-pointer"
              style={
                difficultyFilter === "ADVANCED"
                  ? {
                      backgroundColor: currentTab.color,
                      color: "white",
                      borderColor: currentTab.color,
                    }
                  : {
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "lightgray",
                    }
              }
            >
              Advanced
            </button>
          </div>
        </div>
        <div className="px-6 py-6 min-h-screen flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {getFilteredItems().map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`rounded-lg border cursor-pointer transition-all ${selectedItem?.id === item.id ? `border-[#415a77] border-2 border-l-5 shadow-lg -translate-y-1 transition-all` : `border-gray-200 hover:border-[#415a77] hover:-translate-y-1 hover:shadow-xl transition-all`}`}
                >
                  <div className="p-2 flex flex-row justify-between">
                    <p className="font-semibold">{item.title}</p>
                    {item.xpReward && (
                      <span className="font-bold text-xs text-[#e09f3e]">
                        +{item?.xpReward} XP
                      </span>
                    )}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-medium rounded-full py-0.5 px-3 mb-2 w-fit inline-block ${item.difficulty === "BEGINNER" ? "bg-[#f0faf5] text-[#2e7d5a]" : item.difficulty === "INTERMEDIATE" ? "bg-[#fff8ed] text-[#b37a2a]" : "bg-[#fdf0f0] text-[#9b3a3a]"}`}
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
      {/* Right pannel */}
      <div className="flex flex-col gap-6 px-8 py-8 rounded-xl border-2 border-[#415a77] bg-white shadow-lg hover:shadow-xl">
        <div className="flex flex-row justify-between border-b text-sm text-gray-500">
          {activeTab === "Lessons" && <p className="">Selected lesson</p>}
          <span
            className={`text-xs font-medium rounded-full py-0.5 px-3 w-fit inline-block" ${selectedItem?.difficulty === "BEGINNER" ? "bg-[#f0faf5] text-[#2e7d5a]" : selectedItem?.difficulty === "INTERMEDIATE" ? "bg-[#fff8ed] text-[#b37a2a]" : "bg-[#fdf0f0] text-[#9b3a3a]"}`}
          >
            {selectedItem?.difficulty.charAt(0) + selectedItem?.difficulty.slice(1).toLowerCase()}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold tracking-wide">
            {selectedItem?.title}
          </p>
          <p className="text-sm text-gray-500">{selectedItem.description}</p>
        </div>
        <div className="p-10 border">
          <p>Lesson Preview</p>
        </div>
        <div className="mt-12 border-b flex flex-row justify-between">
          <p>XP reward</p>
          <p className="text-[#e09f3e] font-bold">
            + {selectedItem.xpReward}XP
          </p>
        </div>
        <Button className="bg-[#2a9d8f] hover:bg-[#228176]">
          Start Lesson
        </Button>
      </div>
    </main>
  );
}
