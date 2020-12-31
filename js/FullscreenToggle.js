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
    if (fullscreen !== null && fullscreenExit !== null) {
      fullscreen.addEventListener("touchstart", (
        e /*: TouchEvent */,
      ) /*: void */ => {
        console.log("touchstart");
        if (screenfull.isEnabled) {
          screenfull.request();
        }
      });
      fullscreenExit.addEventListener("touchstart", (
        e /*: TouchEvent */,
      ) /*: void */ => {
        console.log("touchstart");
        if (screenfull.isEnabled) {
          screenfull.exit();
        }
      });
      fullscreen.addEventListener("mousedown", (
        e /*: MouseEvent */,
      ) /*: void */ => {
        console.log("mousedown");
        if (screenfull.isEnabled) {
          screenfull.request();
        }
      });
      fullscreenExit.addEventListener("mousedown", (
        e /*: MouseEvent */,
      ) /*: void */ => {
        console.log("mousedown");
        if (screenfull.isEnabled) {
          screenfull.exit();
        }
      });
    }
  }, []);

  if (props.fullscreenToggle === false) {
    return html` <div className="${styles.fullscreen}">
      <i
        ontouchstart="${(e /*: TouchEvent */) /*: void */ => {
          console.log("touchstart");
          props.setFullscreenToggle(true);
        }}"
        onmousedown="${(e /*: MouseEvent */) /*: void */ => {
          console.log("mousedown");
          props.setFullscreenToggle(true);
        }}"
        id="fullscreen"
        className="material-icons ${styles.fullscreenIcon}"
        >fullscreen</i
      >
      <i
        id="fullscreenExit"
        className="material-icons ${styles.fullscreenIconHide}"
        >fullscreen_exit</i
      >
    </div>`;
  } else {
    return html` <div className="${styles.fullscreen}">
      <i id="fullscreen" className="material-icons ${styles.fullscreenIconHide}"
        >fullscreen</i
      >
      <i
        ontouchstart="${(e /*: TouchEvent */) /*: void */ => {
          console.log("touchstart");
          props.setFullscreenToggle(false);
        }}"
        onmousedown="${(e /*: MouseEvent */) /*: void */ => {
          console.log("mousedown");
          props.setFullscreenToggle(false);
        }}"
        id="fullscreenExit"
        className="material-icons ${styles.fullscreenIcon}"
        >fullscreen_exit</i
      >
    </div>`;
  }
};

export default FullscreenToggle;
