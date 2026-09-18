React Dynamic User List — Learnings
Effects
1. What is a side effect?

A side effect is work that happens outside React's normal rendering, such as API requests, timers, event listeners, and subscriptions.

2. Why is an API request a side effect?

Because it communicates with an external system outside React.

3. What does useEffect do?

It lets a component perform side effects after rendering.

4. When does an effect execute?
No dependency array → after every render
[] → after initial mount
[value] → when value changes
5. What does the dependency array represent?

It tells React which values the effect depends on and when it should run again.

6. What is effect cleanup?

Cleanup stops or removes work created by an effect.

return () => {
  clearInterval(timer);
};
7. Why can an effect cause an infinite loop?

If an effect changes state that is also a dependency of that effect.

Async Behavior
1. Why does an API request change the rendering flow?

The request finishes later, so its result can update state and cause another render.

Render → API request → Response → setState → Render
2. Why do applications need loading, error, and empty states?

To clearly represent different situations:

Loading → waiting for data
Error → request failed
Empty → request succeeded but no data exists
3. What is a race condition?

When multiple async operations run at the same time and finish in an unexpected order.

4. How can stale API responses create incorrect UI?

An older request can finish after a newer request and overwrite the newer results.

5. What does AbortController solve?

It allows an abortable request to be cancelled, helping prevent outdated requests from continuing.

6. What happens if a component unmounts while async work is running?

The component is removed, but the async operation may continue. Cleanup can cancel or stop the work when possible.

Closures
1. What is a closure?

A function remembers variables from the scope where it was created.

2. What is a stale closure?

A function uses an old value captured from an earlier render.

3. How can functional state updates help?

They let React provide the latest previous state:

setCount(prev => prev + 1);

This is safer when the new state depends on the previous state.

State Architecture
1. Server state vs UI state

Server state: Data from the backend.

users, products, orders

UI state: State controlling the interface.

search, modalOpen, showDashboard
2. Why shouldn't derived values usually use effects?

Because they can be calculated directly from existing state.

const activeUsers = users.filter(user => user.active);

Using an effect creates unnecessary state and renders.

3. When should state be stored vs calculated?

Store it when it is independent information that needs to persist.

Calculate it when it can be derived from existing state or props.

Custom Hooks
1. Why do custom hooks exist?

To reuse stateful React logic between components.

2. What belongs inside useUsers()?

User-related logic such as:

Fetching
Searching
Loading/error state
Refetching
Updating users
Optimistic updates
Request cancellation
3. Does a custom hook create global state?

No. Each call to a custom hook has its own state.

4. Sharing logic vs sharing state

Custom Hook: shares reusable logic.

Context/Store: can share the same state between components.

Real Applications
Application	Where these concepts are used
Search / Autocomplete:	API requests, debounce, race conditions, cancellation
Chat Applications:	Real-time messages, subscriptions, cleanup
Live Dashboards:	Polling, timers, async data, cleanup
Notification Systems:	Real-time events, subscriptions, state updates
Stock / Crypto:	Frequent data updates, stale data, real-time state
Admin Panels:	Fetching, searching, updating, optimistic updates
File Uploads:	Async uploads, progress, errors, cancellation
Maps:	API requests, location changes, race conditions
Real-time Collaboration	Synchronizing server and UI state
E-commerce:	Product search, cart updates, inventory, API requests