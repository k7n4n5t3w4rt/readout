// @flow
import config from "../server/config.js";

let EASY /*: string */;
let NODE_ENV /*: string */;
let REMEMBER_ME /*: boolean */;
let VERSION /*: string */;

if (typeof process === "undefined" || process.release.name !== "node") {
  EASY = window.EASY;
  NODE_ENV = window.NODE_ENV;
  REMEMBER_ME = window.REMEMBER_ME;
  VERSION = window.VERSION;
} else {
  EASY = config.EASY;
  NODE_ENV = config.NODE_ENV;
  VERSION = config.VERSION;
  REMEMBER_ME = config.REMEMBER_ME;
}

export default {
  EASY,
  NODE_ENV,
  REMEMBER_ME,
  VERSION,
};
