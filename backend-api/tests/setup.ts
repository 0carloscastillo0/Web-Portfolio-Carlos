import { afterAll, beforeAll, beforeEach } from "vitest";
import { cleanDatabase, prisma } from "./helpers/db.helper";
import { cleanupUploadedFiles, ensureFixtures } from "./helpers/file.helper";

beforeAll(() => {
  ensureFixtures();
});

beforeEach(async () => {
  await cleanDatabase();
  cleanupUploadedFiles();
});

afterAll(async () => {
  cleanupUploadedFiles();
  await prisma.$disconnect();
});
