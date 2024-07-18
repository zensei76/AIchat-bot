
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Footer from "../components/footer/Footer";
import { useThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Home = () => {
	const theme = useTheme();
	const { isDarkMode } = useThemeContext();

	// const gradient = isDarkMode
	// 	? `linear-gradient(to right, #08ACA1, #BFDEE0, #8BB8DF)`
	// 	: `linear-gradient(to right,  #55F7EC, #204D74,#1F3F41)`;
	const gradient = "linear-gradient(to right, #08ACA1, #BFDEE0, #8BB8DF)";

	console.log(isDarkMode);

	const gradientText = {
		background: gradient,
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		display: "inline-block",
	};

	const outline = {
		color: "transparent",
		WebkitTextStrokeWidth: "2px",
		WebkitTextStrokeColor: theme.palette.warning.main,
	};

	return (
		<section style={{ height: " calc(100vh - 64px)" }}>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					backgroundColor: theme.palette.background.default,
					color: theme.palette.text.primary,
					display: "flex",
					// flexDirection: "column",
				}}
			>
				<Grid
					container
					spacing={2}
					sx={{
						flex: 1,
						display: "flex",
						// flexDirection: { xs: "column", sm: "row" },
						// gap: 5,
						alignItems: "center",
						justifyContent: "center",
						padding: 2,
					}}
				>
					<Grid item sm={6}>
						<Box>
							<Typography variant='h4' component='h4' gutterBottom>
								Lost in a Maze of Information?
							</Typography>
							<Typography
								sx={{ textAlign: "right" }}
								variant='h2'
								component='h2'
								gutterBottom
							>
								Our
								<span style={gradientText}>AI Chatbot</span>
								Can Point You in the <span style={outline}>Right</span>{" "}
								Direction
								<span style={outline}> ! </span>
							</Typography>
							<Typography
								sx={{ textAlign: "left" }}
								variant='h5'
								component='p'
								gutterBottom
							>
								Escape the Maze Now! <> & </> Get Answers Now! Chat with Our AI
								Assistant.
							</Typography>

							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									mt: 3,
									ml: 10,
								}}
							>
								<Link to='/signup' style={{ textDecoration: "none" }}>
									<Button
										variant='contained'
										sx={{
											bgcolor: theme.palette.secondary.main,
											color: theme.palette.background.default,
											borderRadius: 0,
										}}
									>
										Get Started
									</Button>
								</Link>
							</Box>
						</Box>
					</Grid>

					<Grid item sm={5}>
						<Box
							sx={{
								display: { xs: "none", sm: "flex" },
								justifyContent: "center",
							}}
						>
							<img
								src={isDarkMode ? "heroDark.png" : "heroLight.png"}
								alt='Landing Page Hero'
								style={{
									width: "100%",
									marginTop: 20,
									marginBottom: 20,
									padding: 10,
								}}
							/>
						</Box>
					</Grid>
				</Grid>
				<Footer />
			</Box>
		</section>
	);
};

export default Home;
