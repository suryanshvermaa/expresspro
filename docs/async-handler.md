# Async Handler

ExpressPro provides an `asyncHandler` utility to simplify error handling in asynchronous route handlers.

## Overview

The `asyncHandler` is a middleware that wraps asynchronous route handlers and automatically catches any errors, passing them to Express's error handling middleware.

## Usage

```typescript
import express from 'expresspro';

const app = express();

app.get('/users', express.asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json({ users });
}));
```

## Benefits

1. No need for try-catch blocks
2. Clean, readable code
3. Consistent error handling
4. Automatic error propagation
5. TypeScript support

## Examples

### Basic Usage

```typescript
app.get('/users/:id', express.asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new express.AppError('User not found', 404);
  }
  
  res.json({ user });
}));
```

### Database Operations

```typescript
app.post('/users', express.asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
}));
```

### Multiple Async Operations

```typescript
app.get('/user/:id/posts', express.asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.findByUserId(user.id);
  const comments = await Comment.findByPostIds(posts.map(p => p.id));
  
  res.json({ user, posts, comments });
}));
```

## Error Handling

The `asyncHandler` automatically catches errors and passes them to the next middleware:

```typescript
app.get('/users/:id', express.asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new express.AppError('User not found', 404);
  }
  
  res.json({ user });
}));

app.use(express.error); // Global error handler
```

## TypeScript Support

The `asyncHandler` is fully typed and works with TypeScript:

```typescript
import { Request, Response } from 'express';

app.get('/users', express.asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ users });
}));
```

## Best Practices

1. Always use `asyncHandler` for async route handlers
2. Throw appropriate errors with status codes
3. Keep route handlers focused and concise
4. Use TypeScript for better type safety
5. Handle specific error cases explicitly

## Common Patterns

### Validation

```typescript
app.post('/users', express.asyncHandler(async (req, res) => {
  const { error, value } = validateUser(req.body);
  
  if (error) {
    throw new express.AppError('Validation failed', 400);
  }
  
  const user = await User.create(value);
  res.status(201).json({ user });
}));
```

### File Operations

```typescript
app.post('/upload', express.asyncHandler(async (req, res) => {
  const file = req.file;
  
  if (!file) {
    throw new express.AppError('No file uploaded', 400);
  }
  
  await processFile(file);
  res.json({ message: 'File processed successfully' });
}));
```

### Database Transactions

```typescript
app.post('/transfer', express.asyncHandler(async (req, res) => {
  const { from, to, amount } = req.body;
  
  await db.transaction(async (t) => {
    await Account.decrement({ balance: amount }, { where: { id: from }, transaction: t });
    await Account.increment({ balance: amount }, { where: { id: to }, transaction: t });
  });
  
  res.json({ message: 'Transfer successful' });
}));
``` 