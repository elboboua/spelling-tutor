import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // listen on all interfaces
    server: {
        host: "0.0.0.0",
    },
});
