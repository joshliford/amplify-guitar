export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen gap-3">
      <svg className="h-10 w-10 animate-spin" viewBox="0 0 100 100">
        <circle
          fill="none"
          strokeWidth="10"
          className="stroke-current opacity-40"
          cx="50"
          cy="50"
          r="40"
        />
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
      <p className="text-gray-400 font-['Nunito_Sans'] text-sm">Loading Dashboard...</p>
    </div>
  );
}
