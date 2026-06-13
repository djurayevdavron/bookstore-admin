import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Skeleton,
} from "@mui/material";

interface Book {
  _id: string;
  title: string;
  stock: number;
}

interface User {
  _id: string;
  fullName: string;
}

interface Order {
  _id: string;
  bookId: Book;
  userId: User;
  quantity: number;
  status: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

function Orders() {
  const { t } = useTranslation();
  const [skeletonCount, setSkeletonCount] = useState<number>(2);

  const [loading, setLoading] = useState<boolean>(true);

  const [orders, setOrders] = useState<Order[]>([]);

  const [books, setBooks] = useState<Book[]>([]);

  const [bookId, setBookId] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(1);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const role = localStorage.getItem("role");

  const showError = (err: any): void => {
    let message = t("somethingWentWrong");

    if (err.response?.status === 409) {
      message = t("activeOrderExists");
    } else if (err.response?.status === 400) {
      message = t("notEnoughStock");
    } else if (err.response?.status === 401) {
      message = t("unauthorized");
    } else if (err.response?.status === 403) {
      message = t("forbidden");
    } else if (err.response?.data?.message) {
      message = err.response.data.message;
    }

    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const getOrders = async (): Promise<void> => {
    try {
      const res = await API.get("/orders");

      setOrders(res.data.data);

      setSkeletonCount(res.data.data.length || 2);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  const getBooks = async (): Promise<void> => {
    try {
      const res = await API.get("/books");
      setBooks(res.data.data);
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = token.split(".")[1];

      if (payload) {
        const role = JSON.parse(atob(payload)).role;

        if (role === "ADMIN") {
          getOrders();
        } else {
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }

    getBooks();
  }, []);

  const createOrder = async (): Promise<void> => {
    try {
      await API.post("/orders", {
        bookId,
        quantity,
      });
      setSnackbar({
        open: true,
        message: t("orderCreated"),
        severity: "success",
      });
      setBookId("");
      setQuantity(1);
      getOrders();
      getBooks();
    } catch (err) {
      showError(err);
    }
  };
  const remove = async (): Promise<void> => {
    try {
      await API.delete(`/orders/${deleteId}`);

      setSnackbar({
        open: true,
        message: t("orderCancelled"),
        severity: "success",
      });

      getOrders();
      getBooks();
    } catch (err) {
      showError(err);
    }

    setOpenDialog(false);
    setDeleteId(null);
  };
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
        text-white
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
        "
        >
          {t("orders")}
        </h1>

        {/* USER ORDER FORM */}
        {role === "USER" && (
          <div
            className="
            bg-[#0f172a]
            border
            border-slate-800
            shadow-2xl
            rounded-3xl
            p-5
            sm:p-7
            mb-10
          "
          >
            <h2
              className="
              text-2xl
              sm:text-3xl
              font-bold
              mb-6
            "
            >
              {t("createOrder")}
            </h2>
            {/* SELECT */}
            <select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className="
  w-full
  bg-[#020617]
  border
  border-slate-700
  outline-none
  p-3
  sm:p-4
  rounded-2xl
  text-sm
  sm:text-base
  mb-5
"
            >
              <option value="">{t("selectBook")}</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                  {" | "}
                  {t("stock")}:{book.stock}
                </option>
              ))}
            </select>

            {/* QUANTITY/Qolganlari */}
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="
              w-full
              bg-[#020617]
              border
              border-slate-700
              outline-none
              p-3
              sm:p-4
              rounded-2xl
              text-sm
              sm:text-base
              mb-5
            "
            />
            {/* BUTTON qismi*/}
            <button
              onClick={createOrder}
              className="
              bg-indigo-700
              hover:bg-indigo-900
              hover:text-black
              duration-500
              text-white
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
              {t("createOrder")}
            </button>
          </div>
        )}
        {/* ORDERS GRID */}
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
          {loading
            ? [...Array(skeletonCount)].map((_, index) => (
                <div
                  key={index}
                  className="
      bg-[#0f172a]
      border
      border-slate-800
      shadow-2xl
      rounded-3xl
      p-5
      sm:p-7
      "
                >
                  <Skeleton height={35} sx={{ bgcolor: "#020617", mb: 2 }} />
                  <Skeleton height={35} sx={{ bgcolor: "#020617", mb: 2 }} />
                  <Skeleton height={35} sx={{ bgcolor: "#020617", mb: 2 }} />
                  <Skeleton height={35} sx={{ bgcolor: "#020617", mb: 4 }} />

                  <Skeleton
                    variant="rounded"
                    width={180}
                    height={50}
                    sx={{ bgcolor: "#020617" }}
                  />
                </div>
              ))
            : orders.map((order) => (
                <div
                  key={order._id}
                  className="
              bg-[#0f172a]
              border
              border-slate-800
              shadow-2xl
              rounded-3xl
              p-5
              sm:p-7
              hover:scale-[1.01]
              duration-500
            "
                >
                  <p
                    className="
                mb-4
                text-base
                sm:text-lg
                break-words
              "
                  >
                    <strong>{t("book")}:</strong> {order.bookId?.title}
                  </p>

                  <p
                    className="
                mb-4
                text-base
                sm:text-lg
                break-words
              "
                  >
                    <strong>{t("user")}:</strong> {order.userId?.fullName}
                  </p>

                  <p
                    className="
                mb-4
                text-base
                sm:text-lg
              "
                  >
                    <strong>{t("quantity")}:</strong> {order.quantity}
                  </p>

                  <div
                    className="
                flex
                items-center
                justify-between
                flex-wrap
                gap-4
                mb-6
              "
                  >
                    <p
                      className="
                  text-base
                  sm:text-lg
                "
                    >
                      <strong>{t("status")}:</strong> {order.status}
                    </p>

                    <span
                      className="
                  bg-green-600
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  sm:text-base
                  font-bold
                "
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* CANCEL BUTTON qismi */}
                  <button
                    onClick={() => {
                      setDeleteId(order._id);
                      setOpenDialog(true);
                    }}
                    className="
                bg-gradient-to-r
                from-red-500
                to-pink-600
                hover:from-red-700
                hover:to-pink-800
                hover:text-white
                text-white
                px-5
                sm:px-6
                py-2.5
                sm:py-3
                rounded-2xl
                shadow-lg
                font-semibold
                text-sm
                sm:text-base
                duration-500
                cursor-pointer
              "
                  >
                    {t("cancelOrder")}
                  </button>
                </div>
              ))}
        </div>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t("cancelOrder")}</DialogTitle>

        <DialogContent>
          <DialogContentText>{t("areYouSureDelete")}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t("cancel")}</Button>

          <Button color="error" variant="contained" onClick={remove}>
            {t("cancelOrder")}
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
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Orders;
