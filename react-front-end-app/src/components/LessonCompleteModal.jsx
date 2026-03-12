import Modal from "./Modal";
import {
  Rocket,
  Star,
  Flame,
  Trophy,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Dumbbell,
  ArrowUp,
} from "lucide-react";

const iconMap = {
  Star,
  Flame,
  Trophy,
  Zap,
  Shield,
  Crown,
  Sparkles,
  Dumbbell,
  ArrowUp,
};

export default function LessonCompleteModal({
  isModalOpen,
  handleCloseModal,
  completionData,
}) {
  return (
    <div>
      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <div className="flex flex-col items-center space-y-6 p-12">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-4xl text-(--text-high)">
              Lesson Complete!
            </h2>
            <span>
              <Rocket size={35} className="text-accent" />
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl text-accent animate-pulse">
              +{completionData.xpEarned} XP
            </span>
            {completionData.leveledUp && (
              <p className="text-2xl text-(--text-med)">
                You are now{" "}
                <strong className="text-primary">
                  level {completionData.newLevel}!
                </strong>
              </p>
            )}
          </div>
          {/* rewards container */}
          {completionData.newRewards.length > 0 && (
            <div className="flex flex-col gap-2 justify-center bg-(--bg-elevated) border border-primary shadow-lg rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg text-center font-semibold text-(--text-high) mb-2">
                Rewards Unlocked
              </h3>
              {completionData.newRewards.map((reward) => {
                const IconComponent = iconMap[reward.icon] || Star;
                return (
                  <div
                    key={reward.rewardId}
                    className="flex items-center gap-3"
                  >
                    <IconComponent size={20} className="text-accent" />
                    <div className="flex flex-col">
                      <span className="text-(--text-high) font-semibold">
                        {reward.title}
                      </span>
                      <span className="text-sm text-(--text-med)">
                        {reward.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={handleCloseModal}
            className="hover:rounded-full hover:bg-(--bg-elevated)/90 transition-all duration-300 text-accent px-2 py-1 w-fit cursor-pointer"
          >
            Return to JamRoom
          </button>
        </div>
      </Modal>
    </div>
  );
}
