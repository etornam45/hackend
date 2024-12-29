# API Endpoints Documentation

## Authentication
- [x] `POST /auth/register`
- [x] `POST /auth/login`
- [x] `POST /auth/logout`
- [x] `POST /auth/refresh-token`
- [x] `POST /auth/reset-password`
- [x] `POST /auth/verify-email`

## Users
### Profile Management
- [ ] GET /users/me
- [ ] PUT /users/me
- [ ] GET /users/{userId}
- [ ] PUT /users/{userId}/status
- [ ] PUT /users/{userId}/profile-picture
- [ ] GET /users/{userId}/skills
- [ ] POST /users/{userId}/skills
- [ ] DELETE /users/{userId}/skills/{skillId}

## Competitions
### Competition Management
- [ ] POST /competitions
- [ ] GET /competitions
- [ ] GET /competitions/{competitionId}
- [ ] PUT /competitions/{competitionId}
- [ ] DELETE /competitions/{competitionId}
- [ ] PUT /competitions/{competitionId}/status

### Competition Participation
- [ ] POST /competitions/{competitionId}/participants
- [ ] GET /competitions/{competitionId}/participants
- [ ] PUT /competitions/{competitionId}/participants/{userId}/status
- [ ] DELETE /competitions/{competitionId}/participants/{userId}

## Groups
### Group Management
- [ ] POST /competitions/{competitionId}/groups
- [ ] GET /competitions/{competitionId}/groups
- [ ] GET /groups/{groupId}
- [ ] PUT /groups/{groupId}
- [ ] DELETE /groups/{groupId}

### Group Membership
- [x] POST /groups/{groupId}/members
- [x] GET /groups/{groupId}/members
- [x] PUT /groups/{groupId}/members/{userId}/role
- [x] DELETE /groups/{groupId}/members/{userId}

## Spaces
### Space Management
- [ ] POST /competitions/{competitionId}/spaces
- [ ] GET /competitions/{competitionId}/spaces
- [ ] GET /spaces/{spaceId}
- [ ] PUT /spaces/{spaceId}
- [ ] DELETE /spaces/{spaceId}
- [ ] PUT /spaces/{spaceId}/visibility

## Posts
### Post Management
- [ ] POST /spaces/{spaceId}/posts
- [ ] GET /spaces/{spaceId}/posts
- [ ] GET /posts/{postId}
- [ ] PUT /posts/{postId}
- [ ] DELETE /posts/{postId}

## Comments
### Comment Management
- [ ] POST /posts/{postId}/comments
- [ ] GET /posts/{postId}/comments
- [ ] GET /comments/{commentId}
- [ ] PUT /comments/{commentId}
- [ ] DELETE /comments/{commentId}
- [ ] POST /comments/{commentId}/replies

## Standard Features for All List Endpoints

### Pagination
All list endpoints should support:
- page (default: 1)
- limit (default: 10)
- sort (field to sort by)
- order (asc/desc)

### Filtering
Common filter parameters:
- createdAt_gte
- createdAt_lte
- status (where applicable)
- search (text search where applicable)

### Response Format
```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

## Error Responses
All endpoints should return standardized error responses:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Authentication Requirements
- All endpoints except authentication endpoints require a valid JWT token
- Token should be passed in Authorization header: `Authorization: Bearer <token>`

## Rate Limiting
- Unauthenticated requests: 30 requests per IP per minute
- Authenticated requests: 100 requests per user per minute
- Competition submission endpoints: 5 requests per user per minute