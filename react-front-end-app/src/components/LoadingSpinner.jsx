// accept 'page' prop to provide specific loading message based on the page
export default function LoadingSpinner({ page }) {
  return (
    <div className="flex items-center justify-center min-h-screen gap-3 bg-(--bg-base)">
      <svg className="h-10 w-10 animate-spin" viewBox="0 0 100 100">
        {/* background circle track */}
        <circle
          fill="none"
          strokeWidth="10"
          className="stroke-primary"
          cx="50"
          cy="50"
          r="40"
        />
        {/* spinning arc */}
        <circle
          fill="none"
          strokeWidth="10"
          className="stroke-current"
          strokeDasharray="250"
          strokeDashoffset="210"
          cx="50"
          cy="50"
          r="40"
        />
      </svg>
      <p className="text-gray-400 text-sm">Loading {page} Data...</p>
    </div>
  );
}
