// @flow
let EASY /*: string */;
let NODE_ENV /*: string */;
let PORT /*: number */;
let REMEMBER_ME /*: boolean */;
let VERSION /*: string */;

if (typeof process === "undefined" || process.release.name !== "node") {
  EASY = window.EASY;
  NODE_ENV = window.NODE_ENV;
  REMEMBER_ME = window.REMEMBER_ME;
  VERSION = window.VERSION;
} else {
  // Here we're assuming that all process.env variables are strings
  EASY = process.env.EASY || "localhost:5000";
  NODE_ENV = process.env.NODE_ENV || "development";
  PORT = parseInt(process.env.PORT) || 4000;
  REMEMBER_ME = false;
  VERSION = process.env.VERSION || "DEV";
}
export default { EASY, NODE_ENV, PORT, VERSION, REMEMBER_ME };
