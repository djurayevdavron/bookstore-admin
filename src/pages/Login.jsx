import { useState } from "react";
import API from "../api";
import {useNavigate,Link,} from "react-router-dom";
import { useTranslation } from "react-i18next";
  
function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {
    try {
      const res = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "role",
        res.data.data.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.data
        )
      );
      navigate("/books");
    } catch (err) {
      alert(t("loginError"));
    }
  };
  return (
    <div
      className="
      flex
      flex-col
      lg:flex-row
      min-h-screen
    "
    >
      {/* LEFT SIDE/Chap taraf qismi */}
      <div
        className="
        hidden
        lg:flex
        w-1/2
        bg-[#f5f3ee]
        items-center
        justify-center
        relative
        overflow-hidden
      "
      >
        {/* BLUR */}
        <div
          className="
          absolute
          w-[500px]
          h-[500px]
          bg-purple-300
          rounded-full
          blur-3xl
          opacity-20
        "
        ></div>
        {/* IMAGE */}
        <img
          src="/Computer login-amico.svg"
          alt="login"
          className="
          w-[90%]
          sm:w-[80%]
          xl:w-[70%]
          max-w-[650px]
          object-contain
          relative
          z-10
          drop-shadow-2xl
          transition-all
          duration-500
        "
        />
      </div>
      {/* RIGHT SIDE/O'ng taraf qismi */}
      <div
       className="
        w-full
        lg:w-1/2
        flex
        items-center
        justify-center
        bg-white
        px-5
        sm:px-8
        py-10
        "
      > 
        <div
          className="
          w-full
          max-w-[420px]
        "
        >
          <h1
            className="
            text-4xl
            sm:text-5xl
            font-bold
            mb-10
            text-gray-800
          "
          >
            {t("login")}
          </h1>
          <div className="space-y-5">
            <input
              type="email"
              placeholder={t("email")}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
              w-full
              p-3
              sm:p-4
              rounded-xl
              bg-[#eef2ff]
              outline-none
            "
            />
            <input
              type="password"
              placeholder={t("password")}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
              w-full
              p-3
              sm:p-4
              rounded-xl
              bg-[#eef2ff]
              outline-none
            "
            />
            <button
              onClick={login}
              className="
              w-full
              bg-[#c49a6c]
              hover:bg-[#6f4d28]
              hover:text-white
              duration-300
              text-white
              p-3
              sm:p-4
              rounded-xl
              text-base
              sm:text-lg
              shadow-lg
              cursor-pointer
            "
            >
              {t("login")}
            </button>

            <p
              className="
              text-center
              text-sm
              sm:text-base
            "
            >
              {t("dontHaveAccount")}{" "}
              <Link
                to="/register"
                className="
                text-indigo-600
                font-semibold
              "
              >
                {t("register")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;