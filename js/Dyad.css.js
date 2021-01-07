// @flow
export default {
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2em",
    color: "orange",
  },
  subHeading: {
    fontSize: "2em",
    color: "orange",
  },
  buttons: {
    fontSize: "2em",
  },
  dyadContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    height: "100%",
  },
  dyad: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "20px",
    marginRight: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    height: "100%",
  },
  poleContainer: {
    width: "20%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  pole: {
    fontSize: "2em",
    color: "orange",
    userSelect: "none",
  },
  pole1: {
    borderRight: "1px solid orange",
    paddingRight: "5px",
  },
  pole2: {
    borderLeft: "1px solid orange",
    paddingLeft: "5px",
  },
  sliderContainer: {
    width: "80%",
    height: "100%",
  },
  slider: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  dot: {
    width: "40px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "orange",
    border: "1px solid red",
    position: "absolute",
  },
  button: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
};
