// @flow
import { useState } from "../web_modules/preact/hooks.js";
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
const html = htm.bind(h);

/*::
type Props = {
  setSessionState: function
};
*/
const DyadSession = (props /*: Props */) => {
  const onInputKey = (e /*: SyntheticInputEvent<EventTarget> */) => {
    props.setSessionState(e.target.value);
  };

  return html`
    <div class="input-field">
      <input
        type="text"
        data-cy="session"
        name="session"
        onInput="${onInputKey}"
        type="text"
        size="40"
        pattern="[A-Za-z0-9]+"
        title="Letters and numbers only."
      />
      <label class="no-pointer-event" for="pole1">Session ID</label>
      <div class="helper-text" data-cy="key-helper-text">
        The question we're asking.
      </div>
    </div>
  `;
};

export default DyadSession;
