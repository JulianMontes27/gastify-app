import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // This configures a proxy for the development server. Requests to /api will be proxied to http://localhost:3000. This is useful for working with APIs during development, allowing the frontend to make requests to the backend server without dealing with CORS issues. It effectively forwards any request made to /api to the specified backend server.
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
