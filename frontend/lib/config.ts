// Central place for backend base URLs.
//
// NEXT_PUBLIC_* values are inlined at build time, so these must be set in the
// hosting provider's environment before the production build runs. The
// localhost defaults keep `npm run dev` working with no .env file.

const AI_API = process.env.NEXT_PUBLIC_AI_API_URL || "http://127.0.0.1:8000";
const AUTH_API = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://127.0.0.1:8080";

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, "");

/** FastAPI product CRUD (Postgres). */
export const PRODUCTS_API_URL = `${stripTrailingSlash(AI_API)}/api/v1`;

/** FastAPI AI search + chatbot. */
export const SEARCH_API_URL = `${stripTrailingSlash(AI_API)}/api/v2`;

/** Spring Boot auth service. */
export const AUTH_API_URL = `${stripTrailingSlash(AUTH_API)}/api/v1/auth`;
