// Snap to grid utility
export const snapToGrid = (value, gridSize) => {
  return Math.round(value / gridSize) * gridSize;
};
