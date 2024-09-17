import { Middleware, ResponseContext } from '../client';

const requestInterceptor: Middleware = {
  async pre(context) {
    console.log('Request made:', context.url);
    return context;
  },
};

const responseInterceptor: Middleware = {
  async post(context: ResponseContext) {
    console.log('Response received:', context.response);
    return context.response;
  },
};

export const interceptors = [requestInterceptor, responseInterceptor];
