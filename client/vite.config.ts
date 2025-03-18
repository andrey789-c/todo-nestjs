import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: true,
		port: 4200,
		watch: {
			usePolling: true,
		},
	},
	preview: {
		port: 80,
		strictPort: true,
	},
});
