import bcrypt from "bcryptjs";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

const USERS_KEY = "app_users";

// Get all users from localStorage
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Create a new user
export const createUser = async (
  fullName: string,
  email: string,
  password: string,
): Promise<User> => {
  const users = getUsers();

  // Check if user already exists
  if (users.some((user) => user.email === email)) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36)}`,
    email,
    password: hashedPassword,
    fullName,
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
};

// Find user by email
export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find((user) => user.email === email) || null;
};

// Verify user credentials
export const verifyUser = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const user = findUserByEmail(email);

  if (!user) return null;

  // Compare hashed password
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};

// Get user by ID
export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find((user) => user.id === id) || null;
};
