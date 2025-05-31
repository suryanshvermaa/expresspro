# Express Pro

Express Pro is an enhanced version of Express.js that provides additional utilities and middleware to make building web applications easier and more secure.

## Features

- Built-in CORS middleware
- Authentication middleware
- Response utilities
- Bcrypt integration for password hashing
- Async handler for better error management
- JWT support for authentication
- TypeScript support

## Installation

```bash
npm install expresspro
# or
yarn add expresspro
# or
pnpm add expresspro
```

## Usage

### Basic Setup

```typescript
import express from 'expresspro';

const app = express();

// CORS middleware is automatically available
app.use(express.cors());

// Authentication middleware
app.use(express.auth);

// Response utilities
app.get('/', (req, res) => {
  res.success('Hello World!');
});

// Password hashing
const hashedPassword = await express.bcrypt.hash('password', 10);

// Async handler
app.get('/async', express.async(async (req, res) => {
  // Your async code here
}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## API Reference

### Middleware

- `express.cors()`: CORS middleware
- `express.auth`: Authentication middleware

### Utilities

- `express.resp`: Response utilities
- `express.bcrypt`: Bcrypt integration
- `express.async`: Async handler

## Dependencies

- express: ^5.1.0
- cors: ^2.8.5
- bcrypt: ^6.0.0
- jsonwebtoken: ^9.0.2

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```

## License

ISC

## Author

Suryansh Verma

## Repository

[GitHub Repository](https://github.com/suryanshvermaa/express-plus) 