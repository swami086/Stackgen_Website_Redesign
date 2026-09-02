/* ponytail: throwaway local-only script — delete after use, never run against a
 * non-local DATABASE_URL. Sets a known password for manual Live Preview testing. */
import { getPayload } from "payload";
import config from "@payload-config";

async function main() {
  const payload = await getPayload({ config });
  await payload.update({
    collection: "users",
    where: { email: { equals: "swami086@gmail.com" } },
    data: { password: "LocalTest123!" },
    overrideAccess: true,
  });
  console.log("password set");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
