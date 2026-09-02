/** Parse `--force` from seed script argv (pnpm seed:x -- --force). */
export function seedForceFlag(): boolean {
  return process.argv.includes("--force");
}
