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
    color: "gold",
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
  left: {
    backgroundColor: "white",
  },
  right: {
    backgroundColor: "white",
  },
  dot: {
    width: "0px",
    height: "0px",
    borderRadius: "20px",
    border: "20px solid orange",
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
    let y /*: number */ = 0;
    let isMoving /*: boolean */ = false;

    const dot /*: HTMLElement  | null */ =
      document.getElementById("dot") || null;

    const slider /*: HTMLElement  | null */ =
      document.getElementById("slider") || null;

    const body /*: HTMLElement  | null */ = document.body || null;
    // const circleLeft /*: HTMLElement  | null */ =
    //   document.getElementById("circleLeft") || null;

    // const circleRight /*: HTMLElement  | null */ =
    //   document.getElementById("circleRight") || null;

    function moveDot(dot /*: HTMLElement */, x /*: number */) /*: void */ {
      // console.log(x, y);
      dot.style.left = x + "px";
    }
    if (dot !== null && slider !== null && body !== null) {
      // Add the event listeners for mousedown, mousemove, and mouseup
      dot.addEventListener("mousedown", (e /*: MouseEvent */) /*: void */ => {
        x = e.offsetX;
        y = e.offsetY;
        isMoving = true;
      });
      body.addEventListener("mouseup", (e /*: MouseEvent */) /*: void */ => {
        const percentage = Math.round((x / (slider.offsetWidth - 40)) * 100);
        console.log("Percentage", percentage);
        isMoving = false;
      });
      dot.addEventListener("mousemove", (e /*: MouseEvent */) /*: void */ => {
        // e.stopPropagation();
      });

      slider.addEventListener("mousemove", (
        e /*: MouseEvent */,
      ) /*: void */ => {
        if (isMoving === true) {
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
      });

      window.addEventListener("mouseup", (e /*: MouseEvent */) /*: void */ => {
        if (isMoving === true) {
          isMoving = false;
        }
      });
    } else {
      // console.log("dot not set...");
    }
  });

  return html`
    <div className="${styles.container}">
      <!-- <h1 data-cy="heading" className="${styles.heading}">
        Readout
      </h1>
      <h2 data-cy="subheading" className="${styles.subHeading}">
        A quick readout from the room.
      </h2> -->
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
