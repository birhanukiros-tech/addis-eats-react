# Validated, Persistent Signup Form

A production-ready signup form that validates Ethiopian phone numbers and persists data to localStorage.

## Features

### 🔐 Validation
- **Name**: Minimum 2 characters
- **Phone**: Ethiopian format validation with regex `/^(?:\+251|0)9\d{8}$/`
  - ✅ Accepts: `0912345678`, `+251912345678`
  - ❌ Rejects: `912345678`, `123456789`, `091234567`

### 💾 Persistence
- Valid entries saved to localStorage as JSON
- Data survives page reloads
- Handles null and corrupt data with try/catch

### 🎨 UI/UX
- Clean, responsive design
- Clear error messages using `textContent` (never `innerHTML`)
- Success confirmation on valid submission
- Shows list of recent signups
- Real-time validation hints

## Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd signup-form