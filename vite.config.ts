import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_ACTIONS && !process.env.VERCEL;

export default defineConfig({
  base: isGitHubPages ? '/historical-leaders/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
