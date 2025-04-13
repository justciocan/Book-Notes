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

let bookTitle = "Title";
let bookCover =
  "https://www.citypng.com/public/uploads/preview/png-open-book-with-question-mark-cartoon-illustration-701751694862187kfkjrdyrsu.png";
let bookReview = "No Reviews Yet";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/page", async (req, res) => {
  const book = req.body.newBook;
  try {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${book}`
    );
    bookTitle = result.data.items[0].volumeInfo.title;
    bookCover = `https://covers.openlibrary.org/b/isbn/${book}-L.jpg`;
    res.render("page.ejs", {
      title: bookTitle,
      cover: bookCover,
      review: bookReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
