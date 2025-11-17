import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.resolve(__dirname, '../prisma/test');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

const testDbPath = path.join(testDir, 'test.db');
process.env.DATABASE_URL = `file:${testDbPath.replace(/\\/g, '/')}`;

export const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});