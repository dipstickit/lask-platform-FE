import { Configuration } from '../client';
import { API_URL } from '../constants';

export const configuration = new Configuration({
  basePath: API_URL,
  middleware: [
    {
      onError: async (error) => {
        console.error('API Error:', error);
        throw error.error;
      },
    },
  ],
  credentials: 'include',
});
