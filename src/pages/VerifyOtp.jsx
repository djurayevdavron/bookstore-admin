import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";

function VerifyOtp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email = localStorage.getItem("verifyEmail");
  const verifyOtp = async () => {
    try {
      setLoading(true);
      setError("");

      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      navigate("/");
    } catch (err) {
      setError(t("otpError"));
    } finally {
      setLoading(false);
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
            {t("verifyOtp")}
          </h1>
          <div className="space-y-5">
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              fullWidth
              label={t("enterOtp")}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={verifyOtp}
              disabled={loading}
              sx={{
                backgroundColor: "#c49a6c",
                "&:hover": {
                  backgroundColor: "#6f4d28",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                t("verify")
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerifyOtp;
