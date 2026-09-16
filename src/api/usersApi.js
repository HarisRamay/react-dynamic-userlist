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