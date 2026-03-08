// Math utility functions for XP-related calculations

// calculate xp needed for the next level
// dynamically "fills up" the XP Bar based on the value
export function xpNeededToLevelUp(currentXp, currentLevel) {
  return xpForNextLevel(currentLevel) - currentXp;
}

// simple leveling logic to match backend
export function xpForNextLevel(level) {
  return 50 + ((level + 1) * 50);
}
