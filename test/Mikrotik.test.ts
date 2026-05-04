import dotenv from "dotenv";
import { describe, expect, it } from "vitest";
import { Mikrotik } from "../src";

dotenv.config();

const config = {
  baseUrl: process.env.MK_BASE_URL,
  username: process.env.MK_USERNAME,
  password: process.env.MK_PASSWORD,
  insecure: process.env.MK_INSECURE === "true",
};

const hasLiveConfig = Boolean(
  config.baseUrl && config.username && config.password,
);

describe.skipIf(!hasLiveConfig)("Mikrotik live integration", () => {
  const mk = new Mikrotik({
    baseUrl: config.baseUrl!,
    username: config.username!,
    password: config.password!,
    insecure: config.insecure,
  });

  it("busca system resource real do MikroTik", async () => {
    const systemResources = await mk.SystemResourcePrint();

    expect(Array.isArray(systemResources)).toBe(true);
    expect(systemResources.length).toBeGreaterThan(0);
    expect(systemResources[0]).toEqual(
      expect.objectContaining({
        platform: expect.any(String),
        version: expect.any(String),
        uptime: expect.any(String),
        cpu: expect.any(String),
      }),
    );
  });

  it("busca system identity real do MikroTik", async () => {
    const systemIdentities = await mk.SystemIdentityPrint();

    expect(Array.isArray(systemIdentities)).toBe(true);
    expect(systemIdentities.length).toBeGreaterThan(0);
    expect(systemIdentities[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
      }),
    );
    expect(systemIdentities[0].name.length).toBeGreaterThan(0);
  });

  it("busca ip addresses reais do MikroTik", async () => {
    const ipAddresses = await mk.IPAddressPrint();

    expect(Array.isArray(ipAddresses)).toBe(true);
    expect(ipAddresses.length).toBeGreaterThan(0);
    expect(ipAddresses[0]).toEqual(
      expect.objectContaining({
        ".id": expect.any(String),
        address: expect.any(String),
        interface: expect.any(String),
        network: expect.any(String),
      }),
    );
  });

  it("busca PPP secrets reais do MikroTik", async () => {
    const pppSecrets = await mk.PPPSecretPrint();

    expect(Array.isArray(pppSecrets)).toBe(true);
    expect(pppSecrets.length).toBeGreaterThan(0);
    expect(pppSecrets[0]).toEqual(
      expect.objectContaining({
        ".id": expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
        service: expect.any(String),
      }),
    );
  });
});
