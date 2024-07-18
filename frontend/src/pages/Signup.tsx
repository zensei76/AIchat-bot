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


const Signup = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const theme = useTheme();
	const { isDarkMode } = useThemeContext();
	const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		try {
			toast.loading("Signing Up", { id: "signup" });
			await auth?.signup(name, email, password);
			toast.success("Signed Up Successfully", { id: "signup" });
		} catch (error) {
			console.log(error);
			toast.error("Signing Up Failed", { id: "signup" });
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
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: isBelowMd ? "column" : "row",
				}}
			>
				<Box
					sx={{
						flexBasis: isBelowMd ? "100%" : { xs: "50%", md: "60%" },
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
								src='signUpDark.png'
								alt='AI Robot'
								sx={{
									maxHeight: "100%",
									objectFit: "contain",
									maxWidth: {
										xs: "50%",
										md: "100%",
									},
								}}
							/>
						) : (
							<Box
								component='img'
								src='signUpLight.png'
								alt='chating image'
								sx={{
									maxHeight: "100%",
									objectFit: "contain",
									maxWidth: {
										xs: "50%",
										md: "100%",
									},
								}}
							/>
						)}
					</Box>
				</Box>
				<Box
					sx={{
						flexBasis: isBelowMd ? "100%" : { xs: "50%", md: "40%" },
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
								Signup
							</Typography>
							<CustomizedInput type='text' name='name' label='Name' />
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
								Signup
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

export default Signup;
