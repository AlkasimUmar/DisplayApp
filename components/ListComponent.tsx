import React from 'react';

interface ListComponentProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  fallbackMessage?: string;
}

function ListComponent<T>({ items, renderItem, fallbackMessage = 'No items found.' }: ListComponentProps<T>) {
  if (!items || items.length === 0) {
    return <div>{fallbackMessage}</div>;
  }
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default ListComponent;
