import axios from "axios";
import https from "node:https";
import type { Auth } from "./interfaces/params/Auth";
import type { Config } from "./interfaces/params/Config";
import type { IPAddressPrintResponse } from "./interfaces/responses/IPAddressPrintResponse";
import { PPPSecretPrintResponse } from "./interfaces/responses/PPPSecretPrintResponse";
import { SystemIdentityPrintResponse } from "./interfaces/responses/SystemIdentityPrintResponse";
import { SystemResourcePrintResponse } from "./interfaces/responses/SystemResourcePrintResponse";

/**
 * Mikrotik is a class that provides methods to interact with the Mikrotik REST API.
 * It allows you to retrieve system resource information, system identity information, and IP address information from a Mikrotik device.
 * The class uses the axios library to make HTTP requests to the Mikrotik REST API and supports basic authentication.
 * It also allows you to configure an HTTPS agent to ignore SSL certificate errors if needed.
 * @see https://help.mikrotik.com/docs/spaces/ROS/pages/47579162/REST+API for more information about the Mikrotik REST API.
 */
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
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Gets the system resource information from the Mikrotik device.
   * @returns A promise that resolves to the system resource response
   * @type {SystemResourcePrintResponse}
   */
  public async SystemResourcePrint(): Promise<SystemResourcePrintResponse[]> {
    const { data } = await this.client.post<SystemResourcePrintResponse[]>(
      `/system/resource/print`,
    );
    return data;
  }

  /**
   * This method allows getting the system identity information.
   * @returns A promise that resolves to the system identity response.
   * @type {SystemIdentityPrintResponse[]}
   */
  public async SystemIdentityPrint(): Promise<SystemIdentityPrintResponse[]> {
    const { data } = await this.client.post<SystemIdentityPrintResponse[]>(
      `/system/identity/print`,
    );
    return data;
  }

  /**
   * This method allows getting the IP address information.
   * @returns A promise that resolves to the IP address response.
   * @type {IPAddressPrintResponse[]}
   */
  public async IPAddressPrint(): Promise<IPAddressPrintResponse[]> {
    const { data } =
      await this.client.post<IPAddressPrintResponse[]>(`/ip/address/print`);
    return data;
  }

  /**
   * This method allows getting the PPP secret information.
   * @returns A promise that resolves to the PPP secret response.
   * @type {PPPSecretPrintResponse}
   */
  public async PPPSecretPrint(): Promise<PPPSecretPrintResponse[]> {
    const { data } =
      await this.client.post<PPPSecretPrintResponse[]>(`/ppp/secret/print`);
    return data;
  }
}

// Exporting Parameters types
export type { Auth } from "./interfaces/params/Auth";
export type { Config } from "./interfaces/params/Config";

// Exporting Response types
export type { IPAddressPrintResponse } from "./interfaces/responses/IPAddressPrintResponse";
export type { PPPSecretPrintResponse } from "./interfaces/responses/PPPSecretPrintResponse";
export type { SystemIdentityPrintResponse } from "./interfaces/responses/SystemIdentityPrintResponse";
export type { SystemResourcePrintResponse } from "./interfaces/responses/SystemResourcePrintResponse";
