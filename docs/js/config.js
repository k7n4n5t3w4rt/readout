// @flow
let NODE_ENV /*: string */ = "development";
let REMEMBER_ME /*: boolean */ = false;
let VERSION /*: string */ = "v0.1.10";
if (typeof process === "undefined" || process.release.name !== "node") {
  NODE_ENV = window.NODE_ENV;
  REMEMBER_ME = window.REMEMBER_ME;
  VERSION = window.VERSION;
}

export default {
  NODE_ENV,
  REMEMBER_ME,
  VERSION,
};
