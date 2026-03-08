import Modal from "./Modal";
import { rewards } from "./Data/rewards";
import { Rocket, Trophy } from "lucide-react";

export default function LevelUpModal({ isModalOpen, handleCloseModal, level }) {
    
  const reward = rewards.find((r) => r.level === level);

  return (
    <div>
      <Modal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <div className="flex flex-col items-center p-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-bold text-4xl">Level Up!</h2>
            <span>
              <Rocket size={35} className="text-black" fill="orange" />
            </span>
          </div>

          <p className="text-2xl mb-6">
            You are now{" "}
            <strong className="text-primary">
              level {level}!
            </strong>
          </p>
          {/* rewards container */}
          <div className="flex flex-col justify-center bg-(--primary)/30 shadow-lg rounded-xl p-10 w-full max-w-md">
            <h3 className="font-bold text-2xl border-b-2 text-center inline-block pb-1">
              Rewards Unlocked
            </h3>
            <div className="flex items-start gap-2 mt-6 text-xl">
              <Trophy size={20} className="text-yellow-700 mt-1" />
              <p className="mb-6">
                New Title:{" "}
              <strong className="text-primary">
                  {/*"{reward.title}"*/}
                </strong>
              </p>
            </div>
            <div className="flex items-start gap-2 text-xl">
              <Trophy size={20} className="text-yellow-700 mt-1" />
              <p>New Icon:</p>
              <span>
                <reward.icon size={25} style={{ color: reward.iconColor }} />
              </span>
              <span className="font-bold text-primary">
                {`(${reward.iconDescription})`}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleCloseModal}
            className="border-2 border-black rounded-xl px-4 py-2 bg-accent hover:bg-(--accent)/90 text-(--on-accent) mt-4 hover:cursor-pointer transition"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
