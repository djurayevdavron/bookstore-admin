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
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

function Users() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [skeletonCount, setSkeletonCount] = useState<number>(2);

  const [users, setUsers] = useState<User[]>([]);
  const showError = (err: any): void => {
    setSnackbar({
      open: true,
      message:
        err.response?.status === 403
          ? t("onlyAdminUsers")
          : t("somethingWentWrong"),
      severity: "error",
    });
  };

  const getUsers = async (): Promise<void> => {
    try {
      const res = await API.get("/users");

      setUsers(res.data.data);
      setSkeletonCount(res.data.data.length || 2);
    } catch (err) {
      showError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  const remove = async (): Promise<void> => {
    try {
      await API.delete(`/users/${deleteId}`);

      setSnackbar({
        open: true,
        message: t("userDeleted"),
        severity: "success",
      });

      getUsers();
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
          {loading
            ? [...Array(skeletonCount)].map((_, index) => (
                <div
                  key={index}
                  className="
      bg-[#0f172a]
      border
      border-slate-800
      rounded-3xl
      p-5
      sm:p-7
      shadow-2xl
    "
                >
                  <Skeleton height={50} sx={{ bgcolor: "#020617", mb: 3 }} />

                  <Skeleton height={30} sx={{ bgcolor: "#020617", mb: 2 }} />

                  <Skeleton height={30} sx={{ bgcolor: "#020617", mb: 2 }} />

                  <Skeleton
                    height={40}
                    width={120}
                    sx={{ bgcolor: "#020617", mb: 4 }}
                  />

                  <Skeleton
                    variant="rounded"
                    width={140}
                    height={50}
                    sx={{ bgcolor: "#020617" }}
                  />
                </div>
              ))
            : users.map((user) => (
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
                      <strong>{t("role")}:</strong> {user.role}
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
                  ${user.role === "ADMIN" ? "bg-red-500" : "bg-green-500"}
                `}
                    >
                      {user.role}
                    </span>
                  </div>
                  {/* DELETE BUTTON qismi */}
                  <button
                    onClick={() => {
                      setDeleteId(user._id);
                      setOpenDialog(true);
                    }}
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t("delete")}</DialogTitle>

        <DialogContent>
          <DialogContentText>{t("areYouSureDelete")}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t("cancel")}</Button>

          <Button color="error" variant="contained" onClick={remove}>
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
export default Users;
