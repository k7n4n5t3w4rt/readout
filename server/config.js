// @flow
// Here we're assuming that all environment variables are strings
const EASY /*: string */ = process.env.EASY || "localhost:5000";
const NODE_ENV /*: string */ = process.env.NODE_ENV || "development";
const PORT /*: number */ = parseInt(process.env.PORT) || 4000;
const VERSION /*: string */ = process.env.VERSION || "v1.0.9";
const REMEMBER_ME /*: boolean */ = false;
export default { EASY, NODE_ENV, PORT, VERSION, REMEMBER_ME };
