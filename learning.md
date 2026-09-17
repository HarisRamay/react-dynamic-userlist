# React Rendering & Performance Learnings

## 1. What is React's Virtual DOM?

The Virtual DOM is React's lightweight JavaScript representation of the UI. React uses it to determine what the UI should look like based on the current state and props.

---

## 2. What is reconciliation?

Reconciliation is the process React uses to compare the previous UI representation with the new one after a render. React determines what changed and updates only the necessary parts of the browser DOM.

---

## 3. What happens after calling a state setter?

When a state setter such as `setUsers()` is called, React schedules a state update. The component renders again with the new state. React then performs reconciliation and commits the necessary DOM changes.

```text
State setter
    ↓
State update
    ↓
Render
    ↓
Reconciliation
    ↓
DOM update
/////////////////////////////

4. Does a React component re-render always mean the browser DOM changes?

No.

A re-render means React executes the component again to calculate the new UI representation. After reconciliation, React may determine that no DOM changes are necessary.

Therefore:

Re-render ≠ DOM update

////////////////

5. Why does React need key when rendering lists?

React uses key to identify list items between renders. A stable key helps React determine which items were added, removed, moved, or updated.

///////////////////////////

6. Why can using the array index as a key cause problems?

An array index represents the item's position, not the item's identity.

If items are removed, inserted, or reordered, the indexes can change. React may then associate a component's state or DOM with the wrong item.


/////////////////////////////////
7. What problem does React.memo solve?

React.memo can prevent a component from re-rendering when its props have not changed.

For example, if one user changes in a list of many users, memoized UserCard components whose props remain the same can be skipped.


///////////////////////
8. When would useMemo actually be useful?

useMemo is useful for caching an expensive calculation so React does not repeat the calculation when its dependencies have not changed.


/////////////
9. When would useCallback actually be useful?

useCallback is useful when a stable function reference is important, especially when passing a callback to a memoized child component.


////////////
11. Where could these concepts save time or resources in a real application?

These concepts become more useful as an application becomes larger or updates more frequently.

Examples include:

Large data tables: Avoid unnecessary rendering of thousands of rows.
Dashboards: Prevent unrelated charts and widgets from recalculating when one value changes.
Notification feeds: Stable keys help React track notifications as new ones arrive or old ones are removed.
Search result lists: Stable keys help React correctly track items as filtering changes the list.
Chat applications: Stable message IDs help React identify existing messages when new messages arrive.
Admin panels: Memoization can reduce unnecessary rendering of complex tables, forms, and controls.
Real-time applications: Reducing unnecessary renders and calculations becomes especially valuable when data updates frequently.

The main goal is not to prevent all re-renders. The goal is to make React perform only the work that is actually necessary.