/*
-----------------------------------------
File: Routes.js

Purpose:
Stores route names in one place so screens use consistent navigation names.

Concepts Used:
- JavaScript object
- Constants
- Export
- React Navigation route naming

Flow:
Imported by StackNavigator, Splash, Login, and Home.
-----------------------------------------
*/

// JavaScript constant + object
// const creates a variable that should not be reassigned.
// Routes is an object containing screen names.
// Each key is used in code, and each value is the actual route name.
const Routes = {
  // Navigation route name for the Splash screen.
  SPLASH: "Splash",
  // Navigation route name for the Login screen.
  LOGIN: "Login",
  // Navigation route name for the Home screen.
  HOME: "Home",
  // Navigation route name for the Menu screen.
  MENU: "Menu",
  // Navigation route name for the FoodDetails screen.
  FOOD_DETAILS: "FoodDetails",
  // Navigation route name for the Cart screen.
  CART: "Cart",
  // Navigation route name for the Success screen.
  CHECKOUT: "Checkout",
  PAYMENT: "Payment",
  SUCCESS: "Success",
  ORDER_DETAILS: "OrderDetails",
  ORDER_TRACKING: "OrderTracking",
  ADDRESS_BOOK:'AddressBook',
};

// Import/Export
// export default allows other files to import this Routes object.
export default Routes;
