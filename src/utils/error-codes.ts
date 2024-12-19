import { ErrorCategories, ErrorCode, ErrorMessage } from "./types";

export const ERROR_CODES = {
    "AUTH_ERRORS": {
        "AUTH_001": "Invalid credentials",
        "AUTH_002": "Account suspended",
        "AUTH_003": "Account banned",
        "AUTH_004": "Email not verified",
        "AUTH_005": "Password reset token expired",
        "AUTH_006": "Too many login attempts",
        "AUTH_007": "Invalid token",
        "AUTH_008": "Token expired",
        "AUTH_009": "Insufficient permissions"
    },
    "USER_ERRORS": {
        "USER_001": "User not found",
        "USER_002": "Username already exists",
        "USER_003": "Email already registered",
        "USER_004": "Invalid user profile data",
        "USER_005": "Maximum skill limit reached",
        "USER_006": "Skill already exists",
        "USER_007": "Failed to update user profile",
        "USER_008": "Failed to delete user profile"
    },
    "FORUM_ERRORS": {
        "FORUM_001": "Forum not found",
        "FORUM_002": "Unauthorized forum access",
        "FORUM_003": "Forum creation limit reached",
        "FORUM_004": "Cannot delete forum with active competitions",
        "FORUM_005": "Already a forum member",
        "FORUM_006": "Not a forum member",
        "FORUM_007": "Forum membership request pending",
        "FORUM_008": "Maximum forum members limit reached"
    },
    "GROUP_ERRORS": {
        "GROUP_001": "Group not found",
        "GROUP_002": "Unauthorized group access",
        "GROUP_003": "Group creation limit reached",
        "GROUP_004": "Cannot delete group with active members",
        "GROUP_005": "Already a group member",
        "GROUP_006": "Not a group member",
        "GROUP_007": "Maximum group members limit reached"
    },
    "POST_ERRORS": {
        "POST_001": "Post not found",
        "POST_002": "Unauthorized post access",
        "POST_003": "Post creation limit reached",
        "POST_004": "Invalid post content",
        "POST_005": "Already liked post",
        "POST_006": "Not liked post"
    },
    "COMMENT_ERRORS": {
        "COMMENT_001": "Comment not found",
        "COMMENT_002": "Unauthorized comment access",
        "COMMENT_003": "Comment creation limit reached",
        "COMMENT_004": "Invalid comment content",
        "COMMENT_005": "Already liked comment",
        "COMMENT_006": "Not liked comment",
        "COMMENT_007": "Cannot reply to deleted comment"
    },
    "COMPETITION_ERRORS": {
        "COMP_001": "Competition not found",
        "COMP_002": "Unauthorized competition access",
        "COMP_003": "Competition creation limit reached",
        "COMP_004": "Competition registration closed",
        "COMP_005": "Already registered for competition",
        "COMP_006": "Submission deadline passed",
        "COMP_007": "Team size limit exceeded",
        "COMP_008": "Invalid submission format"
    },
    "VALIDATION_ERRORS": {
        "VAL_001": "Invalid input format",
        "VAL_002": "Missing required fields",
        "VAL_003": "Input exceeds maximum length",
        "VAL_004": "Invalid email format",
        "VAL_005": "Invalid date format"
    },
    "SYSTEM_ERRORS": {
        "SYS_001": "Internal server error",
        "SYS_002": "Database connection failed",
        "SYS_003": "Rate limit exceeded",
        "SYS_004": "Service temporarily unavailable",
        "SYS_005": "Maintenance mode"
    }
} as const

export function getErrorMessage<Category extends ErrorCategories, Code extends ErrorCode<Category>>(
    category: Category,
    code: Code
): {
    code: Code,
    error: ErrorMessage<Category, Code>
} {
    return {
        code,
        error: ERROR_CODES[category][code]
    };
}

