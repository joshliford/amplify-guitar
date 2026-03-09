export default function XPBar({ xp, xpToNextLevel  }) {
    
  // calculates percentage of progress
  const fillPercentage = (xp, xpToNextLevel) => {
    return (xp / xpToNextLevel) * 100;
  };

  // sets the width of the 'fill bar' to be whatever the 'fill percentage' is from above
  const xpBarWidth = fillPercentage(xp, xpToNextLevel);

  return (
    <div className="rounded-xl bg-(--bg-elevated) h-2 w-full">
      <span
        className="bg-primary h-full block rounded-xl"
        // fills the bar based on the xpBarWidth value
        style={{ width: xpBarWidth + "%" }}
      ></span>
    </div>
  );
}
