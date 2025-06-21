# Library Management API

A full-featured API built with Express, TypeScript and Mongodb using mongoose to manage books and borrowing operations in a library system.

### features

- Book Management: Create, read, update, delete books
- Filtering & Sorting: Filter by genre, sort by filed, limit results,
- Borrowing Logic: Handles availibility, updates copies
- Aggrigation: Summery of borrowed books
- Validation: Mongoose validation with custome roles
- Error Handiling: Unified and structured error response

## installation & Setup

git clone <repo-url>
cd B5A3-library-management-apis
npm install
npm run dev

Ensure MongoDB is running locally or provided a URL in .env

MONGODB_URL=mongodb://localhost:27017/library

## API Endpoints

### 1. Create Book

`POST /api/books`

```bash
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### 2. Get All Books

`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

### 3. Get Books by ID

`GET /api/books/:bookId`

### 4. Update Book

`PUT /api/books/:bookId`

```bash
{
  "copies": 50
}
```

### 5. Delete Book

`DELETE /api/books/:bookId`

# Borrow API

### 1. Borrow Book

`POST /api/borrow`

```bash
{
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### 2. Borrowed Summary (Aggregation)

`GET /api/borrow`

```bash
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": { "title": "The Hobbit", "isbn": "9780345339683" },
      "totalQuantity": 4
    }
  ]
}
```

Contact

Author: Md Repon Mia

Project: Library Management API

Tech: Express, TypeScript, MongoDB, Mongoose
