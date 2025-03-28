import { program } from 'commander';
import fs from 'node:fs/promises';

program
  .name('gen-migration')
  .option('--with-sql')
  .argument('<name>', 'migration name')
  .parse();

const options = program.opts<{
  withSql: boolean;
}>();

const migrationName = program.args[0];

const sourceFile = options.withSql
  ? await fs.readFile('./src/sample/with-sql.ts', { encoding: 'utf8' })
  : await fs.readFile('./src/sample/with-query-builder.ts', {
      encoding: 'utf8',
    });

if (!sourceFile) {
  throw new Error(`Source file does not exist.`);
}

const currentDatetime = new Date()
  .toISOString()
  .replaceAll(':', '')
  .replaceAll('-', '')
  .replaceAll('T', '')
  .slice(0, 14);

const fileName = `${currentDatetime}-${migrationName}.ts`;

await fs.writeFile(`./src/migrations/${fileName}`, sourceFile);

// eslint-disable-next-line no-console
console.log(`Created migration file: ${fileName}`);
