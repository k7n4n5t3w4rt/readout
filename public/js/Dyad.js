// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";

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

const [styles] = createStyles({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2em",
    color: "gold",
  },
  subHeading: {
    fontSize: "2em",
    color: "gold",
  },
  buttons: {
    fontSize: "2em",
  },
  dyadContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    height: "100%",
  },
  dyad: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "20px",
    marginRight: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    height: "100%",
  },
  poleContainer: {
    width: "20%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  pole: {
    fontSize: "2em",
    color: "orange",
    userSelect: "none",
  },
  sliderContainer: {
    width: "80%",
    height: "100%",
  },
  slider: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  dot: {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "orange",
    border: "1px solid red",
    position: "absolute",
  },
});

/*::
type Props = {
};
*/
const Dyad = (props /*: Props */) => {
  const [state /*: AppState */, dispatch] = useContext(AppContext);
  //const [count /*: number */, setCount] = useState(props.count);

  useEffect(() => {
    // if (typeof state.count !== "undefined") {
    //   setCount(state.count);
    // }

    let x /*: number */ = 0;
    let isMoving /*: boolean */ = false;

    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;

    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;

    const body /*: HTMLElement  | null */ = document.body || null;

    function moveDot(dot /*: HTMLElement */, x /*: number */) /*: void */ {
      dot.style.left = x + "px";
    }
    function startMove() /*: void */ {
      isMoving = true;
    }
    function stopMove(slider /*: HTMLElement */) /*: void */ {
      const percentage = Math.round((x / (slider.offsetWidth - 40)) * 100);
      console.log("Percentage", percentage);
      isMoving = false;
    }

    function movingTouch(
      slider /*: HTMLElement */,
      dot /*: HTMLElement */,
      e /*: TouchEvent */,
    ) /*: void */ {
      if (isMoving === true) {
        const touchItem = e.targetTouches.item(0) || null;

        if (touchItem !== null) {
          console.log(touchItem.screenX);
          x = touchItem.screenX - slider.getBoundingClientRect().left - 20;

          if (x > slider.offsetWidth - 40) {
            x = slider.offsetWidth - 40;
          }

          if (x < 0) {
            x = 0;
          }
          // y = e.offsetY - 40;
          moveDot(dot, x);
        }
      }
    }

    function movingMouse(
      slider /*: HTMLElement */,
      dot /*: HTMLElement */,
      e /*: MouseEvent */,
    ) /*: void */ {
      if (isMoving === true) {
        console.log(e.clientX);
        x = e.clientX - slider.getBoundingClientRect().left - 20;

        // console.log(e.currentTarget);

        if (x > slider.offsetWidth - 40) {
          x = slider.offsetWidth - 40;
        }

        if (x < 0) {
          x = 0;
        }
        // y = e.offsetY - 40;
        moveDot(dot, x);
      }
    }

    if (dot !== null && slider !== null && body !== null) {
      // Add the event listeners for mousedown, mousemove, and mouseup
      dot.addEventListener("mousedown", (e /*: MouseEvent */) /*: void */ => {
        startMove();
      });

      slider.addEventListener("mousemove", (
        e /*: MouseEvent */,
      ) /*: void */ => {
        movingMouse(slider, dot, e);
      });

      body.addEventListener("mouseup", (e /*: MouseEvent */) /*: void */ => {
        stopMove(slider);
      });

      // Add the event listeners for touchstart, touchmove, and touchend
      dot.addEventListener("touchstart", (e /*: TouchEvent */) /*: void */ => {
        console.log("touchstart");
        startMove();
      });

      slider.addEventListener("touchmove", (
        e /*: TouchEvent */,
      ) /*: void */ => {
        console.log("touchmove");
        movingTouch(slider, dot, e);
      });

      body.addEventListener("touchend", (e /*: TouchEvent */) /*: void */ => {
        stopMove(slider);
      });
    }
  });

  return html`
    <div className="${styles.container}">
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
