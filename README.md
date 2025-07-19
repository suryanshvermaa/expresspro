# ExpressPro

[![npm version](https://img.shields.io/npm/v/expresspro.svg)](https://www.npmjs.com/package/expresspro)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[Docs](https://dev-doc.netlify.app/docs/Nodejs/ExpressPro)

ExpressPro is an enhanced version of Express.js that provides additional utilities and middleware for building robust web applications. It extends Express with authentication, error handling, and response utilities out of the box.

## Features

- 🔐 **JWT Authentication** - Built-in JWT authentication system
- 🛡️ **Error Handling** - Global error handler and custom error class
- 🔄 **Async Handler** - Clean async/await error handling
- 🔒 **Password Hashing** - Built-in bcrypt integration
- 🌐 **CORS Support** - Easy CORS configuration
- 📦 **TypeScript Support** - Full TypeScript support with type definitions

## Installation

```bash
npm install expresspro
# or
yarn add expresspro
# or
pnpm add expresspro
```

## Quick Start

```typescript
import express from 'expresspro';

const app = express();

// Enable CORS
app.use(express.cors());

// Initialize JWT Authentication
const auth = new express.auth('your-secret-key', 'token');

// Protected route
app.get('/protected', auth.authMiddleware(), (req, res) => {
  res.json({ message: 'Protected route accessed' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Documentation

For detailed documentation, please visit our [documentation](./docs/README.md) directory:

- [Getting Started](./docs/getting-started.md)
- [Authentication](./docs/authentication.md)
- [Error Handling](./docs/error-handling.md)
- [Response Utilities](./docs/response-utilities.md)
- [Async Handler](./docs/async-handler.md)
- [API Reference](./docs/api-reference.md)

## Available Extensions

### Authentication (`express.auth`)
```typescript
const auth = new express.auth('secret', 'token');
app.get('/protected', auth.authMiddleware(), (req, res) => {
  res.json({ user: req.user });
});
```

### Builtin JWT (`express.jwt`)
```typescript
// Create token
const token=express.jwt.sign({id: 1, name: 'Suryansh'});
// Verify token
const decoded = express.jwt.verify(token, 'secret');
```

### Error Handling (`express.error`)
```typescript
app.use(express.error);
throw new express.AppError('Not found', 404);
```

### Response Utilities (`express.resp`)
```typescript
express.resp(res, 200, 'Success', { data });
```

### Async Handler (`express.asyncHandler`)
```typescript
app.get('/async', express.asyncHandler(async (req, res) => {
  const data = await someAsyncOperation();
  res.json({ data });
}));
```

## TypeScript Support

ExpressPro is written in TypeScript and includes type definitions. The types are available in the `@types` directory.

```typescript
import express from 'expresspro';
import { Request, Response } from 'express';

app.get('/users', express.asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ users });
}));
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

## Changelog

See our [Changelog](./docs/changelog.md) for a list of changes.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

Suryansh Verma

## Repository

[GitHub Repository](https://github.com/suryanshvermaa/express-pro)

## Support

- [GitHub Issues](https://github.com/suryanshvermaa/express-pro/issues)
- [Documentation](./docs/README.md)

## Related Projects

- [Express.js](https://expressjs.com/) - The web framework for Node.js
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - JSON Web Token implementation
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/) - Password hashing

## Security

If you discover any security-related issues, please email suryanshverma.dev.official@gmail.com instead of using the issue tracker.

## Acknowledgments

- Express.js team for the amazing framework
- All contributors who have helped shape ExpressPro 