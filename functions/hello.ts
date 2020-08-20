import { lambda } from './utils/http';

/**
 * Hello world
 */
export const handler = lambda(() => {
  return {
    message: 'Hello world',
  };
});
