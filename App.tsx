/*
-----------------------------------------
File: App.tsx

Purpose:
This is the main React component for the app.

Concepts Used:
- React
- Component
- Import/Export
- Navigation entry point

Flow:
index.js -> App.tsx -> StackNavigator
-----------------------------------------
*/

// Import/Export + React
// React is the library that lets us write components.
// We need React because App is a React component.
import React from 'react';

// Import/Export + Navigation
// StackNavigator is our custom navigation component.
// It decides which screen appears in the app.
import StackNavigator from './src/navigation/StackNavigator';

// Component + JavaScript function
// export default makes this App component available to index.js.
// function App() defines a reusable React component.
// This function receives no parameters and returns JSX.
export default function App() {
  // JSX + Component usage
  // <StackNavigator /> renders the navigation system.
  // This is why the app starts with the screens defined in StackNavigator.
  return <StackNavigator />;
}
