// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TEMPORARY: HARDCODE YOUR SERVER'S PUBLIC IP FOR TESTING
const PUBLIC_SERVER_IP = "http://13.60.250.150";
const GRAPHQL_HTTP_URL_TEMP = `${PUBLIC_SERVER_IP}/graphql`;
const GRAPHQL_WS_URL_TEMP = `ws://${PUBLIC_SERVER_IP}/graphql`;

export default defineConfig({
  plugins: [react()],
  define: {
    // This will inject the hardcoded strings directly into the bundle
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(PUBLIC_SERVER_IP),
    'import.meta.env.VITE_GRAPHQL_HTTP_URL': JSON.stringify(GRAPHQL_HTTP_URL_TEMP),
    'import.meta.env.VITE_GRAPHQL_WS_URL': JSON.stringify(GRAPHQL_WS_URL_TEMP),
    // Add a unique debug identifier to confirm this specific build
    'import.meta.env.VITE_BUILD_DEBUG_ID': JSON.stringify("FORCED_DEBUG_BUILD_2024_07_03_Z"), // Change Z to A, B, C etc. for each test
  },
});