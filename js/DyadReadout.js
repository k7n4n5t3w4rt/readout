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

  useEffect(() => {}, []);

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
