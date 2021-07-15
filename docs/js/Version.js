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
  "version".split("").reduce(
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
  version: {
    position: "absolute",
    top: "10px",
    left: "10px",
  },
  versionNumber: {
    fontSize: "2rem",
    color: "orange",
  },
});

/*::
type Props = {
  version: string
};
*/
const Version = (props /*: Props */) => {
  const [state /*: AppState */, dispatch] = useContext(AppContext);

  return html` <div cy-data="version" className="${styles.version}">
    <div className="${styles.versionNumber}">
      <a href="/">${props.version}</a>
    </div>
  </div>`;
};

export default Version;
