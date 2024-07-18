import { createTheme } from "@mui/material/styles";

// Define the light theme
const lightTheme = createTheme({
	palette: {
		mode: "light",
		text: {
			primary: "#040406",
		},
		background: {
			default: "#F5F8FA",
		},
		primary: {
			main: "#DCF0EE",
			light: "#BFDEE0",
			dark: "#8BB8DF",
		},
		secondary: {
			main: "#08ACA1",
		},
		warning: {
			main: "#F49B1D",
		},
	},
});

// Define the dark theme
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		text: {
			primary: "#F9F9FB",
		},
		background: {
			default: "#05080A",
		},
		primary: {
			main: "#0F2422",
			light: "#204D74",
			dark: "#1F3F41",
		},
		secondary: {
			main: "#55F7EC",
		},
		warning: {
			main: "#E0870B",
		},
	},
});

export { lightTheme, darkTheme };
