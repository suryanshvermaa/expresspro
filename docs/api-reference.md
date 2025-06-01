# API Reference

This document provides a comprehensive reference of all the features and utilities available in ExpressPro.

## Core Extensions

### Authentication (`express.auth`)

```typescript
class Auth {
  constructor(authSecret: string, tokenname: string);
  authMiddleware(): RequestHandler;
  createToken(data: object, time: number): Promise<string>;
  verifyToken(token: string): Promise<object>;
}
```

### Error Handling (`express.error`)

```typescript
class AppError extends Error {
  constructor(message: string, statusCode: number);
  statusCode: number;
}

// Global error handler middleware
express.error: ErrorRequestHandler;
```

### Response Utilities (`express.resp`)

```typescript
function resp(
  res: Response,
  status: number,
  message: string,
  data: object
): Response;
```

### Async Handler (`express.asyncHandler`)

```typescript
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler;
```

### CORS (`express.cors`)

```typescript
// CORS middleware
express.cors: RequestHandler;
```

### Password Hashing (`express.bcrypt`)

```typescript
// bcrypt instance
express.bcrypt: typeof bcrypt;
```

## Type Definitions

### Response Interface

```typescript
interface IRes {
  success: boolean;
  message: string;
  data: object;
}
```

### Auth Middleware Request

```typescript
interface AuthRequest extends Request {
  user: object;
}
```

## Usage Examples

### Authentication

```typescript
import express from 'expresspro';

const auth = new express.auth('secret', 'token');

// Protected route
app.get('/protected', auth.authMiddleware(), (req, res) => {
  res.json({ user: req.user });
});

// Create token
const token = await auth.createToken({ id: 1 }, 60);

// Verify token
const data = await auth.verifyToken(token);
```

### Error Handling

```typescript
// Throw custom error
throw new express.AppError('Not found', 404);

// Global error handler
app.use(express.error);
```

### Response

```typescript
// Success response
express.resp(res, 200, 'Success', { data });

// Error response
express.resp(res, 400, 'Error', { errors });
```

### Async Handler

```typescript
app.get('/async', express.asyncHandler(async (req, res) => {
  const data = await someAsyncOperation();
  res.json({ data });
}));
```

### CORS

```typescript
// Enable CORS
app.use(express.cors());
```

### Password Hashing

```typescript
// Hash password
const hashedPassword = await express.bcrypt.hash(password, 10);

// Compare password
const isMatch = await express.bcrypt.compare(password, hashedPassword);
```

## Middleware Order

For optimal functionality, follow this middleware order:

1. CORS
2. Body parsers
3. Authentication
4. Routes
5. Error handler

```typescript
import express from 'expresspro';

const app = express();

// 1. CORS
app.use(express.cors());

// 2. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Authentication
const auth = new express.auth('secret', 'token');
app.use('/api', auth.authMiddleware());

// 4. Routes
app.use('/api', routes);

// 5. Error handler
app.use(express.error);
```
