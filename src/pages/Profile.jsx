import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const logout = () => {
    localStorage.clear();

    navigate("/");
  };
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#020617]
      via-[#071133]
      to-black
      text-white
      flex
      items-center
      justify-center
      px-5
      py-10
      relative
      overflow-hidden
    "
    >

      {/* BACKGROUND BLUR */}
      <div
        className="
        absolute
        w-[400px]
        h-[400px]
        bg-indigo-500
        opacity-20
        blur-3xl
        rounded-full
      "
      ></div>

      {/* MAIN CARD qismi */}
      <div
        className="
        relative
        z-10
        w-full
        max-w-6xl
        bg-[#0b1739]
        border
        border-[#1f2a4d]
        rounded-[40px]
        shadow-2xl
        overflow-hidden
        grid
        grid-cols-1
        lg:grid-cols-2
      "
      >
        {/* LEFT SIDE/Chap taraf qismi */}
        <div
          className="
          flex
          items-center
          justify-center
          p-10
          bg-[#081128]
        "
        >
          <img
            src="/Profile data-amico.svg"
            alt="profile"
            className="
            w-[80%]
            drop-shadow-2xl
          "
          />
        </div>

        {/* RIGHT SIDE/O'ng taraf qismi */}
        <div className="p-10 lg:p-16">

          {/* TITLE qismi */}
          <h1
            className="
            text-5xl
            font-bold
            mb-10
          "
          >
            Profile
          </h1>

          {/* USER INFO */}
          <div className="space-y-6">
            {/* FULL NAME */}
            <div
              className="
              bg-[#111c44]
              p-5
              rounded-2xl
              border
              border-[#1f2a4d]
            "
            >
              <p
                className="
                text-gray-400
                mb-2
              "
              >
                Full Name
              </p>
              <p
                className="
                text-2xl
                font-semibold
              "
              >
                {user?.fullName}
              </p>
            </div>
            {/* EMAIL qismi */}
            <div
              className="
              bg-[#111c44]
              p-5
              rounded-2xl
              border
              border-[#1f2a4d]
            "
            >
              <p
                className="
                text-gray-400
                mb-2
              "
              >
                Email
              </p>
              <p
                className="
                text-xl
                break-all
              "
              >
                {user?.email}
              </p>
            </div>

            {/* ROLE qismi */}
            <div
              className="
              bg-[#111c44]
              p-5
              rounded-2xl
              border
              border-[#1f2a4d]
              flex
              items-center
              justify-between
            "
            >
              <div>
                <p
                  className="
                  text-gray-400
                  mb-2
                "
                >
                  Role
                </p>

                <p
                  className="
                  text-2xl
                  font-bold
                "
                >
                  {user?.role}
                </p>
              </div>
              {/* ROLE BADGE */}
              <span
                className={`
                px-5
                py-2
                rounded-full
                font-bold
                text-white
                ${
                  user?.role?.toLowerCase() ===
                  "admin"
                    ? "bg-red-500"
                    : "bg-green-500"
                }
              `}
              >
                {user?.role}
              </span>
            </div>
          </div>
          {/* LOGOUT BUTTON */}
          <div className="mt-10">
            <button
              onClick={logout}
              className="
              w-full
              bg-red-500
              hover:bg-red-700
              hover:text-black
              duration-500
              p-4
              rounded-2xl
              font-bold
              text-lg
              shadow-xl
              cursor-pointer
            "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;