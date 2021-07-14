// @flow
import { useState } from "../web_modules/preact/hooks.js";
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
const html = htm.bind(h);

/*::
type Props = {
  setPole2State: function
};
*/
const DyadFormInputPole2 = (props /*: Props */) => {
  const onInputKey = (e /*: SyntheticInputEvent<EventTarget> */) => {
    props.setPole2State(e.target.value);
  };

  return html`
    <div class="input-field">
      <input
        type="text"
        data-cy="pole2"
        name="pole2"
        onInput="${onInputKey}"
        type="text"
        size="40"
        pattern=".+"
        title="Pretty much anything will work...  but not that."
        required
      />
      <label class="no-pointer-event" for="pole2"
        >Pole Two<abbr title="required" aria-label="required">*</abbr></label
      >
      <div class="helper-text" data-cy="key-helper-text">
        This is the label for the right side of the slider.
      </div>
    </div>
  `;
};

export default DyadFormInputPole2;
