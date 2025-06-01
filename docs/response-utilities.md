# Response Utilities

ExpressPro provides standardized response utilities to maintain consistency across your API endpoints.

## Response Format

All responses follow a consistent format:

```typescript
{
  success: boolean,
  message: string,
  data: object
}
```

## Usage

```typescript
import express from 'expresspro';

const app = express();

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  
  return express.resp(res, 200, 'Users retrieved successfully', { users });
});
```

## Parameters

The `resp` function takes four parameters:

1. `res` (Response): Express response object
2. `status` (number): HTTP status code
3. `message` (string): Response message
4. `data` (object): Response data

## Examples

### Success Response

```typescript
// 200 OK
express.resp(res, 200, 'Operation successful', { data: result });

// 201 Created
express.resp(res, 201, 'Resource created', { id: newId });

// 204 No Content
express.resp(res, 204, 'Resource deleted', {});
```

### Error Response

```typescript
// 400 Bad Request
express.resp(res, 400, 'Invalid input', { errors: validationErrors });

// 404 Not Found
express.resp(res, 404, 'Resource not found', {});
```

## Best Practices

1. Always use the response utility for consistency
2. Use appropriate HTTP status codes
3. Provide clear, descriptive messages
4. Structure data logically
5. Handle empty responses appropriately

## Common Use Cases

### Pagination

```typescript
app.get('/items', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const items = getPaginatedItems(page, limit);
  
  return express.resp(res, 200, 'Items retrieved successfully', {
    items: items.data,
    pagination: {
      page: items.page,
      limit: items.limit,
      total: items.total
    }
  });
});
```

### Data Validation

```typescript
app.post('/users', (req, res) => {
  const { error, value } = validateUser(req.body);
  
  if (error) {
    return express.resp(res, 400, 'Validation failed', {
      errors: error.details
    });
  }
  
  const user = createUser(value);
  return express.resp(res, 201, 'User created successfully', { user });
});
```

### File Upload

```typescript
app.post('/upload', (req, res) => {
  const file = req.file;
  
  if (!file) {
    return express.resp(res, 400, 'No file uploaded', {});
  }
  
  return express.resp(res, 200, 'File uploaded successfully', {
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype
  });
});
```

## Response Types

The response utility supports all standard HTTP status codes:

- 2xx: Success responses
- 3xx: Redirection responses
- 4xx: Client error responses
- 5xx: Server error responses

## TypeScript Interface

```typescript
interface IRes {
  success: boolean;
  message: string;
  data: object;
}
``` 

## Next Steps

- Learn about [Async Handler](./async-handler.md) for clean async code 