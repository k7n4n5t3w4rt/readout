// @flow
import { h } from "../web_modules/preact.js";
import Dyad from "./Dyad.js";
import DyadReadin from "./DyadReadin.js";
import DyadReadout from "./DyadReadout.js";
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
  let pole1 = "Left";
  let pole2 = "Right";
  let sessionId = "example";
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    // $FlowFixMe
    searchParams /*: URLSearchParams */ = new URLSearchParams(
      window.location.search,
    );
    // $FlowFixMe
    pole1 = searchParams.get("pole1") || btoa("Left");
    // $FlowFixMe
    pole2 = searchParams.get("pole2") || btoa("Right");
    // $FlowFixMe
    sessionId = searchParams.get("sessionId") || "example";
  }
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${Dyad} sessionId="${sessionId}" pole1="${pole1}" pole2="${pole2}" path="/" />
        <${DyadReadin} sessionId="${sessionId}" pole1="${pole1}" pole2="${pole2}" path="/readin" />
        <${DyadReadout} sessionId="${sessionId}" pole1="${pole1}" pole2="${pole2}" path="/readout" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
