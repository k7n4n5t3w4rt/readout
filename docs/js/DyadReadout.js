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
import Version from "./Version.js";
import Dot from "./Dot.js";
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
  question?: string,
  pole1?: string,
  pole2?: string,
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
      <${Version} version="${Config.VERSION}" />
      <div className="${styles.dyadContainer}">
        <div className="${styles.questionContainer}">
          <p className="${styles.question}" data-cy="question">
            ${base64.decode(props.question || "")}
          </p>
        </div>
        <div id="dyad" className="${styles.dyad}">
          <div className="${styles.poleContainer}">
            <div
              id="poleLeft"
              data-cy="pole1"
              className="${styles.pole} ${styles.pole1}"
            >
              ${base64.decode(props.pole1 || "")}
            </div>
          </div>
          <div className="${styles.sliderContainer}">
            <div id="slider" className="${styles.slider}">
              ${state.readout &&
              html`${state.readout.map((
                x /*: number */,
                iterator /*: number */,
              ) => {
                const y = (iterator * 6).toString();
                return html`<${Dot} x="${x}" y=${y} />`;
              })}`}
            </div>
          </div>
          <div className="${styles.poleContainer}">
            <div
              id="poleRight"
              data-cy="pole2"
              className="${styles.pole} ${styles.pole2}"
            >
              ${base64.decode(props.pole2 || "")}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick=${clearReadout(props.sessionId, dispatch)}
        data-cy="clear"
        className="${styles.clear}"
      >
        CLEAR
      </div>
    </div>
  `;
};

const fetchReadout = (
  slider /*: HTMLElement */,
  sessionId /*: string */,
  dispatch /*: function */,
) /*: string | void */ => {
  //`https://easy--prod-welkmofgdq-uc.a.run.app/dyad-read?sessionId=${sessionId}`,
  fetch(`${Config.EASY}/dyad-read?sessionId=${sessionId}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin - dies with "cors"
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response /*: Object */) /*: Promise<string> */ => {
      //return "{}";
      return response.json();
    })
    .then((data /*: Object */) /*: void */ => {
      const others /*: Object */ = data[sessionId] || {};

      const positions /*: Array<number> */ = [];
      //if (Object.keys(others).length > 0) {
      for (const [uniqueId, coordinates] /*: [any, any] */ of Object.entries(
        others,
      )) {
        // This is where we turn the percentage into an x position
        positions.push(
          Math.round((coordinates.x * (slider.offsetWidth - 40)) / 100),
        );
      }
      dispatch({ type: "readout", payload: positions });
      //}
    })
    .catch((e /*: Error */) /*: void */ => {
      console.error(e);
    });
};

const clearReadout = (
  sessionId /*: string */,
  dispatch /*: function */,
) /*: () => string | void */ => () /*: string | void */ => {
  //`https://easy--prod-welkmofgdq-uc.a.run.app/dyad-read?sessionId=${sessionId}`,
  fetch(`${Config.EASY}/dyad-clear?sessionId=${sessionId}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin - dies with "cors"
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response /*: Object */) /*: Promise<string> */ => {
      if (response.status !== undefined && response.status === "success") {
        dispatch({ type: "readout", payload: [] });
      }
      return response.json();
    })
    .catch((e /*: Error */) /*: void */ => {
      console.error(e);
    });
};
export default DyadReadout;
