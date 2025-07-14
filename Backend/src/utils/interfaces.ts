export interface ResponseWithCookie extends Response {
  cookie(name: string, value: string, options?: any): this;
  cookies: any;
  clearCookie: any;
}
