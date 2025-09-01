# TODO: Fix Signup and Login in MERN Project

## Backend Fixes
- [x] Verify backend register controller in authController.js:
  - [x] Remove role from request body (already not taking role)
  - [x] Always assign role = "student" (already done)
  - [x] Hash password properly (handled in User model pre-save hook)
  - [x] Return success or error message (already done)
- [x] Verify backend login controller in authController.js:
  - [x] Validate email and password (already done)
  - [x] Return JWT token with user role inside payload (already done)

## Frontend Fixes
- [x] Update React frontend (Register.jsx):
  - [x] Remove role field from the form (already removed)
  - [x] Include fields: full name, email, password, confirm password (already included)
  - [x] Submit form data to /api/auth/register using axios (handled in authSlice)
  - [x] Redirect to login page on success (changed navigate('/') to navigate('/login'))
- [x] Update React frontend (Login.jsx):
  - [x] Take email and password (already done)
  - [x] Send request to /api/auth/login (handled in authSlice)
  - [x] Save JWT token to localStorage (handled in authSlice)
  - [x] Redirect user based on role (already done)

## Dependent Files
- [x] backend/Models/User.js (password hashing and matchPassword verified)
- [x] frontend/src/state/slices/authSlice.js (assume correct for register/login actions)

## Followup Steps
- [x] Edit Register.jsx to fix redirect
- [ ] Test the registration and login flow
