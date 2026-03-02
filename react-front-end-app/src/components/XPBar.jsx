export default function XPBar({ xp, xpToNextLevel  }) {
    
  // calculates percentage of progress
  const fillPercentage = (xp, xpToNextLevel) => {
    return (xp / xpToNextLevel) * 100;
  };

  // sets the width of the 'fill bar' to be whatever the 'fill percentage' is from above
  const xpBarWidth = fillPercentage(xp, xpToNextLevel);

  return (
    <div className="rounded-xl bg-gray-300 dark:bg-gray-600 h-3 w-full">
      <span
        className="bg-[#415a77] dark:bg-[#149eca] h-full block rounded-xl"
        // fills the bar based on the xpBarWidth value
        style={{ width: xpBarWidth + "%" }}
      ></span>
    </div>
  );
}
