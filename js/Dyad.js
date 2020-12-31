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
import DyadMoves from "./DyadMoves.js";

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
};
*/
const Dyad = (props /*: Props */) => {
  const [state /*: AppState */, dispatch] = useContext(AppContext);
  const [fullscreenToggle /*: boolean */, setFullscreenToggle] = useState(
    false,
  );

  useEffect(() => {
    // Check that the DOM elements exist
    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;
    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;
    const body /*: HTMLElement  | null */ = document.body || null;

    // Set some properties
    const position /*: Object */ = {
      x: 0,
    };
    const isMoving /*: Object */ = { status: false };

    if (dot !== null && slider !== null && body !== null) {
      // Add the event listeners for mousedown, mousemove, and mouseup
      dot.addEventListener("mousedown", (e /*: MouseEvent */) /*: void */ => {
        // console.log("mousedown");
        DyadMoves.startMove(isMoving);
        // console.log(isMoving.status);
      });

      slider.addEventListener("mousemove", (
        e /*: MouseEvent */,
      ) /*: void */ => {
        if (isMoving.status === true) {
          // console.log("mousemove");
        }
        DyadMoves.movingMouse(
          slider,
          dot,
          e,
          position,
          isMoving,
          DyadMoves.moveDot,
        );
      });

      body.addEventListener("mouseup", (e /*: MouseEvent */) /*: void */ => {
        // console.log("mouseup");
        DyadMoves.stopMove(slider, position, isMoving);
        // console.log(isMoving.status);
      });

      // Add the event listeners for touchstart, touchmove, and touchend
      dot.addEventListener("touchstart", (e /*: TouchEvent */) /*: void */ => {
        // console.log("touchstart");
        DyadMoves.startMove(isMoving);
        // console.log(isMoving.status);
      });

      slider.addEventListener("touchmove", (
        e /*: TouchEvent */,
      ) /*: void */ => {
        // console.log("touchmove");
        DyadMoves.movingTouch(
          slider,
          dot,
          e,
          position,
          isMoving,
          DyadMoves.moveDot,
        );
      });

      body.addEventListener("touchend", (e /*: TouchEvent */) /*: void */ => {
        // console.log("touchend");
        DyadMoves.stopMove(slider, position, isMoving);
      });
    }
  }, []);

  return html`
    <div className="${styles.container}">
      <${FullscreenToggle}
        fullscreenToggle="${fullscreenToggle}"
        setFullscreenToggle="${setFullscreenToggle}"
      />
      <div className="${styles.dyadContainer}">
        <div id="dyad" className="${styles.dyad}">
          <div className="${styles.poleContainer}">
            <div id="poleLeft" className="${styles.pole} ${styles.left}">
              Left
            </div>
          </div>
          <div className="${styles.sliderContainer}">
            <div id="slider" className="${styles.slider}">
              <div id="dot" className="${styles.dot} ${styles.circle}"></div>
            </div>
          </div>
          <div className="${styles.poleContainer}">
            <div id="poleRight" className="${styles.pole} ${styles.right}">
              Right
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default Dyad;
