const BASE = process.env.VITE_API_URL;

export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(data.message || "Something went wrong. Try again.");
  return data;
}
