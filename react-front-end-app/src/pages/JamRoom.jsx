import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllChords } from "@/services/chordService";
import { getAllLessons } from "@/services/lessonService";
import { getAllScales } from "@/services/scaleService";
import { ArrowDown } from "lucide-react";
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

  return (
    <main className="flex flex-row px-8 py-10 gap-8">
      {/* Left pannel */}
      <div className="w-5/12 flex flex-col rounded-xl bg-blue-400">
        <div className="p-4 flex flex-row items-center">
          <p className="mr-4 text-lg">Jam Room</p>
          <Tabs className="p-4">
            <TabsList>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="chords">Chords</TabsTrigger>
              <TabsTrigger value="scales">Scales</TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
             <Button variant="outline" className="w-20">Difficulty</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Beginner</DropdownMenuItem>
                <DropdownMenuItem>Intermediate</DropdownMenuItem>
                <DropdownMenuItem>Advanced</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-4 flex flex-row justify-between">
          <p className="uppercase text-sm tracking-wide">Browse</p>
          {/* placeholder for "x/10 lessons complete" */}
          <p>lessons complete</p>
        </div>
        <div className="px-6 py-6 min-h-screen flex flex-col gap-4 border border-black">
          <p className="border p-8">Test Lesson/Chord/Scale</p>
          <p className="border p-8">Test Lesson/Chord/Scale</p>
          <p className="border p-8">Test Lesson/Chord/Scale</p>
        </div>
      </div>
      {/* Right pannel */}
      <div className="flex flex-col gap-6 w-2/3 px-8 py-8 rounded-xl bg-orange-500">
        <div className="px-6 flex flex-row justify-between border-b">
          <p>Selected lesson</p>
          <p className="mr-10">Difficulty: </p>
        </div>
        <div className="flex flex-col gap-3">
          <p>Lesson Name</p>
          <p>Lesson Description</p>
        </div>
        <div className="p-10 border">
          <p>Lesson Preview</p>
        </div>
        <div className="mt-12 border-b flex flex-row justify-between">
          <p>XP reward</p>
          <p>XP amount</p>
        </div>
        <Button>Start Lesson</Button>
      </div>
    </main>
  )
}
