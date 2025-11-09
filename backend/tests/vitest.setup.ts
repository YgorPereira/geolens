// vitest.setup.ts
import { exec } from 'child_process';
import util from 'util';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { beforeAll, afterEach, afterAll } from 'vitest';

const execAsync = util.promisify(exec);
process.env.DATABASE_URL = 'file:memorydb?mode=memory&cache=shared';
const schemaPath = 'prisma/schema.test.prisma';

export const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

beforeAll(async () => {
  await execAsync(`npx prisma db push --schema=${schemaPath} --force-reset --skip-generate`);
  await prisma.$connect();
});

afterEach(async () => {
  const tablenames = await prisma.$queryRawUnsafe<{ name: string }[]>(`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
  `);
  for (const { name } of tablenames) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${name}";`);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
