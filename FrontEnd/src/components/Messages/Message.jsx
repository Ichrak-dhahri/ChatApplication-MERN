import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);//extracting time form created at functionality of mongo db 
	const chatClassName = fromMe ? "chat-end" : "chat-start";//if the message for me show chat start else show what end
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;//handle the profiles pic
	const bubbleBgColor = fromMe ? "bg-purple-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";//animation for new messages

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>{/* afficher le message and set up the buble color */}
			<div className='chat-footer text-white opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;