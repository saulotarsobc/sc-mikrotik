import axios from "axios";
import https from "node:https";
import type { Auth } from "./interfaces/params/Auth";
import type { Config } from "./interfaces/params/Config";
import type { IpAddressResponse } from "./interfaces/responses/IpAddressResponse";
import type { SystemIdentityResponse } from "./interfaces/responses/SystemIdentityResponse";
import type { SystemResourceResponse } from "./interfaces/responses/SystemResourceResponse";

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

export type { Auth } from "./interfaces/params/Auth";
export type { Config } from "./interfaces/params/Config";
export type { IpAddressResponse } from "./interfaces/responses/IpAddressResponse";
export type { SystemIdentityResponse } from "./interfaces/responses/SystemIdentityResponse";
export type { SystemResourceResponse } from "./interfaces/responses/SystemResourceResponse";
