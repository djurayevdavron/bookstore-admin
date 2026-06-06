import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Skeleton,
  Box,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

function Books() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem("role");

  const showError = (err) => {
    if (err.response?.status === 401) {
      showSnackbar(t("unauthorized"), "error");
    } else if (err.response?.status === 403) {
      showSnackbar(t("adminOnlyBooks"), "error");
    } else {
      showSnackbar(t("somethingWentWrong"), "error");
    }
  };

  const getBooks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/books");

      setBooks(res.data.data);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
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
      showSnackbar(t("bookCreated"), "success");
      clearForm();
      getBooks();
    } catch (err) {
      showError(err);
    }
  };

  const updateBook = async () => {
    try {
      await API.put(`/books/${editId}`, {
        title,
        author,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
      });
      showSnackbar(t("bookUpdated"), "success");
      clearForm();
      getBooks();
    } catch (err) {
      showError(err);
    }
  };

  const removeBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      showSnackbar(t("bookDeleted"), "success");
      getBooks();
    } catch (err) {
      showError(err);
    }
  };
  const editBook = (book) => {
    setEditId(book._id);

    setTitle(book.title);

    setAuthor(book.author);

    setDescription(book.description);

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
  if (loading) {
    return (
      <>
        <Navbar />

        <div
          className="
  min-h-screen
  p-4
  sm:p-6
  lg:p-7
  bg-[#020617]
"
        >
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
            {t("books")}
          </h1>

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
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    height={72}
                    sx={{
                      bgcolor: "#020617",
                      borderRadius: "18px",
                    }}
                  />
                ))}
              </div>

              <Skeleton
                variant="rounded"
                width={220}
                height={70}
                sx={{
                  mt: 4,
                  bgcolor: "#020617",
                  borderRadius: "18px",
                }}
              />
            </div>
          )}

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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card
                key={item}
                sx={{
                  backgroundColor: "#0f172a",
                  borderRadius: 4,
                  border: "1px solid #1e293b",
                  boxShadow: 5,
                  minHeight: 420,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    height={55}
                    width="65%"
                    sx={{
                      mb: 3,
                      bgcolor: "#020617",
                    }}
                  />

                  <Skeleton height={35} sx={{ bgcolor: "#020617" }} />

                  <Skeleton height={35} sx={{ bgcolor: "#020617" }} />

                  <Skeleton height={35} sx={{ bgcolor: "#020617" }} />

                  <Skeleton height={35} sx={{ bgcolor: "#020617" }} />

                  <Skeleton
                    height={35}
                    sx={{
                      bgcolor: "#020617",
                      mb: 3,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }} />

                  {role === "ADMIN" && (
                    <div className="flex gap-4 mt-4">
                      <Skeleton
                        variant="rounded"
                        width={120}
                        height={55}
                        sx={{ bgcolor: "#020617" }}
                      />

                      <Skeleton
                        variant="rounded"
                        width={120}
                        height={55}
                        sx={{ bgcolor: "#020617" }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }
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
          {t("books")}
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
                placeholder={t("title")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                placeholder={t("author")}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
                placeholder={t("description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              <TextField
                label={t("price")}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    borderRadius: "16px",
                    backgroundColor: "#020617",
                  },

                  "& .MuiInputLabel-root": {
                    color: "#cbd5e1",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#cbd5e1",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#334155",
                  },

                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#475569",
                    },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#3b82f6",
                    },
                }}
              />
              <TextField
                label={t("stock")}
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    borderRadius: "16px",
                    backgroundColor: "#020617",
                  },

                  "& .MuiInputLabel-root": {
                    color: "#cbd5e1",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#cbd5e1",
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#334155",
                  },

                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#475569",
                    },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#3b82f6",
                    },
                }}
              />
              <input
                type="text"
                placeholder={t("category")}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              onClick={editId ? updateBook : createBook}
              className="
              mt-6
              sm:mt-7
              bg-[#3B0B11]
              hover:bg-[#330307]
              hover:text-[#C9AFB2]
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
              {editId ? t("updateBook") : t("addBook")}
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
            <Card
              key={book._id}
              sx={{
                backgroundColor: "#0f172a",
                color: "white",
                borderRadius: 4,
                border: "1px solid #1e293b",
                boxShadow: 5,
                minHeight: role === "ADMIN" ? 420 : 320,
                display: "flex",
                flexDirection: "column",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.01)",
                },
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
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

                <p className="mb-3 text-base sm:text-lg lg:text-xl">
                  <strong>{t("author")}:</strong> {book.author}
                </p>

                <p className="mb-3 text-base sm:text-lg lg:text-xl break-words">
                  <strong>{t("description")}:</strong> {book.description}
                </p>

                <p className="mb-3 text-base sm:text-lg lg:text-xl">
                  <strong>{t("price")}:</strong> {book.price}
                </p>

                <p className="mb-3 text-base sm:text-lg lg:text-xl">
                  <strong>{t("stock")}:</strong> {book.stock}
                </p>

                <p className="mb-6 text-base sm:text-lg lg:text-xl">
                  <strong>{t("category")}:</strong> {book.category}
                </p>

                {role === "ADMIN" && (
                  <div className="mt-auto flex flex-wrap gap-3 sm:gap-4">
                    <button
                      onClick={() => editBook(book)}
                      className="
            bg-[#2525]
            hover:bg-[#2626]
            hover:text-black
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
                      {t("edit")}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedId(book._id);
                        setOpenDelete(true);
                      }}
                      className="
  bg-[#342F4C]
  hover:bg-[#32295E]
  hover:text-black
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
                      {t("delete")}
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>{t("delete")}</DialogTitle>

          <DialogContent>{t("areYouSureDelete")}</DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>{t("cancel")}</Button>

            <Button
              color="error"
              variant="contained"
              onClick={() => {
                removeBook(selectedId);
                setOpenDelete(false);
              }}
            >
              {t("delete")}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={snackbar.severity}
            onClose={() =>
              setSnackbar({
                ...snackbar,
                open: false,
              })
            }
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}
export default Books;
