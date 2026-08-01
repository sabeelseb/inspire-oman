/**
 * Payload 3.86 + tsx: @next/env default interop fix for loadEnv.
 * Safe to re-run. Called from package.json postinstall.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "node_modules/payload/dist/bin/loadEnv.js");

if (!fs.existsSync(target)) {
  console.log("patch-payload-loadenv: payload not installed, skip");
  process.exit(0);
}

const next = `import * as nextEnvNs from '@next/env';
import { findUpSync } from '../utilities/findUp.js';
const nextEnvImport = nextEnvNs.default ?? nextEnvNs;
const { loadEnvConfig } = nextEnvImport;
/**
 * Try to find user's env files and load it. Uses the same algorithm next.js uses to parse env files, meaning this also supports .env.local, .env.development, .env.production, etc.
 */ export function loadEnv(path) {
    if (path?.length) {
        loadEnvConfig(path, true);
        return;
    }
    const dev = process.env.NODE_ENV !== 'production';
    const { loadedEnvFiles } = loadEnvConfig(process.cwd(), dev);
    if (!loadedEnvFiles?.length) {
        // use findUp to find the env file. So, run loadEnvConfig for every directory upwards
        findUpSync({
            // @ts-expect-error - vestiges of when tsconfig was not strict. Feel free to improve
            condition: (dir)=>{
                const { loadedEnvFiles } = loadEnvConfig(dir, true);
                if (loadedEnvFiles?.length) {
                    return true;
                }
            },
            dir: process.cwd()
        });
    }
}

//# sourceMappingURL=loadEnv.js.map
`;

fs.writeFileSync(target, next);
console.log("patch-payload-loadenv: applied");
