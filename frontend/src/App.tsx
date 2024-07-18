import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
	const auth = useAuth();

	return (
		<main>
			<ThemeProvider>

					{/* <CssBaseline /> */}
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						{auth?.isLoggedIn && auth.user && (
							<Route path='/chat' element={<Chat />} />
						)}
						<Route path='*' element={<NotFound />} />
					</Routes>

			</ThemeProvider>
		</main>
	);
}

export default App;
