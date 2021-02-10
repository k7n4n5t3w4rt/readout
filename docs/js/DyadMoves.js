// @flow
export default {
  moveDot: (dot /*: HTMLElement */, position /*: Object */) /*: void */ => {
    dot.style.left = position.x + "px";
  },
  startMove: (isMoving /*: Object */) /*: void */ => {
    isMoving.status = true;
  },
  stopMove: (
    slider /*: HTMLElement */,
    position /*: Object */,
    isMoving /*: Object */,
    dispatch /*: function */,
  ) /*: void */ => {
    if (isMoving.status == true) {
      const percentage = Math.round(
        (position.x / (slider.offsetWidth - 40)) * 100,
      );
      dispatch({ type: "coordinates", payload: { x: percentage } });
      //console.log("Percentage", percentage);
      isMoving.status = false;
    }
  },

  movingTouch: (
    slider /*: HTMLElement */,
    dot /*: HTMLElement */,
    e /*: TouchEvent */,
    position /*: Object */,
    isMoving /*: Object */,
    moveDot /*: function */,
  ) /*: void */ => {
    if (isMoving.status === true) {
      const touchItem = e.targetTouches.item(0) || null;

      if (touchItem !== null) {
        //console.log(touchItem.screenX);
        position.x =
          touchItem.screenX - slider.getBoundingClientRect().left - 20;

        if (position.x > slider.offsetWidth - 40) {
          position.x = slider.offsetWidth - 40;
        }

        if (position.x < 0) {
          position.x = 0;
        }
        // y = e.offsetY - 40;
        moveDot(dot, position);
      }
    }
  },

  movingMouse: (
    slider /*: HTMLElement */,
    dot /*: HTMLElement */,
    e /*: MouseEvent */,
    position /*: Object */,
    isMoving /*: Object */,
    moveDot /*: function */,
  ) /*: void */ => {
    if (isMoving.status === true) {
      //console.log(e.clientX);
      position.x = e.clientX - slider.getBoundingClientRect().left - 20;

      // //console.log(e.currentTarget);

      if (position.x > slider.offsetWidth - 40) {
        position.x = slider.offsetWidth - 40;
      }

      if (position.x < 0) {
        position.x = 0;
      }
      // y = e.offsetY - 40;
      moveDot(dot, position);
    }
  },
};
