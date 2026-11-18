import { cache, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 outline-none transition focus:border-ink focus:ring-4 focus:ring-ink/15";

export default function Register() {
  const { saveUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/registration",
        form,
      );

      if (data.success) {
        setSuccess(data.message);
        setForm({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          saveUser(data.user ?? { name: form.fullname, email: form.email });
          navigate("/")
        }, 1500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const toggle = (
    <button
      type="button"
      onClick={() => setShow(!show)}
      aria-label={show ? "Hide passwords" : "Show passwords"}
      className="absolute inset-y-0 right-0 rounded-r-lg px-3.5 text-sm font-semibold text-ink hover:text-ink-dark focus-visible:outline-2 focus-visible:outline-ink cursor-pointer"
    >
      {show ? "Hide" : "Show"}
    </button>
  );

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <aside className="hidden flex-col justify-between bg-ink p-12 text-white lg:flex">
        <div className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid size-9 place-items-center rounded-lg bg-mari text-ink">
            ✓
          </span>
          Students Attendance
        </div>
        <div>
          <p className="max-w-md text-5xl leading-[1.05] font-extrabold">
            Roll call, finished before the bell stops ringing.
          </p>
          <p className="mt-5 max-w-sm text-white/70">
            Mark each student present, late or absent and save the whole class
            in one tap.
          </p>
        </div>
        <p className="text-sm text-white/50">Student attendance tracker</p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="w-full max-w-sm relative">
            {success && (
              <p
                // role="status"
                className="absolute -top-15 w-full mb-4 rounded-lg bg-emerald-50 py-2 px-2 border text-sm font-semibold text-emerald-800 block"
              >
                {success} Taking you to the home page…
              </p>
            )}
            {error && (
              <p
                // role="alert"
                className="absolute -top-15 w-full mb-4 rounded-lg bg-red-50 px-2 border py-2 text-sm font-semibold text-red-700 block"
              >
                {error}
              </p>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-ink">
            Create your account
          </h1>
          <p className="mt-1 mb-8 text-slate-500">
            It takes a minute. Then you can start marking attendance.
          </p>

          <form onSubmit={submit}>
            <label className="mb-4 block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">
                Full name
              </span>
              <input
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="Your name"
                className={inputCls}
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-1 block text-sm font-semibold text-slate-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="teacher@school.edu"
                className={inputCls}
              />
            </label>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className={`${inputCls} pr-16`}
                />
                {toggle}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-semibold text-slate-700"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={show ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={`${inputCls} pr-16`}
                />
                {toggle}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full rounded-lg bg-ink py-3 font-semibold text-white transition hover:bg-ink-dark focus-visible:ring-4 focus-visible:ring-ink/30 focus-visible:outline-none disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-ink underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
