import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const parentGeneratedConfig = resolve(process.cwd(), '../.svelte-kit/tsconfig.json');

if (!existsSync(parentGeneratedConfig)) {
  mkdirSync(dirname(parentGeneratedConfig), { recursive: true });
  writeFileSync(
    parentGeneratedConfig,
    JSON.stringify(
      {
        compilerOptions: {
          module: 'ESNext',
          moduleResolution: 'bundler',
          target: 'ESNext'
        }
      },
      null,
      2
    ) + '\n'
  );
}
