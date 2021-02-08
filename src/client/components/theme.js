import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  props: {
    // Name of the component ⚛️
    Card: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});
