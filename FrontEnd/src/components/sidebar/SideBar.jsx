 import Conversations from "./Conversations.jsx";
 import Logout from "./Logout.jsx";
 import SearchInput from "./SearchInput";

const SideBar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<Logout />
		</div>
	);
};

export default SideBar
