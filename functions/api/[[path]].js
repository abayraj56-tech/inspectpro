import worker from "../../src/worker.js";

// Cloudflare Pages serves files from /public automatically.
// This function handles only /api/* requests and reuses the existing API.
export async function onRequest(context) {
  return worker.fetch(context.request, context.env, context);
}
