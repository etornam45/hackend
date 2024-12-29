import { ERROR_CODES } from "./error-codes";

export type ErrorCategories = keyof typeof ERROR_CODES; // "AUTH_ERRORS" | "USER_ERRORS" | "FORUM_ERRORS" | ...
export type ErrorCode<Category extends ErrorCategories> = keyof typeof ERROR_CODES[Category]; // e.g., "AUTH_001" for "AUTH_ERRORS"
export type ErrorMessage<Category extends ErrorCategories, Code extends ErrorCode<Category>> =
  (typeof ERROR_CODES[Category])[Code]; // e.g., "Invalid credentials" for "AUTH_001"

export type ErrorResponse = {
  error: ErrorMessage<ErrorCategories, ErrorCode<ErrorCategories>>,
  message?: string
};