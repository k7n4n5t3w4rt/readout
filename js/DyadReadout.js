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
import config from "./config.js";
import Version from "./Version.js";
import Dot from "./Dot.js";
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

    if (slider !== null) {
      fetchReadout(slider, props.sessionId, dispatch);

      const interval = setInterval(() => {
        fetchReadout(slider, props.sessionId, dispatch);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return html`
    <div className="${styles.container}">
      <${FullscreenToggle} />
      <${Version} version="${config.VERSION}" />
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
              ${state.readout &&
              html`${state.readout.map((item /*: Object */) => {
                return html`<${Dot} x="${item.position}" />`;
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
    </div>
  `;
};

function fetchReadout(
  slider /*: HTMLElement */,
  sessionId /*: string */,
  dispatch /*: function */,
) {
  fetch(
    `https://easy--prod-welkmofgdq-uc.a.run.app/dyad-read?sessionId=${sessionId}`,
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
      const others /*: Array<number> */ = data[sessionId] || [];

      if (others.length > 0) {
        const positions /*: Array<number> */ = others.map((
          x /*: number */,
        ) /*: number */ => {
          // This is where we turn the percentage into an x position
          const position /*: number */ = Math.round(
            (x * (slider.offsetWidth - 40)) / 100,
          );
          //console.log(x, position);
          return position;
        });
        dispatch({ type: "readout", payload: positions });
      }
    })
    .catch((e /*: Error */) /*: void */ => {
      console.error(e);
    });
}

export default DyadReadout;
