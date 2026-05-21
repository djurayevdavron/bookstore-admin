import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] =
    useState("");
  const [author, setAuthor] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const role =
    localStorage.getItem("role");

  const showError = (err) => {
    if (err.response?.status === 401) {
      alert("Unauthorized");
    } else if (
      err.response?.status === 403
    ) {
      alert(
        "Only admin can manage books"
      );
    } else {
      alert("Something went wrong");
    }
  };

  const getBooks = async () => {
    try {
      const res = await API.get(
        "/books"
      );
      setBooks(res.data.data);
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const createBook = async () => {
    try {

      await API.post("/books", {
        title,
        author,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
      });
      alert("Book created");
      clearForm();
      getBooks();
    } catch (err) {
      showError(err);
    }
  };

  const updateBook = async () => {
    try {
      await API.put(
        `/books/${editId}`,
        {
          title,
          author,
          description,
          price: Number(price),
          stock: Number(stock),
          category,
        }
      );
      alert("Book updated");
      clearForm();
      getBooks();
    } catch (err) {
      showError(err);
    }
  };

  const removeBook = async (id) => {
    try {
      await API.delete(
        `/books/${id}`
      );
      alert("Book deleted");
      getBooks();
    } catch (err) {
      showError(err);
    }
  };
  const editBook = (book) => {
    setEditId(book._id);

    setTitle(book.title);

    setAuthor(book.author);

    setDescription(
      book.description
    );

    setPrice(book.price);

    setStock(book.stock);

    setCategory(book.category);
  };

  const clearForm = () => {
    setEditId(null);

    setTitle("");

    setAuthor("");

    setDescription("");

    setPrice("");

    setStock("");

    setCategory("");
  };
  return (
    <>
      <Navbar />
      <div
        className="
        min-h-screen
        bg-[#020617]
        text-white
        p-4
        sm:p-6
        lg:p-7
      "
      >
        {/* TITLE qismi */}
        <h1
          className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          mb-8
          lg:mb-10
        "
        >
          Books/Kitoblar
        </h1>

        {/* ADMIN FORM */}
        {role === "ADMIN" && (
          <div
            className="
            bg-[#0f172a]
            border
            border-slate-800
            rounded-3xl
            p-4
            sm:p-6
            mb-10
            shadow-xl
          "
          >
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-4
              sm:gap-5
            "
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="
                bg-[#020617]
                border
                border-slate-700
                p-3
                sm:p-4
                rounded-2xl
                outline-none
                text-sm
                sm:text-base
              "
              />
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) =>
                  setAuthor(
                    e.target.value
                  )
                }
                className="
                bg-[#020617]
                border
                border-slate-700
                p-3
                sm:p-4
                rounded-2xl
                outline-none
                text-sm
                sm:text-base
              "
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="
                bg-[#020617]
                border
                border-slate-700
                p-3
                sm:p-4
                rounded-2xl
                outline-none
                text-sm
                sm:text-base
              "
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                className="
                bg-[#020617]
                border
                border-slate-700
                p-3
                sm:p-4
                rounded-2xl
                outline-none
                text-sm
                sm:text-base
              "
              />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) =>
                  setStock(
                    e.target.value
                  )
                }
                className="
                bg-[#020617]
                border
                border-slate-700
                p-3
                sm:p-4
                rounded-2xl
                outline-none
                text-sm
                sm:text-base
              "
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="
                bg-[#020617]
                border
                border-slate-700
                p-3
                sm:p-4
                rounded-2xl
                outline-none
                text-sm
                sm:text-base
              "
              />
            </div>
            <button
              onClick={
                editId
                  ? updateBook
                  : createBook
              }
              className="
              mt-6
              sm:mt-7
              bg-red-600
              hover:bg-red-800
              hover:text-black
              transition-all
              duration-500
              px-5
              sm:px-7
              py-3
              sm:py-4
              rounded-2xl
              font-bold
              text-sm
              sm:text-lg
              cursor-pointer
            "
            >
              {editId
                ? "Update Book"
                : "Add Book"}
            </button>
          </div>
        )}

        {/* BOOKS GRID */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          2xl:grid-cols-3
          gap-5
          sm:gap-7
        "
        >
          {books.map((book) => (
            <div
              key={book._id}
              className="
              bg-[#0f172a]
              border
              border-slate-800
              rounded-3xl
              p-5
              sm:p-7
              shadow-xl
              hover:scale-[1.01]
              duration-500
            "
            >
              <h2
                className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                mb-5
                sm:mb-6
                break-words
              "
              >
                {book.title}
              </h2>
              <p
                className="
                mb-3
                text-base
                sm:text-lg
                lg:text-xl
              "
              >
                <strong>
                  Author:
                </strong>{" "}
                {book.author}
              </p>
              <p
                className="
                mb-3
                text-base
                sm:text-lg
                lg:text-xl
                break-words
              "
              >
                <strong>
                  Description:
                </strong>{" "}
                {book.description}
              </p>

              <p
                className="
                mb-3
                text-base
                sm:text-lg
                lg:text-xl
              "
              >
                <strong>
                  Price:
                </strong>{" "}
                {book.price}
              </p>

              <p
                className="
                mb-3
                text-base
                sm:text-lg
                lg:text-xl
              "
              >
                <strong>
                  Stock:
                </strong>{" "}
                {book.stock}
              </p>

              <p
                className="
                mb-6
                text-base
                sm:text-lg
                lg:text-xl
              "
              >
                <strong>
                  Category:
                </strong>{" "}
                {book.category}
              </p>

              {/* ADMIN BUTTONS qismi */}
              {role === "ADMIN" && (
                <div
                  className="
                  flex
                  flex-wrap
                  gap-3
                  sm:gap-4
                "
                >
                  <button
                    onClick={() =>
                      editBook(book)
                    }
                    className="
                    bg-green-600
                    hover:bg-green-800
                    hover:text-black
                    transition-all
                    duration-300
                    px-5
                    sm:px-6
                    py-2.5
                    sm:py-3
                    rounded-2xl
                    font-semibold
                    text-sm
                    sm:text-base
                    cursor-pointer
                  "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      removeBook(
                        book._id
                      )
                    }
                    className="
                    bg-indigo-700
                    hover:bg-indigo-900
                    hover:text-black
                    transition-all
                    duration-500
                    px-5
                    sm:px-6
                    py-2.5
                    sm:py-3
                    rounded-2xl
                    font-semibold
                    text-sm
                    sm:text-base
                    cursor-pointer
                  "
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Books;