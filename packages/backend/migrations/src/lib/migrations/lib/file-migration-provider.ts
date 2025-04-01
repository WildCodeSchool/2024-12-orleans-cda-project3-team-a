import type {
  FileMigrationProviderProps,
  Migration,
  MigrationProvider,
} from 'kysely';
import { platform } from 'node:os';

export type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-indexed-object-style
export type ShallowRecord<K extends keyof any, T> = DrainOuterGeneric<{
  [P in K]: T;
}>;

export class FileMigrationProvider implements MigrationProvider {
  readonly #props: FileMigrationProviderProps;

  constructor(props: FileMigrationProviderProps) {
    this.#props = props;
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {};
    const files = await this.#props.fs.readdir(this.#props.migrationFolder);

    for (const fileName of files) {
      if (
        fileName.endsWith('.js') ||
        (fileName.endsWith('.ts') && !fileName.endsWith('.d.ts')) ||
        fileName.endsWith('.mjs') ||
        (fileName.endsWith('.mts') && !fileName.endsWith('.d.mts'))
      ) {
        let path = /* webpackIgnore: true */ this.#props.path.join(
          this.#props.migrationFolder,
          fileName,
        );

        if (platform() === 'win32') {
          path = 'file://' + path;
        }

        const migration = await import(path);
        const migrationKey = fileName.substring(0, fileName.lastIndexOf('.'));

        // Handle esModuleInterop export's `default` prop...
        if (isMigration(migration?.default)) {
          migrations[migrationKey] = migration.default;
        } else if (isMigration(migration)) {
          migrations[migrationKey] = migration;
        }
      }
    }

    return migrations;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(object: unknown): object is Function {
  return typeof object === 'function';
}

export function isObject(
  object: unknown,
): object is ShallowRecord<string, unknown> {
  return typeof object === 'object' && object !== null;
}

function isMigration(object: unknown): object is Migration {
  return isObject(object) && isFunction(object.up) && isFunction(object.down);
}
