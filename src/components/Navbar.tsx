import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const role = localStorage.getItem("role");
  const [time, setTime] = useState<Date>(new Date());
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");
  };
  const formatTime = (timezone: string): string => {
    return time.toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour12: false,
    });
  };
  return (
    <div
      className="
  bg-[#262727]
  text-white
  border-b
  border-[#1f2a4d]
  relative
  z-50
"
    >
      {/* TOP NAVBAR qismi */}
      <div
        className="
        flex
        items-center
        justify-between
        px-4
        sm:px-6
        lg:px-10
        py-5
        bg-[#2a2a2a]
      "
      >
        {/* LOGO qismi */}
        <div
          className="
          flex
          items-center
          min-w-[100px]
          "
        >
          <img
            src="/logo.png"
            alt="logo"
            className="
          w-20
          h-20
          md:w-24
          md:h-24
          object-contain
          "
          />
        </div>
        {/* DESKTOP MENU qismi */}
        <div
          className="
          hidden
          xl:flex
          items-center
          gap-8
          ml-10
          
        "
        >
          {/* LINKS/linklar */}
          <div className="flex gap-8">
            <Link
              to="/books"
              className="
              font-bold
              text-2xl
              text-slate-300
              hover:text-slate-400
              duration-300
            "
            >
              {t("books")}
            </Link>
            {role === "ADMIN" && (
              <Link
                to="/users"
                className="
                font-bold
                text-2xl
                text-slate-300
                hover:text-slate-400
                duration-500
              "
              >
                {t("users")}
              </Link>
            )}
            <Link
              to="/orders"
              className="
              font-bold
              text-2xl
              text-slate-300
              hover:text-slate-400
              duration-500
            "
            >
              {t("orders")}
            </Link>
          </div>

          {/* CLOCKS */}
          <div
            className="
            flex
            gap-8
            font-semibold
            text-[#B17A50]
            text-base
            text-slate-300
            
          "
          >
            <p>
              {t("tashkent")} {formatTime("Asia/Tashkent")}
            </p>
            <p>
              {t("moscow")} {formatTime("Europe/Moscow")}
            </p>
            <p>
              {t("london")} {formatTime("Europe/London")}
            </p>
            <p>
              {t("washington")} {formatTime("America/New_York")}
            </p>
          </div>

          {/* BUTTONS/Buttonlar */}
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <Link
              to="/profile"
              className="
              bg-slate-700
              hover:bg-slate-600
              hover:text-black
              duration-500
              px-6
              py-3
              rounded-2xl
              min-w-[100px]
              font-bold
              text-center
            "
            >
              {t("profile")}
            </Link>
            <button
              onClick={logout}
              className="
              bg-[#991b1b]
              hover:bg-[#7f1d1d]
              hover:text-black
              duration-500
              px-6
              py-3
              rounded-2xl
              font-bold
              min-w-[100px]
              cursor-pointer
            "
            >
              {t("logout")}
            </button>
          </div>
        </div>
        {/* MOBILE BUTTON qismi*/}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
          xl:hidden
          cursor-pointer
        "
        >
          {menuOpen ? <X size={34} /> : <Menu size={34} />}
        </button>
      </div>
      {/* MOBILE MENU qismi */}
      {menuOpen && (
        <div
          className="
          xl:hidden
          bg-[#0b1739]
          border-t
          border-[#1f2a4d]
          px-6
          py-6
          flex
          flex-col
          gap-5
        "
        >
          {/* CLOCKS */}
          <div
            className="
            flex
            flex-col
            gap-3
            text-slate-300
            font-semibold
            text-sm
            pb-4
            border-b
            border-[#1f2a4d]
          "
          >
            <p>
              {t("tashkent")}: {formatTime("Asia/Tashkent")}
            </p>

            <p>
              {t("moscow")}: {formatTime("Europe/Moscow")}
            </p>

            <p>
              {t("london")}: {formatTime("Europe/London")}
            </p>

            <p>
              {t("washington")}: {formatTime("America/New_York")}
            </p>
          </div>

          {/* LINKS */}
          <div
            className="
            flex
            flex-col
            gap-5
            pt-2
          "
          >
            <Link
              to="/books"
              onClick={() => setMenuOpen(false)}
              className="
              text-xl
              font-bold
              hover:text-red-500
              duration-500
            "
            >
              {t("books")}
            </Link>

            {role === "ADMIN" && (
              <Link
                to="/users"
                onClick={() => setMenuOpen(false)}
                className="
                text-xl
                font-bold
                hover:text-red-500
                duration-300
              "
              >
                {t("users")}
              </Link>
            )}

            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="
              text-xl
              font-bold
              hover:text-red-500
              duration-300
            "
            >
              {t("orders")}
            </Link>
          </div>

          {/* BUTTONS */}
          <div
            className="
            flex
            flex-col
            gap-4
            pt-4
          "
          >
            <LanguageSwitcher />
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="
              bg-slate-700
              hover:bg-slate-600
              hover:text-white
              duration-300
              px-6
              py-3
              rounded-2xl
              font-bold
              min-w-[140px]
              text-center
            "
            >
              {t("profile")}
            </Link>
            <button
              onClick={logout}
              className="
              bg-[#991b1b]
              hover:bg-[#7f1d1d]
              hover:text-black
              duration-500
              px-6
              py-3
              rounded-2xl
              font-bold
              min-w-[140px]
              cursor-pointer
            "
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
