/**
 * Production environment.
 */
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Cookie key to identify the authenticated user.
 */
export const sessionKey = 'fauna';
