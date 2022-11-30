import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D7F0FB",
    },
    secondary: {
      main: "#003f58",
    },
    text: {
      primary: "#07385a",
      secondary: "#124c75",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  dividerColor: {
    backgroundColor: '#003f58',
  },
});
