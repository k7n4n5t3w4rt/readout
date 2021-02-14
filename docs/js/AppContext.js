// @flow
import { h, render, createContext } from "../web_modules/preact.js";
import { useReducer } from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import produce from "../web_modules/immer.js";
import stateStorage from "./state_storage.js";
import Router from "../web_modules/preact-router.js";

const html = htm.bind(h);

// A context for the state global management
const AppContext = createContext([{}, () => {}]);

// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
const reducer = (state, action) =>
  // https://www.pika.dev/npm/@vve/immer
  produce(state, (draft) => {
    if (action.type === "sessionId") {
      //console.log("reducer() - sessionId:", action.payload);
      draft.sessionId = action.payload;
    }
    if (action.type === "uniqueId") {
      //console.log("reducer() - uniqueId:", action.payload);
      draft.uniqueId = action.payload;
    }
    if (action.type === "coordinates") {
      //console.log("reducer() - coordinates:", action.payload);
      draft.coordinates = action.payload;
    }
    if (action.type === "fullscreenToggle") {
      //console.log("reducer() - fullscreenToggle:", action.payload);
      draft.fullscreenToggle = action.payload;
    }
    if (action.type === "reset") {
      //console.log("reducer() - reset:", action.payload);
      draft.coordinates = action.payload.coordinates;
      draft.fullscreenToggle = action.payload.fullscreenToggle;
    }
    if (action.type === "readout") {
      //console.log("reducer() - others:", action.payload);
      draft.readout = action.payload;
    }
  });

/*::
type Props = {
	children: Array<function>;
};
*/
const AppProvider /*: function */ = (props /*: Props */) => {
  const [state, dispatch] = useReducer(reducer, {});

  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    // If this is the first reload, load the state from the stateStorage.
    if (JSON.stringify(state) === JSON.stringify({})) {
      //
      // Load data from stateStorage
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage
      let sessionStateString /*: string | null | typeof undefined */ = stateStorage.getItem(
        "state",
        state.rememberme,
      );
      if (
        JSON.stringify(state) === JSON.stringify({}) &&
        (typeof sessionStateString === "undefined" ||
          sessionStateString === null)
      ) {
        // The state is, as yet, unset and there
        // was nothing in the session state, so
        // try the localStorage
        sessionStateString = stateStorage.getItem("state", true);
      }

      // To stop Flow complaining about potentially passing
      /// `null` or `typeof undefined` to JSON.parse()
      if (
        typeof sessionStateString !== "undefined" &&
        sessionStateString !== null
      ) {
        // The string coming from sessionStateStorage might
        // not be JSON.
        try {
          dispatch({ type: "reset", payload: JSON.parse(sessionStateString) });
        } catch (e) {
          stateStorage.clear(state.rememberme);
        }
      }
    }

    if (JSON.stringify(state) !== JSON.stringify({})) {
      // Store the state in stateStorage on every render-loop
      stateStorage.setItem("state", JSON.stringify(state), window.REMEMBER_ME);
    }
  }

  return html`
      <${AppContext.Provider} value=${[state, dispatch]}>
				${props.children}
      </${AppContext.Provider}>
  `;
};

export { AppContext, AppProvider };
