import { Box, Avatar, Typography, useTheme } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
	if (message.includes("```")) {
		const blocks = message.split("```");
		return blocks;
	}
}

function isCodeBlock(str: string) {
	if (
		str.includes("=") ||
		str.includes(";") ||
		str.includes("[") ||
		str.includes("]") ||
		str.includes("{") ||
		str.includes("}") ||
		str.includes("#") ||
		str.includes("//")
	) {
		return true;
	}
	return false;
}
const ChatItem = ({
	content,
	role,
}: {
	content: string;
	role: "user" | "assistant";
}) => {
	const messageBlocks = extractCodeFromString(content);
	// const auth = useAuth();
  const theme = useTheme()
	return role == "assistant" ? (
		<Box
			sx={{
				display: "flex",
				p: 2,
				bgcolor: theme.palette.primary.light,
				gap: 2,
				borderRadius: 2,
				my: 1,
         alignItems: "center"
			}}
		>
			<Avatar sx={{ ml: "0" ,bgcolor:"white" }}>
				<img src='bot.png' alt='openai' width={"30px"} />
			</Avatar>
			<Box>
				{!messageBlocks && (
					<Typography sx={{ fontSize: "20px", color: theme.palette.text.primary }}>{content}</Typography>
				)}
				{messageBlocks &&
					messageBlocks.length &&
					messageBlocks.map((block) =>
						isCodeBlock(block) ? (
							<SyntaxHighlighter style={coldarkDark} language='javascript'>
								{block}
							</SyntaxHighlighter>
						) : (
							<Typography sx={{ fontSize: "20px" }}>{block}</Typography>
						)
					)}
			</Box>
		</Box>
	) : (
		<Box
			sx={{
				display: "flex",
				p: 2,
				bgcolor: theme.palette.primary.main,
				gap: 2,
				borderRadius: 2,
        justifyContent: "right",
         alignItems: "center"
			}}
		>
	
			<Box >
				{!messageBlocks && (
					<Typography sx={{ fontSize: "20px",color: theme.palette.text.primary }}>{content}</Typography>
				)}
				{messageBlocks &&
					messageBlocks.length &&
					messageBlocks.map((block) =>
						isCodeBlock(block) ? (
							<SyntaxHighlighter style={coldarkDark} language='javascript'>
								{block}
							</SyntaxHighlighter>
						) : (
							<Typography sx={{ fontSize: "20px" }}>{block}</Typography>
						)
					)}
			</Box>
      <Avatar sx={{ ml: "0", bgcolor: theme.palette.primary.main, color: "white" }}>
				<img src='user.png' alt='user icon' width={"30px"} />
			</Avatar>
		</Box>
	);
};

export default ChatItem;
