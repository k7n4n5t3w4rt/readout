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
  pole1: string,
  pole2: string,
};
*/
const Dyad = (props /*: Props */) => {
  const [state /*: AppState */, dispatch /*: function */] = useContext(
    AppContext,
  );

  useEffect(() => {
    // Check that the DOM elements exist
    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;
    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;
    const body /*: HTMLElement  | null */ = document.body || null;

    if (dot !== null && slider !== null && body !== null) {
      // Set some properties - x:0 is just a placeholder
      const position /*: Object */ = {
        x: 0,
      };
      const isMoving /*: Object */ = { status: false };

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
        DyadMoves.stopMove(slider, position, isMoving, dispatch);
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
        DyadMoves.stopMove(slider, position, isMoving, dispatch);
      });
    }
  }, []);

  useEffect(() => {
    // Check that the DOM elements exist
    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;
    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;

    if (typeof state.coordinates === "undefined") {
      // dispatch({ type: "coordinates", payload: { x: 0 } });
    } else if (dot !== null && slider !== null) {
      // Set some properties
      const position /*: Object */ = {
        x: Math.round(state.coordinates.x * (slider.offsetWidth - 40)) / 100,
      };
      const isMoving /*: Object */ = { status: false };
      // Put the slider into position
      console.log("useEffect: State change...", state);
      DyadMoves.moveDot(dot, position);
    }
  }, [state.coordinates]);

  return html`
    <div className="${styles.container}">
      <${FullscreenToggle} />
      <div className="${styles.dyadContainer}">
        <div id="dyad" className="${styles.dyad}">
          <div className="${styles.poleContainer}">
            <div
              id="poleLeft"
              data-cy="pole1"
              className="${styles.pole} ${styles.left}"
            >
              ${props.pole1}
            </div>
          </div>
          <div className="${styles.sliderContainer}">
            <div id="slider" className="${styles.slider}">
              <div id="dot" className="${styles.dot} ${styles.circle}"></div>
            </div>
          </div>
          <div className="${styles.poleContainer}">
            <div
              id="poleRight"
              data-cy="pole2"
              className="${styles.pole} ${styles.right}"
            >
              ${props.pole2}
            </div>
          </div>
        </div>
      </div>
      <button
        data-cy="go"
        class="btn-small blue waves-effect waves-light ${styles.button}"
        type="button"
      >
        Go
        <i class="material-icons right">login</i>
      </button>
    </div>
  `;
};

export default Dyad;
