import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const docsRoot = resolve(import.meta.dirname, '..');
const source = resolve(docsRoot, '../api.liforma.ai/openapi/authoring.json');
const destination = resolve(docsRoot, 'static/_alpha/openapi/publisher.json');
const expected = readFileSync(source, 'utf8');

if (process.argv.includes('--check')) {
	let actual = '';
	try {
		actual = readFileSync(destination, 'utf8');
	} catch {
		// Report the same actionable drift message for a missing artifact.
	}
	if (actual !== expected) {
		console.error('Alpha Publisher OpenAPI is stale. Run npm run openapi:publisher:sync.');
		process.exit(1);
	}
	console.log('Alpha Publisher OpenAPI is current.');
} else {
	writeFileSync(destination, expected);
	console.log(`Wrote ${destination}`);
}
