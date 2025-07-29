import type React from "react"
interface ListComponentProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string
  emptyMessage?: string
  className?: string
  listClassName?: string
  emptyClassName?: string
}

export function ListComponent<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items to display",
  className = "",
  listClassName = "",
  emptyClassName = "",
}: ListComponentProps<T>) {
  // Handle empty list case
  if (items.length === 0) {
    return (
      <div className={`text-center py-8 ${emptyClassName}`} role="status" aria-live="polite">
        <div className="text-gray-500 text-lg">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className={className} role="region" aria-label="Items list">
      <ul className={`list-none ${listClassName}`} role="list">
        {items.map((item, index) => (
          <li key={keyExtractor(item, index)} role="listitem" className="mb-0">
            {renderItem(item, index)}
          </li>
        ))}
      </ul>

      {/* Screen reader announcement for list count */}
      <div className="sr-only" aria-live="polite">
        {`Showing ${items.length} item${items.length !== 1 ? "s" : ""}`}
      </div>
    </div>
  )
}
