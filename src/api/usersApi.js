import { initialUsers } from "../data/users";

export function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        reject(new Error("Failed to load users"));
        return;
      }

      resolve(initialUsers);
    }, 2000);
  });
}

export function updateUserStatus(userId, active) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        reject(new Error("Failed to update user status"));
        return;
      }

      resolve({
        userId,
        active,
      });
    }, 1000);
  });
}

export function searchUsers(query, signal) {
  return new Promise((resolve, reject) => {
    const delay = query.toLowerCase() === "ali" ? 3000 : 1000;

    const timer = setTimeout(() => {
      const results = initialUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      resolve(results);
    }, delay);

    signal.addEventListener("abort", () => {
      clearTimeout(timer);

      reject(new DOMException("Request aborted", "AbortError"));
    });
  });
}

// export function searchUsers(query) {
//   return new Promise((resolve) => {
//     const delay = query.toLowerCase() === "ali" ? 6000 : 1000;

//     setTimeout(() => {
//       const results = initialUsers.filter((user) =>
//         user.name.toLowerCase().includes(query.toLowerCase())
//       );

//       resolve(results);
//     }, delay);
//   });
// }