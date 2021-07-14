// @flow
import base64url from "../web_modules/base64url.js";

let base64 = base64url;

if (typeof window !== "undefined") {
  base64 = {
    encode: (normalString /*: string */) /*: string */ =>
      window.btoa(normalString),
    decode: (encodedString /*: string */) /*: string */ =>
      window.atob(encodedString),
  };
}

export default base64;
