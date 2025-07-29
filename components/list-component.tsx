import type React from "react"

// Generic interface for the reusable list component
interface ListComponentProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string
  emptyMessage?: string
  loadingMessage?: string
  className?: string
  listClassName?: string
  emptyClassName?: string
  isLoading?: boolean
}

// Generic reusable list component
export function ListComponent<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items to display",
  loadingMessage = "Loading...",
  className = "",
  listClassName = "",
  emptyClassName = "",
  isLoading = false,
}: ListComponentProps<T>) {
  // Loading state
  if (isLoading) {
    return (
      <div className={`text-center py-12 ${emptyClassName}`} role="status" aria-live="polite">
        <div className="animate-pulse">
          <div className="text-gray-500 text-lg">{loadingMessage}</div>
        </div>
      </div>
    )
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className={`text-center py-12 ${emptyClassName}`} role="status" aria-live="polite">
        <div className="text-gray-500 text-lg mb-2">📭</div>
        <div className="text-gray-500 text-lg">{emptyMessage}</div>
      </div>
    )
  }

  // Main list render
  return (
    <div className={className} role="region" aria-label="Items list">
      <div className={`${listClassName}`}>
        {items.map((item, index) => (
          <div key={keyExtractor(item, index)} role="listitem">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Accessibility announcement */}
      <div className="sr-only" aria-live="polite">
        {`Displaying ${items.length} item${items.length !== 1 ? "s" : ""}`}
      </div>
    </div>
  )
}
