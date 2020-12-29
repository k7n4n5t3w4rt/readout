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
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${Dyad} path="/" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
