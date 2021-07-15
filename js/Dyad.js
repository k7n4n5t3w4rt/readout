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
import DyadFormInputQuestion from "./DyadFormInputQuestion.js";
import DyadFormInputPole1 from "./DyadFormInputPole1.js";
import DyadFormInputPole2 from "./DyadFormInputPole2.js";
import DyadFormInputSession from "./DyadFormInputSession.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import Config from "./config.js";
import { AppContext } from "./AppContext.js";
import DyadCss from "./Dyad.css.js";
import base64 from "./base64.js";

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
};
*/
const Dyad = (props /*: Props */) => {
  const [state, dispatch] /*: [ AppState, function] */ = useContext(AppContext);
  const [pole1, setPole1] = useState("");
  const [pole2, setPole2] = useState("");
  const [question, setQuestion] = useState("");
  const [session, setSession] = useState("");

  const sessionId =
    // Happens when the dot is on the move
    useEffect(() => {
      let newSession /*: string */ = session || Date.now().toString();
      dispatch({ type: "sessionId", payload: newSession });
    }, [, session]);

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
            const localReadinLink = `readin?question=${base64.encode(
              question,
            )}&pole1=${base64.encode(pole1)}&pole2=${base64.encode(
              pole2,
            )}&sessionId=${state.sessionId}`;
            const localReadoutLink = `readout?question=${base64.encode(
              question,
            )}&pole1=${base64.encode(pole1)}&pole2=${base64.encode(
              pole2,
            )}&sessionId=${state.sessionId}`;
            const absoluteReadoutLink = `${document.location.href}${localReadoutLink}`;
            if (!window.open(absoluteReadoutLink, "_blank")) {
              if (
                navigator !== undefined &&
                navigator.permissions !== undefined
              ) {
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
              } else {
                alert(
                  `This link to the readout has NOT been saved to your clipboard. Copy it and paste it into a new browser tab:\n\n${absoluteReadoutLink}`,
                );
              }
            }
            route(localReadinLink);
          }}"
        >
          <fieldset>
            <div class="row">
              <${DyadFormInputQuestion} setQuestionState="${setQuestion}" />
            </div>
            <div class="row">
              <${DyadFormInputPole1} setPole1State="${setPole1}" />
            </div>
            <div class="row ${styles.lastRow}">
              <${DyadFormInputPole2} setPole2State="${setPole2}" />
            </div>
            <div class="row ${styles.lastRow}">
              <${DyadFormInputSession} setSessionState="${setSession}" />
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
