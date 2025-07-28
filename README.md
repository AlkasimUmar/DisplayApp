# React API List App

This app fetches user data from the JSONPlaceholder API and displays it in a reusable, accessible list component.

## Features
- Fetches data using `fetch` in a React `useEffect`.
- Handles loading and error states.
- Reusable `ListComponent` with render prop for custom item rendering.
- Semantic HTML for accessibility.
- Edge case handling: empty list and error states.

## Usage
1. Install dependencies:
   - `pnpm install` (or `npm install`)
2. Run the development server:
   - `pnpm dev` (or `npm run dev`)
3. Visit `http://localhost:3000` in your browser.

## File Structure
- `pages/index.tsx`: Main page, fetches data and renders the list.
- `components/ListComponent.tsx`: Reusable list component.

## Customization
You can change the API endpoint or the way items are rendered by editing the `renderItem` prop in `index.tsx`.
