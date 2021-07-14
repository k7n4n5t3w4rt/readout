// @flow
import { useState } from "../web_modules/preact/hooks.js";
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
const html = htm.bind(h);

/*::
type Props = {
  setQuestionState: function
};
*/
const DyadFormInputPole1 = (props /*: Props */) => {
  const onInputKey = (e /*: SyntheticInputEvent<EventTarget> */) => {
    props.setQuestionState(e.target.value);
  };

  return html`
    <div class="input-field">
      <input
        type="text"
        data-cy="question"
        name="question"
        onInput="${onInputKey}"
        type="text"
        size="40"
        pattern=".+"
        title="Letters, numbers and spaces only."
        required
      />
      <label class="no-pointer-event" for="pole1"
        >Question<abbr title="required" aria-label="required">*</abbr></label
      >
      <div class="helper-text" data-cy="key-helper-text">
        The question we're asking.
      </div>
    </div>
  `;
};

export default DyadFormInputPole1;
