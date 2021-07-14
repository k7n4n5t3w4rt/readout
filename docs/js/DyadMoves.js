// @flow
import Config from "./config.js";
export default {
  savePosition: (
    slider /*: HTMLElement */,
    sessionId /*: string */,
    uniqueId /*: string */,
    position /*: Object */,
    dispatch /*: function */,
  ) /*: void */ => {
    try {
      window.navigator.vibrate(200);
    } catch (error) {}
    const percentage = Math.round(
      (position.x / (slider.offsetWidth - 40)) * 100,
    );
    console.log("Position saving...", percentage);
    // `https://easy--prod-welkmofgdq-uc.a.run.app/dyad-save?sessionId=${sessionId}&uniqueId=${uniqueId}&position=${percentage}`,
    fetch(
      `${Config.EASY}/dyad-save?sessionId=${sessionId}&uniqueId=${uniqueId}&position=${percentage}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin - dies with "cors"
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      },
    )
      .then((response /*: Object */) /*: Promise<string> */ => {
        //return "{}";
        console.log("Position saved", percentage);
        return response.json();
      })
      .catch((e /*: Error */) /*: void */ => {
        alert(e.message);
        console.error(e);
      });
  },

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
