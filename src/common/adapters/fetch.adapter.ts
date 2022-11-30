import { HttpAdapter } from "../interfaces/http-adapter.interface";

export class FetchAdapter implements HttpAdapter {
  
  get<T>(url: string): Promise<T> {
    throw new Error("Method not implemented.");
  }

}