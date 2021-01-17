// @flow
// Here we're assuming that all environment variables are strings
const NODE_ENV /*: string */ = process.env.NODE_ENV || "development";
const REMEMBER_ME /*: boolean */ = process.env.REMEMBER_ME === "true" || true;
const VERSION /*: string */ = process.env.VERSION || "v0.1.8";
const PORT /*: number */ = parseInt(process.env.PORT) || 4000;

export default { NODE_ENV, REMEMBER_ME, VERSION, PORT };
