import { get, post } from 'axios';

const functions = '/.netlify/functions';

/**
 * User
 */
export const user = {
  authenticate: async (credentials) => await post(`${functions}/user-login`, credentials),
  create: async (credentials) => await post(`${functions}/user-create`, credentials),
  current: async () => await get(`${functions}/user-current`),
  logout: async () => await get(`${functions}/user-logout`),
};
