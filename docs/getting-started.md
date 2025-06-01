# Getting Started with ExpressPro

## Installation

```bash
npm install expresspro
# or
yarn add expresspro
# or
pnpm add expresspro
```

## Basic Usage

```typescript
import express from 'expresspro';

const app = express();

// Enable CORS
app.use(express.cors());

// Initialize JWT Authentication
const auth = new express.auth('your-secret-key', 'token');

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ExpressPro!' });
});

// Protected route
app.get('/protected', auth.authMiddleware(), (req, res) => {
  res.json({ message: 'Protected route accessed' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Available Extensions

ExpressPro extends the Express.js framework with the following features:

1. **Authentication (`express.auth`)**
   - JWT-based authentication
   - Token management
   - Protected route middleware

2. **Error Handling (`express.error`)**
   - Global error handler
   - Custom error class (`AppError`)

3. **Response Utilities (`express.resp`)**
   - Standardized response format
   - Success/error response helpers

4. **Async Handler (`express.asyncHandler`)**
   - Clean async/await error handling
   - No try-catch blocks needed

5. **CORS Support (`express.cors`)**
   - Built-in CORS middleware
   - Easy configuration

6. **Password Hashing (`express.bcrypt`)**
   - Built-in bcrypt integration
   - Secure password management

## TypeScript Support

ExpressPro is written in TypeScript and includes type definitions. The types are available in the `@types` directory.

## Next Steps

- Read the [Authentication](./authentication.md) guide to learn about JWT implementation
- Check out [Error Handling](./error-handling.md) for managing errors
- Explore [Response Utilities](./response-utilities.md) for standardized responses
- Learn about [Async Handler](./async-handler.md) for clean async code 