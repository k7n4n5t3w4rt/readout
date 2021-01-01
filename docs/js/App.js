// @flow
import { h } from "../web_modules/preact.js";
import Dyad from "./Dyad.js";
import Router from "../web_modules/preact-router.js";
import htm from "../web_modules/htm.js";
import { AppProvider } from "./AppContext.js";
const html = htm.bind(h);

/*::
type Props = {
  url: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  let searchParams = "";
  let pole1;
  let pole2;
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    // $FlowFixMe
    searchParams /*: URLSearchParams */ = new URLSearchParams(
      window.location.search,
    );
    // $FlowFixMe
    pole1 = searchParams.get("pole1") || "Left";
    // $FlowFixMe
    pole2 = searchParams.get("pole2") || "Right";
  }
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${Dyad}  pole1="${pole1}" pole2="${pole2}" path="/" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
