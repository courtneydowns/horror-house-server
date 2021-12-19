import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#990000",
      contrastText: "#eeeeee",
    },
    secondary: {
      main: "#cc0000",
    },
    text: {
      primary: "#d6d6d6",
    },
  },
  props: {
    MuiAppBar: {
      color: "inherit",
    },
  },
});

export default theme;