#  Indian Coffee House

A modern **React Native Food Ordering Application** built using **React Native CLI** that provides a seamless ordering experience with authentication, persistent user sessions, cart management, order tracking, billing, and profile management.

Designed with reusable components, Redux state management, and clean architecture for scalability.

---

## Features

### Authentication
- Secure login using DummyJSON API
- Persistent login using AsyncStorage
- Logout with session clearing
- User profile loading

### Food Ordering
- Browse menu categories
- Search food items
- View detailed food information
- Add items to cart
- Manage cart quantities

### User Experience
- Smooth animated Home Screen
- Offer banner with animated scroll
- Responsive UI
- Bottom Navigation
- Loading indicators
- Session persistence

### Orders & Bills
- Order history
- Bill generation
- User session management
- Profile management

---

## Screenshots

| Login | Home |
|-------|------|
| ![](screenshots/login.png) | ![](screenshots/home.png) |

| Menu | Food Details |
|-------|--------------|
| ![](screenshots/menu.png) | ![](screenshots/details.png) |

| Cart | Orders |
|------|--------|
| ![](screenshots/cart.png) | ![](screenshots/orders.png) |

| Bills | Profile |
|-------|----------|
| ![](screenshots/bills.png) | ![](screenshots/profile.png) |

---

## Tech Stack

### Mobile
- React Native CLI
- JavaScript

### Navigation
- React Navigation

### State Management
- Redux Toolkit
- React Redux

### Storage
- AsyncStorage

### Authentication
- DummyJSON API

### UI
- React Native
- Custom Components
- Animated API

---

## Architecture

```
DummyJSON API
       │
       ▼
 Authentication
       │
       ▼
 AsyncStorage
       │
       ▼
 Redux Toolkit
       │
       ▼
 Screens
       │
       ▼
 Reusable Components
```

---

## Folder Structure

```
src
│
├── assets
├── components
│   ├── common
│   ├── home
│   └── profile
│
├── screens
│
├── navigation
│
├── redux
│   ├── slices
│   └── store
│
├── services
│
├── theme
│
└── utils
```

---

## Installation

```bash
git clone <repository-url>

cd ICH

npm install
```

---

## Run Android

```bash
npx react-native start

npx react-native run-android
```

---

## Project Highlights

- Modular component architecture
- Redux Toolkit state management
- Persistent authentication
- API integration
- Reusable UI components
- Responsive layouts
- Animated UI interactions
- Clean folder organization

---

## Future Enhancements

- User-specific cart persistence
- User-specific order history
- Payment gateway integration
- Push notifications
- Favorites
- Dark Mode
- Order tracking
- Backend integration

---

## Contributors

- **Anushi Mishra**
- **Aadit Sharma**
