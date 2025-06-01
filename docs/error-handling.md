# Error Handling

ExpressPro provides a robust error handling system with a custom error class and global error handler.

## AppError Class

The `AppError` class extends the native `Error` class and adds HTTP status code support.

```typescript
import {AppError} from 'expresspro';

// Create a custom error
throw new AppError('Resource not found', 404);
```

### Properties

- `message` (string): Error message
- `statusCode` (number): HTTP status code
- `stack` (string): Error stack trace

## Global Error Handler

ExpressPro includes a global error handler middleware that catches and processes all errors.

```typescript
import express from 'expresspro';

const app = express();

// Add error handler middleware
app.use(express.error);
```

### Error Response Format

```typescript
{
  success: false,
  message: string,
  data: {}
}
```

## Usage Examples

### Basic Error Handling

```typescript
import express from 'expresspro';

const app = express();

// Route with error
app.get('/users/:id', express.asyncHandler(async (req, res) => {
  const user = await findUser(req.params.id);
  
  if (!user) {
    throw new express.AppError('User not found', 404);
  }
  
  res.json({ user });
}));

// Add error handler
app.use(express.error);
```

### Custom Error Handler
- In case of you don't want to built in error handler. You can define your custom handler. (Not recommended Use if needed)
```typescript
import express from 'expresspro';

const app = express();

// Custom error handler
app.use((err, req, res, next) => {
  if (err instanceof express.AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        statusCode: err.statusCode,
        message: err.message
      }
    });
  }
  
  // Handle other errors
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: {
      statusCode: 500,
      message: err.message
    }
  });
});
```

## Best Practices

1. Always use `express.asyncHandler` for async route handlers
2. Throw `AppError` for known error cases
3. Use appropriate HTTP status codes
4. Keep error messages user-friendly
5. Log errors for debugging
6. Don't expose sensitive information in error messages

## Common HTTP Status Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 422: Unprocessable Entity
- 500: Internal Server Error

## Error Handling with Async Handler

```typescript
import express from 'expresspro';

const app = express();

app.get('/async-route', express.asyncHandler(async (req, res) => {
  // No need for try-catch
  const data = await someAsyncOperation();
  
  if (!data) {
    throw new express.AppError('Data not found', 404);
  }
  
  res.json({ data });
}));
``` 

## Next Steps

- Explore [Response Utilities](./response-utilities.md) for standardized responses
- Learn about [Async Handler](./async-handler.md) for clean async code 