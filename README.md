# Lab 3: REST API, Query Parameters, Validation and Debugging

**Name:** Mandava Roopa Santhoshi  
**Registration Number:** 252U1R6111  
**Section:** AIML-2B-207

## Live Deployment

**GitHub Repository:** https://github.com/roopasanthoshi/BDF-Lab-3

**Render URL:** https://bdf-lab-3-ofb9.onrender.com

**Live API Endpoint:** https://bdf-lab-3-ofb9.onrender.com/books

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
2. Clone the repository:

```bash
git clone https://github.com/roopasanthoshi/BDF-Lab-3.git
```

3. Open the project folder in VS Code.
4. Install the required packages:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

6. The server runs on port 3000 by default.

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

- `search_q` – Searches books by partial title.
- `order_by` – Selects the field for sorting.
- `order` – Specifies ascending or descending order.
- `limit` – Specifies the number of records.
- `offset` – Skips a specified number of records.
- `min_price` – Filters by minimum price.
- `max_price` – Filters by maximum price.

### Example Requests

```text
/books?search_q=Atomic
/books?order_by=price&order=DESC
/books?min_price=200&max_price=500
/books?limit=3&offset=0
```

## Validation and Status Codes

- **200** – Successful request.
- **201** – Resource created successfully.
- **400** – Invalid request data.
- **404** – Book not found.
- **500** – Internal server error.

## Screenshots

Postman screenshots demonstrating successful API requests, query parameters, validation and error responses are included in the project.

## Conclusion

Successfully implemented REST API operations using Express.js and SQLite, with query parameters, validation, filtering, sorting, pagination and appropriate HTTP status codes.