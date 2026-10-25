import { defineConfig, devices } from '@playwright/test'

// Pruebas de punta a punta sobre la web ya construida (npm run build && npm run test:e2e).
export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: 'http://localhost:4173' },
  webServer: { command: 'node scripts/servir.mjs', port: 4173, reuseExistingServer: true },
  projects: [
    { name: 'celular', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
    { name: 'computador', use: { viewport: { width: 1440, height: 900 } } },
  ],
})
