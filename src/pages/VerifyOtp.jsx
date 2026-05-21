import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] =
    useState("");

  const email =
    localStorage.getItem(
      "verifyEmail"
    );
  const verifyOtp = async () => {
    try {
      await API.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      alert("Account verified/Akkauntin tasdiqlandi!");
      navigate("/");
    } catch (err) {
      alert("OTP error");
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
      {/* LEFT chap taraf qismi */}
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
        <div
          className="
          absolute
          w-[500px]
          h-[500px]
          bg-green-300
          rounded-full
          blur-3xl
          opacity-20
        "
        ></div>
        <img
          src="/Verified-pana.svg"
          alt="verify"
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

      {/* RIGHT.O'ng taraf qismi */}
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
            Verify OTP
          </h1>
          <div className="space-y-5">
            <input
              type="text"
              placeholder="OTP/OTP tasdiqlash kodini kiriting!"
              onChange={(e) =>
                setOtp(
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
              onClick={verifyOtp}
              className="
              w-full
              bg-[#c49a6c]
              hover:bg-[#6f4d28]
              hover:text-white
              duration-500
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
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerifyOtp;