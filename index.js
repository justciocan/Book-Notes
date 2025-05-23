import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  password: "Tristam2",
  host: "localhost",
  database: "booknotes",
  port: 5432,
});

db.connect();

let sort = "id ASC";
let books = [
  {
    id: 1,
    isbn: 0,
    title: "Title",
    author: "Author",
    review: "Not Reviewed",
    cover:
      "https://www.citypng.com/public/uploads/preview/png-open-book-with-question-mark-cartoon-illustration-701751694862187kfkjrdyrsu.png",
  },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const sortMap = {
    newest: "id DESC",
    oldest: "id ASC",
    az: "title ASC",
    za: "title DESC",
  };

  const sortKey = req.query.sort || "newest";
  const sortClause = sortMap[sortKey] || "id DESC";

  try {
    const result = await db.query(`SELECT * FROM books ORDER BY ${sortClause}`);
    res.render("index.ejs", { bookList: result.rows, sortKey: sortKey });
  } catch (error) {
    console.error("DB Error:", error);
    res.send("Something went wrong.");
  }
});

app.post("/page", async (req, res) => {
  const searchedBook = req.body.newBook;
  try {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}`
    );
    const newTitle = result.data.items[0].volumeInfo.title;
    const newCover = `https://covers.openlibrary.org/b/isbn/${searchedBook}-L.jpg`;
    const newAuthor = result.data.items[0].volumeInfo.authors;
    res.render("page.ejs", {
      title: newTitle,
      cover: newCover,
      author: newAuthor,
      isbn: searchedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.post("/add", async (req, res) => {
  const bookISBN = req.body.isbn;
  const bookTitle = req.body.title;
  const bookAuthor = req.body.author;
  const bookCover = req.body.cover;
  try {
    await db.query(
      "INSERT INTO books (isbn, title, author, cover) VALUES ($1, $2, $3, $4)",
      [bookISBN, bookTitle, bookAuthor, bookCover]
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  try {
    await db.query("UPDATE books SET review=$1 WHERE id=$2", [
      req.body.updateReview,
      req.body.updateId,
    ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete", async (req, res) => {
  try {
    const deleteISBN = req.body.isbn;
    await db.query("DELETE FROM books WHERE isbn = $1", [deleteISBN]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
