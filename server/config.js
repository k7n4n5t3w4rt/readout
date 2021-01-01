// @flow
// Here we're assuming that all environment variables are strings
const NODE_ENV /*: string */ = process.env.NODE_ENV || "developmnt";
const REMEMBER_ME /*: boolean */ = process.env.REMEMBER_ME === "true" || false;
const PORT /*: number */ = parseInt(process.env.PORT) || 4000;

export default { NODE_ENV, REMEMBER_ME, PORT };
