import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
	Box,
	Avatar,
	Typography,
	Button,
	IconButton,
	useTheme,
} from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
	deleteUserChats,
	getUserChats,
	sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
type Message = {
	role: "user" | "assistant";
	content: string;
};
const Chat = () => {
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const auth = useAuth();
	const [chatMessages, setChatMessages] = useState<Message[]>([]);
	const theme = useTheme();
	const handleSubmit = async () => {
		const content = inputRef.current?.value as string;
		if (inputRef && inputRef.current) {
			inputRef.current.value = "";
		}
		const newMessage: Message = { role: "user", content };
		setChatMessages((prev) => [...prev, newMessage]);
		const chatData = await sendChatRequest(content);
		setChatMessages([...chatData.chats]);
		//
	};
	const handleDeleteChats = async () => {
		try {
			toast.loading("Deleting Chats", { id: "deletechats" });
			await deleteUserChats();
			setChatMessages([]);
			toast.success("Deleted Chats Successfully", { id: "deletechats" });
		} catch (error) {
			console.log(error);
			toast.error("Deleting chats failed", { id: "deletechats" });
		}
	};
	useLayoutEffect(() => {
		if (auth?.isLoggedIn && auth.user) {
			toast.loading("Loading Chats", { id: "loadchats" });
			getUserChats()
				.then((data) => {
					setChatMessages([...data.chats]);
					toast.success("Successfully loaded chats", { id: "loadchats" });
				})
				.catch((err) => {
					console.log(err);
					toast.error("Loading Failed", { id: "loadchats" });
				});
		}
	}, [auth]);
	useEffect(() => {
		if (!auth?.user) {
			return navigate("/login");
		}
	}, [auth]);
	return (
		<Box
			sx={{
				display: "flex",
				flex: 1,
				width: "100%",
				height: "calc(100vh - 64px)",
				// mt: 3,
				gap: 3,
				bgcolor: theme.palette.background.default,
			}}
		>
			<Box
				sx={{
					display: { md: "flex", xs: "none", sm: "none" },
					flex: 0.2,
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "60vh",
						bgcolor: theme.palette.primary.light,
						borderRadius: 5,
						flexDirection: "column",
						mx: 3,
					}}
				>
					<Avatar
						sx={{
							mx: "auto",
							my: 2,
							bgcolor: "white",
							color: "black",
							fontWeight: 700,
						}}
					>
            <img src='bot.png' alt='openai' width={"30px"} />
          </Avatar>
          
					<Typography
						sx={{
							mx: "auto",
							fontFamily: "work sans",
							color: theme.palette.text.primary,
						}}
					>
						Meet Your AI Assistant
					</Typography>
					<Typography
						sx={{
							mx: "auto",
							fontFamily: "work sans",
							my: 4,
							p: 3,
							color: theme.palette.text.primary,
						}}
					>
						Lost in a digital maze?
						<br />
						I'm here to be your guide. Ask me anything!
					</Typography>
					<Button
						onClick={handleDeleteChats}
						sx={{
							width: "200px",
							my: "auto",
							color: "white",
							fontWeight: "700",
							borderRadius: 3,
							mx: "auto",
							bgcolor: theme.palette.warning.main,
							":hover": {
								bgcolor: red.A400,
							},
						}}
					>
						Clear Conversation
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flex: { md: 0.8, xs: 1, sm: 1 },
					flexDirection: "column",
					px: 3,
				}}
			>
				<Typography
					sx={{
						fontSize: "40px",
						color: theme.palette.text.primary,
						mb: 2,
						mx: "auto",
						fontWeight: "600",
					}}
				>
					PaLM - 2
				</Typography>
				<Box
					sx={{
						width: "100%",
						height: "60vh",
						borderRadius: 3,
						mx: "auto",
						display: "flex",
						flexDirection: "column",
						overflow: "scroll",
						overflowX: "hidden",
						overflowY: "auto",
						scrollBehavior: "smooth",
					}}
				>
					{chatMessages.map((chat, index) => (
						//@ts-ignore
						<ChatItem content={chat.content} role={chat.role} key={index} />
					))}
				</Box>
				<div
					style={{
						width: "100%",
						borderRadius: 8,
						backgroundColor: theme.palette.primary.dark,
						display: "flex",
						margin: "auto",
					}}
				>
					{" "}
					<input
						ref={inputRef}
						type='text'
						style={{
							width: "100%",
							backgroundColor: "transparent",
							padding: "30px",
							border: "none",
							outline: "none",
							color: theme.palette.text.primary,
							fontSize: "20px",
						}}
					/>
					<IconButton onClick={handleSubmit} sx={{ color: theme.palette.text.primary, mx: 1 }}>
						<IoMdSend />
					</IconButton>
				</div>
			</Box>
		</Box>
	);
};

export default Chat;
