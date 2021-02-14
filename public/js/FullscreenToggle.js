// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import screenfull from "../web_modules/screenfull.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";

const html = htm.bind(h);
const seed /*: number */ = parseInt(
  "fullscreenToggle".split("").reduce(
    (acc /*: string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);

rawStyles({});

const [styles] = createStyles({
  fullscreen: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  fullscreenIcon: {
    fontSize: "5rem",
    color: "orange",
    cursor: "pointer",
  },
  fullscreenIconHide: {
    display: "none",
  },
});

/*::
type Props = {
};
*/
const FullscreenToggle = (props /*: Props */) => {
  const [state /*: AppState */, dispatch] = useContext(AppContext);

  useEffect(() => {
    // Check that the DOM elements exist
    const fullscreen /*: HTMLElement  | null */ =
      document.getElementById("fullscreen") || null;
    const fullscreenExit /*: HTMLElement  | null */ =
      document.getElementById("fullscreenExit") || null;

    if (typeof state.fullscreenToggle === "undefined") {
      dispatch({ type: "fullscreenToggle", payload: false });
    }

    // Fullscreen toggling
    if (fullscreen !== null && state.fullscreenToggle === false) {
      fullscreen.addEventListener(
        "click",
        (e /*: MouseEvent */) /*: void */ => {
          window.navigator.vibrate(200);
          if (screenfull.isEnabled) {
            screenfull.request();
            dispatch({ type: "fullscreenToggle", payload: true });
            e.preventDefault();
          }
        },
        { once: true },
      );
    } else if (fullscreenExit !== null && state.fullscreenToggle === true) {
      fullscreenExit.addEventListener(
        "click",
        (e /*: MouseEvent */) /*: void */ => {
          window.navigator.vibrate(200);
          if (screenfull.isEnabled && state.fullscreenToggle === true) {
            //console.log("touchstart");
            screenfull.exit();
            dispatch({ type: "fullscreenToggle", payload: false });
            e.preventDefault();
          }
        },
        { once: true },
      );
    }
  }, [state.fullscreenToggle]);

  if (state.fullscreenToggle === false) {
    return html` <div cy-data="fullscreen" className="${styles.fullscreen}">
      <i id="fullscreen" className="material-icons ${styles.fullscreenIcon}"
        >fullscreen</i
      >
    </div>`;
  } else {
    return html` <div className="${styles.fullscreen}">
      <i
        id="fullscreenExit"
        cy-data="fullscreen"
        className="material-icons ${styles.fullscreenIcon}"
        >fullscreen_exit</i
      >
    </div>`;
  }
};

export default FullscreenToggle;
