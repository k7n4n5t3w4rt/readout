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
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import Config from "./config.js";
import { AppContext } from "./AppContext.js";
import DyadCss from "./Dyad.css.js";
import DyadMoves from "./DyadMoves.js";
import base64 from "./base64.js";
/*::
import type DyadMovesType from "./DyadMoves.js";
*/

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
  question?: string,
  pole1?: string,
  pole2?: string,
  sessionId: string,
  readoutLink: string,
};
*/
const DyadReadin = (props /*: Props */) => {
  const [state /*: AppState */, dispatch /*: function */] = useContext(
    AppContext,
  );
  const [feedback /*: boolean */, setFeedback /*: function */] = useState(
    false,
  );

  dispatch({ type: "sessionId", payload: props.sessionId });

  useEffect(() => {
    // Check that the DOM elements exist
    const feedbackDiv /*: HTMLElement  | null */ =
      document.getElementById("feedback") || null;

    if (feedbackDiv !== null) {
      if (feedback === true) {
        feedbackDiv.style.display = "block";
        const timeOutId = setTimeout(() => {
          setFeedback(false);
          feedbackDiv.style.display = "none";
        }, 1000);
      } else {
        feedbackDiv.style.display = "none";
      }
    }
  }, [, feedback]);
  // Happens once, on load
  useEffect(() => {
    // Check that the DOM elements exist
    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;
    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;
    const body /*: HTMLElement  | null */ = document.body || null;
    if (dot !== null && slider !== null && body !== null) {
      if (state.sessionId !== undefined && state.uniqueId !== undefined) {
        console.log("Adding EventListeners (happens on load)");
        // Set some properties - x:0 is just a placeholder
        const position /*: Object */ = {
          x: 0,
        };
        const isMoving /*: Object */ = { status: false };

        // Add the event listeners for mousedown, mousemove, and mouseup
        dot.addEventListener(
          "mousedown",
          (e /*: MouseEvent */) /*: void */ => {
            //console.log("mousedown");
            DyadMoves.startMove(isMoving);
            //console.log(isMoving.status);
          },
          { once: false },
        );

        slider.addEventListener(
          "mousemove",
          (e /*: MouseEvent */) /*: void */ => {
            if (isMoving.status === true) {
              //console.log("mousemove");
            }
            DyadMoves.movingMouse(
              slider,
              dot,
              e,
              position,
              isMoving,
              DyadMoves.moveDot,
            );
          },
          { once: false },
        );
        body.addEventListener(
          "mouseup",
          (e /*: MouseEvent */) /*: void */ => {
            console.log("mouseup");
            DyadMoves.stopMove(slider, position, isMoving, dispatch);
            DyadMoves.savePosition(
              slider,
              state.sessionId,
              state.uniqueId,
              position,
              dispatch,
            );
            setFeedback(true);

            //console.log(isMoving.status);
          },
          { once: false },
        );

        // Add the event listeners for touchstart, touchmove, and touchend
        dot.addEventListener(
          "touchstart",
          (e /*: TouchEvent */) /*: void */ => {
            //console.log("touchstart");
            DyadMoves.startMove(isMoving);
            //console.log(isMoving.status);
          },
          { once: false },
        );

        slider.addEventListener(
          "touchmove",
          (e /*: TouchEvent */) /*: void */ => {
            //console.log("touchmove");
            DyadMoves.movingTouch(
              slider,
              dot,
              e,
              position,
              isMoving,
              DyadMoves.moveDot,
            );
          },
          { once: false },
        );

        body.addEventListener(
          "touchend",
          (e /*: TouchEvent */) /*: void */ => {
            //console.log("touchend");
            DyadMoves.stopMove(slider, position, isMoving, dispatch);
            DyadMoves.savePosition(
              slider,
              state.sessionId,
              state.uniqueId,
              position,
              dispatch,
            );
            setFeedback(true);
          },
          { once: false },
        );
      } else if (state.sessionId !== undefined) {
        dispatch({
          type: "uniqueId",
          payload: ((max /*: number */) /*: string */ => {
            const uniqueId = Math.floor(Math.random() * Math.floor(max));
            return uniqueId.toString();
          })(Date.now()),
        });
      }
    }
  }, [state.sessionId, state.uniqueId]);

  // Happens when the dot is on the move
  useEffect(() => {
    console.log("The dot is on the move");
    // Check that the DOM elements exist
    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;
    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;

    if (state.coordinates !== undefined) {
      if (dot !== null && slider !== null) {
        // Set some properties
        const position /*: Object */ = {
          x: Math.round(
            (state.coordinates.x * (slider.offsetWidth - 40)) / 100,
          ),
        };
        // Put the slider into position
        //console.log("useEffect: State change...", state);
        DyadMoves.moveDot(dot, position);
      }
    }
  }, [state.coordinates]);

  return html`
    <div className="${styles.container}">
      <${Version} version="${Config.VERSION}" />
      <${FullscreenToggle} />
      <div id="feedback" data-cy="feedback" className="${styles.feedback}">
        <div className="${styles.feedbackInner}">
          Thanks!
        </div>
      </div>
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
              <div id="dot" className="${styles.dot} ${styles.circle}"></div>
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
      <div data-cy="readout" className="${styles.clear}">
        <a href="${base64.decode(props.readoutLink || "")}"> . </a>
      </div>
    </div>
  `;
};

export default DyadReadin;
