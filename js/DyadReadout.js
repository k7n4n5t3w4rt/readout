// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import screenfull from "../web_modules/screenfull.js";
import FullscreenToggle from "./FullscreenToggle.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";
import DyadCss from "./Dyad.css.js";

const html = htm.bind(h);
const seed /*: number */ = parseInt(
  "dyadreadout".split("").reduce(
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
  sessionId: string,
};
*/
const DyadReadout = (props /*: Props */) => {
  const [state /*: AppState */, dispatch /*: function */] = useContext(
    AppContext,
  );

  useEffect(() => {
    // Check that the DOM elements exist
    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;
    const button /*: HTMLElement  | null */ =
      document.getElementById("button") || null;

    if (slider !== null && button !== null) {
      button.addEventListener("click", (e /*: MouseEvent */) /*: void */ => {
        fetch(
          `https://easy--prod-welkmofgdq-uc.a.run.app/dyad-read?sessionId=${props.sessionId}`,
          {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin - dies with "cors"
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          },
        )
          .then((response /*: Object */) /*: Promise<string> */ => {
            //return "{}";
            return response.json();
          })
          .then((data /*: Object */) /*: void */ => {
            const others /*: Array<number> */ = data[props.sessionId] || [];

            if (others.length > 0) {
              const positions /*: Array<number> */ = others.map((
                x /*: number */,
              ) /*: number */ => {
                // This is where we turn the percentage into an x position
                const position /*: number */ = Math.round(
                  (x * (slider.offsetWidth - 40)) / 100,
                );
                console.log(x, position);
                return position;
              });
              dispatch({ type: "readout", payload: positions });
            }
          })
          .catch((e /*: Error */) /*: void */ => {
            console.error(e);
          });
      });
    }
  });

  return html`
    <div className="${styles.container}">
      <${FullscreenToggle} />
      <div className="${styles.dyadContainer}">
        <div id="dyad" className="${styles.dyad}">
          <div className="${styles.poleContainer}">
            <div
              id="poleLeft"
              data-cy="pole1"
              className="${styles.pole} ${styles.pole1}"
            >
              ${props.pole1}
            </div>
          </div>
          <div className="${styles.sliderContainer}">
            <div id="slider" className="${styles.slider}">
              ${typeof state.readout !== "undefined" &&
              htm`${state.readout.map((x /*: number */) => {
                return htm`<div id="dot" className="${styles.dot} ${styles.circle}"></div>`;
              })}`}
            </div>
          </div>
          <div className="${styles.poleContainer}">
            <div
              id="poleRight"
              data-cy="pole2"
              className="${styles.pole} ${styles.pole2}"
            >
              ${props.pole2}
            </div>
          </div>
        </div>
      </div>
      <button
        id="button"
        data-cy="read"
        class="btn-small blue waves-effect waves-light ${styles.button}"
        type="button"
      >
        Read
        <i class="material-icons right">login</i>
      </button>
    </div>
  `;
};

export default DyadReadout;
