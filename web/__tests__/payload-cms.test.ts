import { afterEach, describe, expect, it } from "vitest";
import { isPayloadCmsEnabled, payloadBaseUrl } from "@/lib/payload-cms";

describe("payload-cms config", () => {
  const env = { ...process.env };

  afterEach(() => {
    process.env = { ...env };
  });

  it("defaults public URL to local web origin", () => {
    delete process.env.PAYLOAD_PUBLIC_SERVER_URL;
    delete process.env.PAYLOAD_URL;
    expect(payloadBaseUrl()).toBe("http://127.0.0.1:3000");
  });

  it("enables Payload when DATABASE_URL + PAYLOAD_SECRET are set", () => {
    process.env.DATABASE_URL = "postgresql://x";
    process.env.PAYLOAD_SECRET = "secret";
    expect(isPayloadCmsEnabled()).toBe(true);
  });

  it("is disabled without DATABASE_URL or PAYLOAD_SECRET", () => {
    delete process.env.DATABASE_URL;
    delete process.env.PAYLOAD_SECRET;
    expect(isPayloadCmsEnabled()).toBe(false);
  });
});
