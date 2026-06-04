import {useEffect,useState,} from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Users() {
  const { t } = useTranslation();
  const [users, setUsers] =
    useState([]);
  const showError = (err) => {
    if (
      err.response?.status === 403
    ) {
      alert(t("onlyAdminUsers"));
    } else {
      alert(t("somethingWentWrong"));
    }
  };

  const getUsers = async () => {
    try {

      const res = await API.get(
        "/users"
      );
      setUsers(res.data.data);
    } catch (err) {
      showError(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  const remove = async (id) => {
    try {
      await API.delete(
        `/users/${id}`
      );
      alert(t("userDeleted"));
      getUsers();
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
          {t("users")}
        </h1>
        {/* USERS GRID */}
        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-5
          sm:gap-7
        "
        >
          {users.map((user) => (
            <div
              key={user._id}
              className="
              bg-[#0f172a]
              border
              border-slate-800
              rounded-3xl
              p-5
              sm:p-7
              shadow-2xl
              hover:scale-[1.01]
              duration-300
            "
            >
              {/* USER NAME */}
              <h2
                className="
                text-2xl
                sm:text-3xl
                font-bold
                mb-5
                break-words
              "
              >
                {user.fullName}
              </h2>
              {/* EMAIL qismi */}
              <p className="mb-1 text-base sm:text-lg">
                <strong>{t("profileEmail")}:</strong>
              </p>

              <p
                className="
                mb-3
                text-base
                sm:text-lg
                break-all
              "
              >
                {user.email}
              </p>

              {/* ROLE qismi */}
              <div
                className="
                flex
                items-center
                justify-between
                gap-4
                mb-6
                flex-wrap
              "
              >
                <p
                  className="
                  text-base
                  sm:text-lg
                "
                >
                  <strong>
                    {t("role")}:
                  </strong>{" "}
                  {user.role}
                </p>
                <span
                  className={`
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  sm:text-base
                  font-bold
                  text-white
                  ${
                    user.role ===
                    "ADMIN"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }
                `}
                >
                  {user.role}
                </span>
              </div>
              {/* DELETE BUTTON qismi */}
              <button
                onClick={() =>
                  remove(user._id)
                }
                className="
                bg-gradient-to-r
                from-red-500
                to-pink-600
                hover:from-red-700
                hover:to-pink-800
                hover:text-black
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
                duration-300
                cursor-pointer
              "
              >
                {t("delete")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Users;