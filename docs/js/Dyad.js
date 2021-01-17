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
import config from "./config.js";
import Version from "./Version.js";
import FullscreenToggle from "./FullscreenToggle.js";
import DyadFormInputPole1 from "./DyadFormInputPole1.js";
import DyadFormInputPole2 from "./DyadFormInputPole2.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";
import DyadCss from "./Dyad.css.js";

const html = htm.bind(h);
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

/*::
type Props = {
  pole1: string,
  pole2: string,
  sessionId: string
};
*/
const Dyad = (props /*: Props */) => {
  // const [state /*: AppState */, dispatch /*: function */] = useContext(
  //   AppContext,
  // );
  const [pole1, setPole1] = useState("");
  const [pole2, setPole2] = useState("");

  return html`
    <div className="${styles.container}">
      <${Version} version="${config.VERSION}" />
      <${FullscreenToggle} />

      <div className="${styles.formContainer}">
        <form
          action="/readin"
          method="GET"
          onsubmit="${(e /*: Event */) => {
            e.preventDefault();
            route(
              `/readin?pole1=${pole1}&pole2=${pole2}&sessionId=${Date.now().toString()}`,
            );
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
