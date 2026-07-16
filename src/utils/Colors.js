/*
-----------------------------------------
File: Colors.js

Purpose:
Stores app theme colors in one reusable object.

Concepts Used:
- JavaScript object
- Constants
- Export

Current Status:
Available for reuse, but most current screens still use direct color strings.
-----------------------------------------
*/

// JavaScript object
// Central place for shared colors.
const Colors = {
  // Main NTPC blue.
  primary: "#005BAC",
  // Orange accent color.
  secondary: "#F9A826",
  // White color.
  white: "#FFFFFF",
  // App background color.
  background: "#F5F7FA",
  // Default text color.
  text: "#1E293B",
  // Default border color.
  border: "#E2E8F0",
  // Success green.
  success: "#16A34A",
  // Error red.
  danger: "#DC2626",
};

// Export
// Allows other files to import Colors.
export default Colors;
