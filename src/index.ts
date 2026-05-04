import axios from "axios";
import https from "node:https";
import { Auth } from "./interfaces/Auth";
import { Config } from "./interfaces/Config";
import { IpAddressResponse } from "./interfaces/IpAddressResponse";
import { SystemIdentityResponse } from "./interfaces/SystemIdentityResponse";
import { SystemResourceResponse } from "./interfaces/SystemResourceResponse";

export class Mikrotik {
  private client = axios.create();
  private auth: Auth;
  private httpsAgent?: https.Agent;

  constructor(config: Config) {
    this.auth = {
      username: config.username,
      password: config.password,
    };

    if (config.insecure) {
      this.httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    }

    this.client = axios.create({
      baseURL: config.baseUrl,
      auth: this.auth,
      httpsAgent: this.httpsAgent,
    });
  }

  // curl -k -u admin: https://10.155.101.214/rest/system/resource
  public async getSystemResource(): Promise<SystemResourceResponse> {
    const { data } =
      await this.client.get<SystemResourceResponse>(`/system/resource`);
    return data;
  }

  public async getSystemIdentity(): Promise<SystemIdentityResponse> {
    const { data } =
      await this.client.get<SystemIdentityResponse>(`/system/identity`);
    return data;
  }

  /**
   * This method allows getting the list of all records or a single record from the specified menu encoded in the URL.
   */
  public async getIpAddress(): Promise<IpAddressResponse> {
    const { data } = await this.client.get<IpAddressResponse>(`/ip/address`);
    return data;
  }
}

const main = async () => {
  const mikrotik = new Mikrotik({
    baseUrl: "https://192.168.1.111/rest",
    username: "admin",
    password: "asdf1234",
    insecure: true,
  });

  const systemResource = await mikrotik.getSystemResource();
  console.log("\nSystem Resource:");
  console.log(systemResource);

  const systemIdentity = await mikrotik.getSystemIdentity();
  console.log("\nSystem Identity:");
  console.log(systemIdentity);

  const ipAddress = await mikrotik.getIpAddress();
  console.log("\nIP Address:");
  console.log(ipAddress);
};

main();
