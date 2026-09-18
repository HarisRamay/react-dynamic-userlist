# React Dynamic User List

A React application for managing and displaying a dynamic team member list. This project focuses on understanding **React state management, effects, custom hooks, rendering behavior, performance optimization, asynchronous operations, race conditions, and optimistic UI updates**.

## 🚀 Features

- Dynamic team member list
- Search users with asynchronous API simulation
- Loading and error states
- Retry failed requests
- Toggle user active/inactive status
- Optimistic UI updates with rollback on API failure
- Request cancellation using `AbortController`
- Race-condition prevention for search requests
- Online/offline browser status detection
- Dashboard with timer and effect cleanup
- Memoized components using `React.memo`
- Stable callbacks using `useCallback`
- Immutable state updates
- Custom `useUsers` hook
- Derived state calculation
- React rendering and reconciliation investigation
- Proper `useEffect` cleanup

## 🛠️ Technologies

- React
- JavaScript
- Vite
- CSS
- React Hooks
- Promises
- AbortController

## 📁 Project Structure

```text
src/
├── api/
│   └── usersApi.js
│
├── components/
│   ├── ActiveUsersCounter.jsx
│   ├── Dashboard.jsx
│   ├── OnlineStatus.jsx
│   ├── SearchInput.jsx
│   ├── UserCard.jsx
│   └── UserList.jsx
│
├── data/
│   └── users.js
│
├── hooks/
│   └── useUsers.js
│
├── App.jsx
└── main.jsx