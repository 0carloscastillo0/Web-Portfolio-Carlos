import fs from "fs";
import path from "path";

const uploadDirs = [
  path.resolve("uploads/users"),
  path.resolve("uploads/cv"),
  path.resolve("uploads/projects"),
];

export const imageFixturePath = path.resolve("tests/fixtures/test-image.png");
export const pdfFixturePath = path.resolve("tests/fixtures/test-cv.pdf");
export const textFixturePath = path.resolve("tests/fixtures/test-file.txt");

export const ensureFixtures = () => {
  const fixturesDir = path.resolve("tests/fixtures");
  if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir, { recursive: true });

  if (!fs.existsSync(imageFixturePath)) {
    const pngBytes = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lwJQqAAAAABJRU5ErkJggg==", "base64");
    fs.writeFileSync(imageFixturePath, pngBytes);
  }

  if (!fs.existsSync(pdfFixturePath)) {
    fs.writeFileSync(pdfFixturePath, "%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n");
  }

  if (!fs.existsSync(textFixturePath)) {
    fs.writeFileSync(textFixturePath, "not an allowed upload file");
  }
};

export const cleanupUploadedFiles = () => {
  for (const dir of uploadDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      fs.unlinkSync(path.join(dir, file));
    }
  }
};
