import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid size-8 place-items-center rounded-lg bg-mari text-ink">
            ✓
          </span>
          Students Attendance
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-white/70 sm:inline">{user.name}</span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="cursor-pointer rounded-lg border border-white/30 px-3 py-1.5 font-semibold transition hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
