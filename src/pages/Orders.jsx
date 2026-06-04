import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] =
    useState([]);

  const [books, setBooks] =
    useState([]);

  const [bookId, setBookId] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const role =
    localStorage.getItem("role");

  const showError = (err) => {
    console.log(err.response);

    if (
      err.response?.status === 409
    ) {
      alert(t("activeOrderExists"));

    } else if (
      err.response?.status === 400
    ) {
      alert(t("notEnoughStock"));

    } else if (
      err.response?.status === 401
    ) {
      alert(t("unauthorized"));

    } else if (
      err.response?.status === 403
    ) {
      alert(t("forbidden"));

    } else if (
      err.response?.data?.message
    ) {
      alert(
        err.response.data.message
      );

    } else {
      alert(t("somethingWentWrong"));
    }
  };

  const getOrders = async () => {
    try {

      const res = await API.get(
        "/orders"
      );
      setOrders(res.data.data);
    } catch (err) {
      showError(err);
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
    const role =
      JSON.parse(
        atob(
          localStorage
            .getItem("token")
            .split(".")[1]
        )
      ).role;
    if (role === "ADMIN") {
      getOrders();
    }
    getBooks();
  }, []);

  const createOrder = async () => {
    try {
      await API.post("/orders", {
        bookId,
        quantity,
      });
      alert(t("orderCreated"));

      getOrders();
      getBooks();
    } catch (err) {
      showError(err);
    }
  };
  const remove = async (id) => {
    try {
      await API.delete(
        `/orders/${id}`
      );
      alert(t("orderCancelled"));
      getOrders();
      getBooks();
    } catch (err) {
      showError(err);
    }
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
              onChange={(e) =>
                setBookId(
                  e.target.value
                )
              }
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
              <option>
                {t("selectBook")}
              </option>
              {books.map((book) => (
                <option
                  key={book._id}
                  value={book._id}
                >
                  {book.title}
                  {" | "}
                  {t("stock")}:
                  {book.stock}
                </option>
              ))}

            </select>

            {/* QUANTITY/Qolganlari */}
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(
                    e.target.value
                  )
                )
              }
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
          {orders.map((order) => (
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
                <strong>
                  {t("book")}:
                </strong>{" "}
                {
                  order.bookId?.title
                }
              </p>

              <p
                className="
                mb-4
                text-base
                sm:text-lg
                break-words
              "
              >
                <strong>
                  {t("user")}:
                </strong>{" "}
                {
                  order.userId
                    ?.fullName
                }
              </p>

              <p
                className="
                mb-4
                text-base
                sm:text-lg
              "
              >
                <strong>
                  {t("quantity")}:
                </strong>{" "}
                {order.quantity}
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
                  <strong>
                    {t("status")}:
                  </strong>{" "}
                  {order.status}
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
                onClick={() =>
                  remove(order._id)
                }
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
    </>
  );
}
export default Orders;