import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import {
	Box,
	Typography,
	Button,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import Footer from "../components/footer/Footer";
import TypingAnim from "../components/typer/TypingAnim";

const Login = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const theme = useTheme();
	const { isDarkMode } = useThemeContext();
	const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		try {
			toast.loading("Signing In", { id: "login" });
			await auth?.login(email, password);
			toast.success("Signed In Successfully", { id: "login" });
		} catch (error) {
			console.log(error);
			toast.error("Signing In Failed", { id: "login" });
		}
	};
	useEffect(() => {
		if (auth?.user) {
			return navigate("/chat");
		}
	}, [auth]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 64px)",
        
				bgcolor: theme.palette.background.default,
			}}
		>
      <TypingAnim />
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: isBelowMd ? "column" : "row",
          // bgcolor: theme.palette.background.default,
				}}
			>
				<Box
					sx={{
						flexBasis: isBelowMd ? "100%" : { xs: "50%", md: "60%" },
						// bgcolor: "lightblue",
						p: 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							display: { xs: "none", sm: "flex" },
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
							width: "100%",
						}}
					>
						{isDarkMode ? (
							<Box
								component='img'
								src='loginHeroDark.png'
								alt='girl working'
								sx={{
									maxHeight: "100%",
									objectFit: "contain",
									maxWidth: {
										xs: "40%",
										md: "80%",
									},
								}}
							/>
						) : (
							<Box
								component='img'
								src='loginHeroLight.png'
								alt='girl working'
								sx={{
									maxHeight: "100%",
									objectFit: "contain",
									maxWidth: {
										xs: "40%",
										md: "80%",
									},
								}}
							/>
						)}
					</Box>
				</Box>
				<Box
					sx={{
						flexBasis: isBelowMd ? "100%" : { xs: "50%", md: "40%" },
						// bgcolor: "lightpink",
						p: 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<form
						onSubmit={handleSubmit}
						style={{
							width: "100%",
							maxWidth: "400px",
							padding: "30px",
							boxShadow: "10px 10px 20px #000",
							borderRadius: "10px",
							border: "none",
							background: theme.palette.primary.light,
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Typography
								variant='h4'
								textAlign='center'
								padding={2}
								fontWeight={600}
							>
								Login
							</Typography>
							<CustomizedInput type='email' name='email' label='Email' />
							<CustomizedInput
								type='password'
								name='password'
								label='Password'
							/>
							<Button
								type='submit'
								sx={{
									px: 2,
									py: 1,
									mt: 2,
									width: "100%",
									borderRadius: 2,
									bgcolor: "#00fffc",
									":hover": {
										bgcolor: "white",
										color: "black",
									},
								}}
								endIcon={<IoIosLogIn />}
							>
								Login
							</Button>
						</Box>
					</form>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
};

export default Login;
