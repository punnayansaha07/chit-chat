import { BiLogOut } from "react-icons/bi";
import  useLogout  from "../../components/hooks/useLogout";
const LogOutButton = () => {
  const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
}

export default LogOutButton
