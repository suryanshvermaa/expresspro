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
import express,{statusCodes} from 'expresspro';

const app = express();

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  
  return express.resp(res, statusCodes.OK, 'Users retrieved successfully', { users });
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
express.resp(res, statusCodes.OK, 'Operation successful', { data: result });

// 201 Created
express.resp(res, statusCodes.CREATED, 'Resource created', { id: newId });

// 204 No Content
express.resp(res, statusCodes.NO_CONTENT, 'Resource deleted', {});
```

### Error Response

```typescript
// 400 Bad Request
express.resp(res, statusCodes.BAD_REQUEST, 'Invalid input', { errors: validationErrors });

// 404 Not Found
express.resp(res, statusCodes.NOT_FOUND, 'Resource not found', {});
```

## Status Codes
The utility uses standard HTTP status codes to indicate the result of the request:
- `200 OK`: The request was successful.
- `201 Created`: A new resource was successfully created.
- `204 No Content`: The request was successful, but there is no content to return.
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: Authentication is required and has failed or has not yet been provided.
- `403 Forbidden`: The request was valid, but the server is refusing action.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An unexpected error occurred on the server.
- `503 Service Unavailable`: The server is currently unavailable (overloaded or down).
- `422 Unprocessable Entity`: The request was well-formed but was unable to be followed due to semantic errors.
- `429 Too Many Requests`: The user has sent too many requests in a given amount of time.
- `501 Not Implemented`: The server does not support the functionality required to fulfill the request.
- `502 Bad Gateway`: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
- `504 Gateway Timeout`: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
- `505 HTTP Version Not Supported`: The server does not support the HTTP protocol version that was used in the request.
- `511 Network Authentication Required`: The client needs to authenticate to gain network access.

Example usage of status codes:

```typescript
import { statusCodes } from 'expresspro';
express.resp(res, statusCodes.NOT_FOUND, 'User not found', {});
express.resp(res, statusCodes.UNAUTHORIZED, 'Authentication required', {});
express.resp(res, statusCodes.INTERNAL_SERVER_ERROR, 'An unexpected error occurred', {});

throw new AppError('This is a custom error message', statusCodes.BAD_REQUEST);
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
  
  return express.resp(res, statusCodes.OK, 'Items retrieved successfully', {
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
    return express.resp(res, statusCodes.BAD_REQUEST, 'Validation failed', {
      errors: error.details
    });
  }
  
  const user = createUser(value);
  return express.resp(res, statusCodes.CREATED, 'User created successfully', { user });
});
```

### File Upload

```typescript
app.post('/upload', (req, res) => {
  const file = req.file;
  
  if (!file) {
    return express.resp(res, statusCodes.BAD_REQUEST, 'No file uploaded', {});
  }
  
  return express.resp(res, statusCodes.OK, 'File uploaded successfully', {
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