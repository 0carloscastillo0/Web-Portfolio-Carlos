import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    include: ["src/modules/**/__tests__/**/*.test.ts"],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
