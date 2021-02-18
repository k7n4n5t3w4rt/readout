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
  "dots".split("").reduce(
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
  x: number,
  y: number
};
*/
const Dot = (props /*: Props */) => {
  const [state /*: AppState */, dispatch /*: function */] = useContext(
    AppContext,
  );

  useEffect(() => {}, []);

  return html`
    <div
      className="${styles.dot} ${styles.circle}"
      style="left: ${props.x}px; margin-top: ${props.y}px"
    ></div>
  `;
};

export default Dot;
