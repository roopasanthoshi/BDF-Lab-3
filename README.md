# Lab 3: REST API, Query Parameters, Validation and Debugging

**Name:** Mandava Roopa Santhoshi  
**Registration Number:** 252U1R6111  
**Section:** AIML-2B-207

## Live Deployment

Not deployed yet.

## Objective

To develop REST API endpoints using Node.js, Express.js and SQLite, including query parameters, data validation, pagination and debugging.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Installation and Execution

1. Install Node.js.
2. Open the project folder in VS Code.
3. Install the required packages:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. The server runs on port 3000.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieves all books |
| GET | `/books/:bookId` | Retrieves a particular book |
| POST | `/books` | Adds a new book |
| PUT | `/books/:bookId` | Updates an existing book |
| DELETE | `/books/:bookId` | Deletes a book |

## Query Parameters

The GET `/books` endpoint supports:

- `search_q` – Search books.
- `order_by` – Select the field for sorting.
- `order` – Choose ascending or descending order.
- `limit` – Specify the number of records.
- `offset` – Skip a specified number of records.
- `min_price` – Filter by minimum price.
- `max_price` – Filter by maximum price.

## Validation and Status Codes

- 200 – Successful request.
- 201 – Resource created successfully.
- 400 – Invalid request data.
- 404 – Book not found.
- 500 – Internal server error.

## Screenshots

Add the Postman screenshots of the API requests and their responses in the `screenshots` folder.

## Conclusion

Successfully implemented REST API operations using Express.js and SQLite, with query parameters, validation, pagination and appropriate HTTP status codes.