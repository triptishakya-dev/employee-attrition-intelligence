import type { NextConfig } from "next";

// The browser calls same-origin /api/predict; Next proxies it server-side to the
// model API. This avoids CORS and keeps any future API key on the server.
const PREDICT_API_URL = process.env.PREDICT_API_URL ?? "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/predict", destination: `${PREDICT_API_URL}/predict` }];
  },
};

export default nextConfig;
