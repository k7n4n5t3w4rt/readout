// @flow
import { useState } from "../web_modules/preact/hooks.js";
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
const html = htm.bind(h);

/*::
type Props = {
  setPole1State: function
};
*/
const DyadFormInputPole1 = (props /*: Props */) => {
  const onInputKey = (e /*: SyntheticInputEvent<EventTarget> */) => {
    props.setPole1State(e.target.value);
  };

  return html`
    <div class="input-field">
      <input
        type="text"
        data-cy="pole1"
        name="pole1"
        onInput="${onInputKey}"
        type="text"
        size="40"
        pattern="[A-Za-z0-9 ]+"
        title="Letters, numbers and spaces only."
        required
      />
      <label class="no-pointer-event" for="pole1"
        >Pole One<abbr title="required" aria-label="required">*</abbr></label
      >
      <div class="helper-text" data-cy="key-helper-text">
        This is the label for the left side of the slider.
      </div>
    </div>
  `;
};

export default DyadFormInputPole1;
