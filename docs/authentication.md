# Authentication

ExpressPro provides a robust JWT-based authentication system through the `auth` class.

## Initialization

```typescript
import express from 'expresspro';

const auth = new express.auth(authSecret: string, tokenname: string);
```

### Parameters

- `authSecret` (string): Secret key used for signing JWT tokens
- `tokenname` (string): Name of the token in request (headers/body/params/query/authorization-header)

## Methods

### `authMiddleware()`

Returns a middleware function that authenticates requests using JWT tokens.

```typescript
app.get('/protected', auth.authMiddleware(), (req, res) => {
  // Access authenticated user data
  console.log(req.user);
});
```

The middleware checks for the token in the following locations (in order):
1. Authorization header (`Bearer token`)
2. Custom header specified by `tokenname`
3. Request body
4. URL parameters
5. Query parameters

### `createToken(data: object, time: number): Promise<string>`

Creates a JWT token with the provided data and expiration time.

```typescript
// Create a token that expires in 60 minutes
const token = await auth.createToken({ userId: 123 }, 60);
```

### `verifyToken(token: string): Promise<object>`

Verifies a JWT token and returns the decoded data.

```typescript
try {
  const data = await auth.verifyToken(token);
  console.log('Token data:', data);
} catch (error) {
  console.error('Invalid token');
}
```

## Example Usage

```typescript
import express from 'expresspro';

const app = express();
const auth = new express.auth('your-secret-key', 'token');

// Login route
app.post('/login', express.asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  // Your user authentication logic here
  const user = { id: 1, username };
  
  // Create token
  const token = await auth.createToken(user, 60);
  
  res.json({ token });
}));

// Protected route
app.get('/profile', auth.authMiddleware(), (req, res) => {
  // req.user contains the decoded token data
  res.json({ user: req.user });
});
```

## Built in JWT Support

ExpressPro uses the built-in `jsonwebtoken` library for JWT operations, if user don't want to use express auth methods then they can use jwt directly using `express.jwt`.
```typescript
import express from 'expresspro';
// Create a token
const token = express.jwt.sign({ userId:1, name: 'suryansh'}, 'your-secret-key', { expiresIn: '100m' });ss
// Verify a token
const data = express.jwt.verify(token,'your-secret-key');
```
## Security Best Practices

1. Always use a strong, unique `authSecret`
2. Store the `authSecret` in environment variables
3. Use HTTPS in production
4. Set appropriate token expiration times
5. Implement token refresh mechanism for long-lived sessions
6. Clear tokens on logout 

## Next Steps

- Check out [Error Handling](./error-handling.md) for managing errors
- Explore [Response Utilities](./response-utilities.md) for standardized responses
- Learn about [Async Handler](./async-handler.md) for clean async code 