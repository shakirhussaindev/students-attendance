export default function Switch({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-10 w-24 cursor-pointer rounded-full transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        on ? "bg-ink" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 grid size-8 place-items-center rounded-full bg-white text-sm font-bold shadow transition-transform motion-reduce:transition-none ${
          on ? "translate-x-14 text-ink" : "translate-x-0 text-slate-400"
        }`}
      >
        {on ? "✓" : "✕"}
      </span>
    </button>
  );
}
