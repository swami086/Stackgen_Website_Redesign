/**
 * Create a Payload admin user (local dev).
 *
 *   cd web
 *   export DATABASE_URL=postgresql://payload:<pw>@127.0.0.1:5433/payload
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='YourSecurePass1!' pnpm create:admin
 */
import { getPayload } from "payload";
import config from "@payload-config";

const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;

async function main() {
  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars.");
    process.exit(1);
  }

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });

  if (docs[0]) {
    await payload.update({
      collection: "users",
      id: docs[0].id,
      data: {
        password,
        loginAttempts: 0,
        lockUntil: null,
      },
      overrideAccess: true,
    });
    console.log(`Updated password for existing user ${email} (id=${docs[0].id})`);
  } else {
    const user = await payload.create({
      collection: "users",
      data: { email, password },
      overrideAccess: true,
    });
    console.log(`Created user ${email} (id=${user.id})`);
  }

  const server =
    process.env.PAYLOAD_PUBLIC_SERVER_URL ?? "http://127.0.0.1:3000";
  console.log(`Login: ${server}/admin/login`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
