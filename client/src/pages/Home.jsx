import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Switch from "../components/Switch";
import { API, STUDENTS, today } from "../data";

const blank = () =>
  STUDENTS.map((s) => ({
    studentId: s.id,
    name: s.name,
    course: s.course,
    attendance: false,
    homework: false,
  }));

export default function Home() {
  const [date, setDate] = useState(today());
  const [rows, setRows] = useState(blank());
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState("");

  // Oi date er record database e thakle load kore, na thakle blank form dey
  const load = async () => {
    try {
      const { data } = await axios.get(`${API}/attendance/${date}`);
      setSaved(data.length > 0);
      setRows(data.length > 0 ? data : blank());
    } catch {
      setMsg("Can't reach the server.");
    }
  };

  useEffect(() => {
    setMsg("");
    load();
  }, [date]);

  const flip = (i, field) => {
    setRows(
      rows.map((r, idx) => (idx === i ? { ...r, [field]: !r[field] } : r)),
    );
    setMsg("");
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/attendance`, { date, records: rows });
      await load();
      setMsg("Attendance saved.");
    } catch {
      setMsg("Could not save. Try again.");
    }
  };

  const update = async (r) => {
    try {
      await axios.patch(`${API}/attendance/${r._id}`, {
        attendance: r.attendance,
        homework: r.homework,
      });
      setMsg(`${r.name} updated.`);
    } catch {
      setMsg("Could not update. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={save} className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-extrabold text-ink">Take attendance</h1>

        <label className="mt-6 block max-w-xs">
          <span className="mb-1 block text-sm font-semibold">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 outline-none focus:border-ink focus:ring-4 focus:ring-ink/15"
          />
        </label>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-3xl text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm font-bold text-slate-800">
                <th className="w-16 px-4 py-4">#</th>
                <th className="px-4 py-4">Student</th>
                <th className="px-4 py-4 text-center">Attendance</th>
                <th className="px-4 py-4 text-center">Home Work</th>
                {saved && <th className="px-4 py-4 text-center">Action</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.name} className="odd:bg-chalk">
                  <td className="px-4 py-4 text-slate-600">{i + 1}</td>
                  <td className="px-4 py-4">
                    <p className="font-bold">{r.name}</p>
                    <p className="text-slate-600">
                      ID : <span className="font-bold">{r.studentId}</span> (
                      {r.course})
                    </p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Switch
                      on={r.attendance}
                      onChange={() => flip(i, "attendance")}
                      label={`Attendance for ${r.name}`}
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Switch
                      on={r.homework}
                      onChange={() => flip(i, "homework")}
                      label={`Home work for ${r.name}`}
                    />
                  </td>
                  {saved && (
                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => update(r)}
                        className="cursor-pointer rounded-lg border-2 border-ink px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
                      >
                        Update
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {!saved && (
            <button className="cursor-pointer rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-ink-dark">
              Save attendance
            </button>
          )}
          {msg && (
            <p role="status" className="font-semibold text-ink">
              {msg}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
