# 📚 Book Notes

Book Notes is a full-stack web app built as a capstone project where users can store and manage personal notes and reviews about books they’ve read. It supports creating, editing, deleting, and sorting books using ISBN metadata and provides a clean UI powered by Bootstrap.

## 🚀 Features

- 🔍 **Search by ISBN** – Find and organize books by their unique ISBN.
- ➕ **Add a Book** – Enter book details including title, author, cover image, and a personal review.
- ✏️ **Edit Review** – Inline edit functionality with dynamic text resizing for better UX.
- 🗑️ **Delete Book** – Safely remove entries with confirmation.
- 🔀 **Sort Options** – Sort by newest, oldest, A-Z, or Z-A.
- 🌗 **Dark/Light Mode** – Toggle themes for a personalized look.

## 🛠️ Tech Stack

- **Frontend:** EJS, Bootstrap, Vanilla JS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

## 🧠 Core Concepts Covered

- Server-side rendering with EJS
- RESTful routes
- CRUD operations
- Bootstrap grid & component styling
- PostgreSQL integration
- Git feature branching and merging with `--no-ff` strategy

## 💻 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/justciocan/Book-Notes.git
   ```

2. **Navigate into the project folder**
   ```bash
   cd Book-Notes
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up PostgreSQL**
   - Create a `books` table with the following fields:
     - `id`: integer, primary key, auto-increment
     - `isbn`: bigint
     - `title`: varchar(100)
     - `author`: varchar(50)
     - `review`: text (default: "Not Reviewed")
     - `cover`: text

5. **Start the app**
   ```bash
   node index.js
   ```

6. **Visit in browser**
   ```
   http://localhost:3000
   ```

## ⚙️ Dev Notes

- All new features are developed in a feature branch (e.g. `features/edit`) and merged into `master` using a `--no-ff` strategy for visible Git graph branching.
- Keep your layout consistent – layout bugs were squashed with responsive tweaks to Bootstrap classes.
- Default DB values (e.g. “Not Reviewed”) are managed directly in PostgreSQL, not via JS fallbacks.

## 🤝 Contributing

This is a solo capstone project, but forks and suggestions are welcome!

## 🧠 Author

**Cosmin Ciocan**
