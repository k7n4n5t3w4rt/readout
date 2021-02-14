// @flow
import { h, render } from "../web_modules/preact.js";
import { route } from "../web_modules/preact-router.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import screenfull from "../web_modules/screenfull.js";
import Version from "./Version.js";
import FullscreenToggle from "./FullscreenToggle.js";
import DyadFormInputPole1 from "./DyadFormInputPole1.js";
import DyadFormInputPole2 from "./DyadFormInputPole2.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import Config from "../server/config.js";
import { AppContext } from "./AppContext.js";
import DyadCss from "./Dyad.css.js";

const html = htm.bind(h);

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------
const seed /*: number */ = parseInt(
  "dyad".split("").reduce(
    (acc /*: string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);
rawStyles({});
const [styles] = createStyles(DyadCss);

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/*::
type Props = {
  pole1: string,
  pole2: string,
  sessionId: string
};
*/
const Dyad = (props /*: Props */) => {
  const [state, dispatch] /*: [ AppState, function] */ = useContext(AppContext);
  const [pole1, setPole1] = useState("");
  const [pole2, setPole2] = useState("");

  const sessionId = Date.now().toString();

  return html`
    <div className="${styles.container}">
      <${Version} version="${Config.VERSION}" />
      <${FullscreenToggle} />

      <div className="${styles.formContainer}">
        <form
          action="/readin"
          method="GET"
          onsubmit="${(e /*: Event */) => {
            e.preventDefault();
            const localReadinLink = `readin?pole1=${pole1}&pole2=${pole2}&sessionId=${sessionId}`;
            const localReadoutLink = `readout?pole1=${pole1}&pole2=${pole2}&sessionId=${sessionId}`;
            const absoluteReadoutLink = `${document.location.href}${localReadoutLink}`;
            // $FlowFixMe
            navigator.permissions
              .query({ name: "clipboard-write" })
              .then((result) => {
                if (result.state == "granted" || result.state == "prompt") {
                  /* write to the clipboard now */
                  navigator.clipboard.writeText(absoluteReadoutLink).then(
                    function () {
                      alert(
                        `This link to the readout has been saved to your clipboard. Paste it into a new browser tab:\n\n${absoluteReadoutLink}`,
                      );
                      /* clipboard successfully set */
                    },
                    function () {
                      alert(
                        `This link to the readout has NOT been saved to your clipboard. Copy it and paste it into a new browser tab:\n\n${absoluteReadoutLink}`,
                      );
                      /* clipboard write failed */
                    },
                  );
                }
              });
            route(localReadinLink);
          }}"
        >
          <fieldset>
            <div class="row">
              <${DyadFormInputPole1} setPole1State="${setPole1}" />
            </div>
            <div class="row ${styles.lastRow}">
              <${DyadFormInputPole2} setPole2State="${setPole2}" />
            </div>
            <div class="row">
              <button data-cy="go" class="btn-small blue" type="submit">
                Go
                <i class="material-icons right">login</i>
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  `;
};

export default Dyad;
