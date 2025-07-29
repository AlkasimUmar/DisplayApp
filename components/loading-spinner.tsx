export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4 text-gray-600 text-sm">Fetching data from API...</p>
    </div>
  )
}
