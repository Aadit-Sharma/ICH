/*
-----------------------------------------
File: index.js

Purpose:
Registers the React Native app with the native Android/iOS runtime.

Concepts Used:
- React Native
- AppRegistry
- Import/Export
- Modules

Flow:
Native app launch -> index.js -> App.tsx
-----------------------------------------
*/

// Import/Export + React Native
// AppRegistry comes from the react-native package.
// It connects our JavaScript app to the native Android/iOS app.
import {AppRegistry} from 'react-native';

// Import/Export + Component
// App is the root React component from App.tsx.
// React Native needs this component to know what to render first.
import App from './App';

// Import/Export + JavaScript destructuring
// This imports the app name from app.json and renames it to appName.
// The native app uses this registered name to start the correct JS component.
import {name as appName} from './app.json';

// React Native API
// registerComponent tells React Native: "When the app starts, render App."
// appName is the native registration name.
// () => App is an arrow function that returns the root component.
AppRegistry.registerComponent(appName, () => App);
