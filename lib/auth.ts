import jwt from "jsonwebtoken";
import { User } from "./users";

// IMPORTANT: In production, store this in environment variable
const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this";
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

// Generate JWT token
export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "7d" }, // Token expires in 7 days
  );
};

// Verify JWT token
export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

// Save auth data to localStorage
export const saveAuthData = (token: string, user: User): void => {
  // Store token
  localStorage.setItem(TOKEN_KEY, token);

  // Store user data (without password)
  const safeUser = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!token) return false;

  // Verify token is valid and not expired
  const decoded = verifyToken(token);
  return decoded !== null;
};

// Clear auth data (logout)
export const clearAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
