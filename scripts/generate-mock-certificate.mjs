import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public", "mock-digital-life-certificate.pdf");

const pdf = await PDFDocument.create();
pdf.setTitle("Mock Digital Life Certificate | Pramaan Relay");
pdf.setAuthor("Pramaan Relay");
pdf.setSubject("Synthetic certificate for public prototype demonstration");
pdf.setKeywords(["synthetic", "digital life certificate", "civic tech", "prototype"]);

const page = pdf.addPage([595.28, 841.89]);
const { width, height } = page.getSize();
const regular = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const mono = await pdf.embedFont(StandardFonts.CourierBold);
const logo = await pdf.embedPng(await readFile(resolve(root, "public", "pramaan-relay-logo.png")));

const ink = rgb(0.08, 0.12, 0.1);
const green = rgb(0.02, 0.31, 0.23);
const coral = rgb(0.86, 0.25, 0.16);
const cream = rgb(0.98, 0.97, 0.93);
const line = rgb(0.82, 0.83, 0.78);
const muted = rgb(0.34, 0.38, 0.35);

page.drawRectangle({ x: 0, y: 0, width, height, color: cream });
page.drawRectangle({ x: 0, y: height - 16, width, height: 16, color: green });
page.drawRectangle({ x: 32, y: 32, width: width - 64, height: height - 64, borderColor: green, borderWidth: 1.2 });

page.drawImage(logo, { x: 54, y: 719, width: 58, height: 58 });
page.drawText("PRAMAAN RELAY", { x: 126, y: 756, size: 11, font: bold, color: green, characterSpacing: 1.2 });
page.drawText("Independent civic-tech prototype", { x: 126, y: 736, size: 9.5, font: regular, color: muted });
page.drawText("SYNTHETIC DEMONSTRATION", { x: 397, y: 750, size: 8.5, font: bold, color: coral, characterSpacing: 0.8 });

page.drawText("Mock Digital Life", { x: 54, y: 660, size: 35, font: bold, color: ink });
page.drawText("Certificate", { x: 54, y: 619, size: 35, font: bold, color: ink });
page.drawText("A human-readable demonstration document for the Pramaan Relay prototype.", { x: 54, y: 585, size: 11, font: regular, color: muted });

page.drawRectangle({ x: 54, y: 530, width: width - 108, height: 36, color: green });
page.drawText("STATUS", { x: 70, y: 543, size: 8, font: bold, color: cream, characterSpacing: 1 });
page.drawText("GENERATED IN PROTOTYPE", { x: 134, y: 541, size: 12, font: bold, color: cream });

const rows = [
  ["Certificate holder", "Shanti Devi (fictional)"],
  ["Pramaan ID", "JP-26-0713-8842"],
  ["Certificate reference", "DLC-MOCK-2026-0007"],
  ["Generated on", "28 August 2026"],
  ["Verification method", "Face authentication simulation"],
  ["Intended recipient", "Pension office (simulated)"],
];

let y = 494;
for (const [label, value] of rows) {
  page.drawText(label.toUpperCase(), { x: 54, y, size: 7.5, font: bold, color: muted, characterSpacing: 0.6 });
  page.drawText(value, { x: 212, y: y - 2, size: 11, font: label.includes("reference") || label.includes("ID") ? mono : regular, color: ink });
  page.drawLine({ start: { x: 54, y: y - 16 }, end: { x: width - 54, y: y - 16 }, color: line, thickness: 0.7 });
  y -= 48;
}

page.drawRectangle({ x: 54, y: 146, width: width - 108, height: 92, color: rgb(1, 0.91, 0.86) });
page.drawText("IMPORTANT", { x: 70, y: 207, size: 8, font: bold, color: coral, characterSpacing: 0.8 });
page.drawText("This is not a government certificate or legal proof.", { x: 70, y: 183, size: 14, font: bold, color: ink });
page.drawText("It uses fictional data and cannot be submitted for pension processing.", { x: 70, y: 163, size: 10, font: regular, color: muted });

page.drawText("Proof should be understandable before it is machine-readable.", { x: 54, y: 104, size: 10, font: bold, color: green });
page.drawText("pramaan-relay.vercel.app", { x: 54, y: 78, size: 8.5, font: mono, color: muted });
page.drawText("Not affiliated with any government agency, bank, or pension authority.", { x: 238, y: 78, size: 7.8, font: regular, color: muted });

await writeFile(output, await pdf.save());
console.log(`Created ${output}`);
