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
    color: "gold",
  },
  fullscreenIconHide: {
    display: "none",
  },
});

/*::
type Props = {
  fullscreenToggle: boolean,
  setFullscreenToggle: function
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

    // Fullscreen toggling
    if (fullscreen !== null && props.fullscreenToggle === false) {
      fullscreen.addEventListener(
        "touchstart",
        (e /*: TouchEvent */) /*: void */ => {
          if (screenfull.isEnabled) {
            console.log("touchstart");
            screenfull.request();
            props.setFullscreenToggle(true);
            e.preventDefault();
          }
        },
        { once: true },
      );
      fullscreen.addEventListener(
        "mousedown",
        (e /*: MouseEvent */) /*: void */ => {
          if (screenfull.isEnabled && props.fullscreenToggle === false) {
            console.log("mousedown");
            screenfull.request();
            props.setFullscreenToggle(true);
          }
        },
        { once: true },
      );
    } else if (fullscreenExit !== null && props.fullscreenToggle === true) {
      fullscreenExit.addEventListener(
        "touchstart",
        (e /*: TouchEvent */) /*: void */ => {
          if (screenfull.isEnabled && props.fullscreenToggle === true) {
            console.log("touchstart");
            screenfull.exit();
            props.setFullscreenToggle(false);
            e.preventDefault();
          }
        },
        { once: true },
      );
      fullscreenExit.addEventListener(
        "mousedown",
        (e /*: MouseEvent */) /*: void */ => {
          if (screenfull.isEnabled && props.fullscreenToggle === true) {
            console.log("mousedown");
            screenfull.exit();
            props.setFullscreenToggle(false);
          }
        },
        { once: true },
      );
    }
  }, [props.fullscreenToggle]);

  if (props.fullscreenToggle === false) {
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
