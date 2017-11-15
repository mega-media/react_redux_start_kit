/* @flow */
export type MethodEnum = 'get' | 'post' | 'put' | 'delete';

export type RequestType = {
  [code: string]: (
    ...args: Array<any>
  ) => {
    protocol?: string,
    host?: string,
    method: MethodEnum,
    path: string,
    body?: any
  }
};

export type ResponseType = {
  [code: string]: (response: any) => any
};
