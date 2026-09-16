import { initialUsers } from "../data/users";

export function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialUsers);
    }, 2000);
  });
}