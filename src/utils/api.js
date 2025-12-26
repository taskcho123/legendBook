export async function fetchAPI(path, opts = {}) {
  try {
    const res = await fetch(path, opts);
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }
    return { ok: res.ok };
  } catch (e) {
    console.error("fetch api error", e);
    return null;
  }
}
