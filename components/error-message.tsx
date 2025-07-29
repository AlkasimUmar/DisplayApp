"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  showRetry = true,
}: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center"
      role="alert"
      aria-live="assertive"
    >
      {/* Error Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>

      {/* Error Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

      {/* Error Message */}
      <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

      {/* Retry Button */}
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Retry loading data"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )
}
