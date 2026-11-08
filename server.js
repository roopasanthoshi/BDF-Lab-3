
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'college.db');

let db = null;

// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
};

// GET all books with search, sorting, filtering and pagination
app.get('/books', async (req, res) => {
    try {
        const {
            search_q = '',
            order_by = 'id',
            order = 'ASC',
            limit = '10',
            offset = '0',
            min_price,
            max_price
        } = req.query;

        const allowedColumns = [
            'id', 'title', 'author', 'price', 'pages'
        ];

        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({
                message: 'Invalid order_by field'
            });
        }

        const sortOrder = order.toUpperCase();

        if (!['ASC', 'DESC'].includes(sortOrder)) {
            return res.status(400).json({
                message: 'Order must be ASC or DESC'
            });
        }

        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            pageLimit <= 0 ||
            !Number.isInteger(pageOffset) ||
            pageOffset < 0
        ) {
            return res.status(400).json({
                message: 'Invalid limit or offset'
            });
        }

        const conditions = [];
        const params = [];

        if (search_q.trim() !== '') {
            conditions.push('title LIKE ?');
            params.push(`%${search_q}%`);
        }

        if (min_price !== undefined) {
            if (!Number.isFinite(Number(min_price))) {
                return res.status(400).json({
                    message: 'min_price must be numeric'
                });
            }

            conditions.push('price >= ?');
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            if (!Number.isFinite(Number(max_price))) {
                return res.status(400).json({
                    message: 'max_price must be numeric'
                });
            }

            conditions.push('price <= ?');
            params.push(Number(max_price));
        }

        const whereClause = conditions.length > 0
            ? `WHERE ${conditions.join(' AND ')}`
            : '';

        const query = `
            SELECT * FROM books
            ${whereClause}
            ORDER BY ${order_by} ${sortOrder}
            LIMIT ? OFFSET ?
        `;

        params.push(pageLimit, pageOffset);

        const books = await db.all(query, params);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve books'
        });
    }
});

// GET a single book
app.get('/books/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await db.get(
            'SELECT * FROM books WHERE id = ?',
            [bookId]
        );

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            message: 'Unable to retrieve book'
        });
    }
});

// POST a new book
app.post('/books', async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== 'string' || title.trim() === '' ||
            typeof author !== 'string' || author.trim() === '' ||
            price === undefined || price === null ||
            price === '' || !Number.isFinite(Number(price))
        ) {
            return res.status(400).json({
                message: 'Title, author and a numeric price are required'
            });
        }

        const result = await db.run(
            `INSERT INTO books (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title.trim(), author.trim(), Number(price), pages]
        );

        res.status(201).json({
            message: 'Book added successfully',
            bookId: result.lastID
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to add book'
        });
    }
});

// PUT update a book
app.put('/books/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== 'string' || title.trim() === '' ||
            typeof author !== 'string' || author.trim() === '' ||
            price === undefined || price === null ||
            price === '' || !Number.isFinite(Number(price))
        ) {
            return res.status(400).json({
                message: 'Title, author and a numeric price are required'
            });
        }

        const result = await db.run(
            `UPDATE books
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title.trim(), author.trim(), Number(price), pages, bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to update book'
        });
    }
});

// DELETE a book
app.delete('/books/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;

        const result = await db.run(
            'DELETE FROM books WHERE id = ?',
            [bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Unable to delete book'
        });
    }
});

initializeDBAndServer();
