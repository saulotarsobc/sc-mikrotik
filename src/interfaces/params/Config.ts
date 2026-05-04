export interface Config {
  /**
   * Base URL of the Mikrotik REST API, e.g. https://192.168.1.1/rest
   */
  baseUrl: string;

  /**
   * Username for authentication
   */
  username: string;

  /**
   * Password for authentication
   */
  password: string;

  /**
   * Whether to allow insecure TLS connections (self-signed certificates)
   */
  insecure?: boolean;
}
