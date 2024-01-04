import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TbHomeSearch } from 'react-icons/tb'

const Header = () => {
	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/" className='flex flex-row items-center'>
					{/* <img src='./logo.png' alt='logo' className='w-10'/> */}
					<TbHomeSearch size={32} className='text-gray-500'/>
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
						<span className="text-slate-500">Home</span>
						<span className="text-slate-700">4</span>
						<span className='text-gray-400'>You</span>
					</h1>
				</Link>
				<form className="bg-slate-100 p-3 rounded-lg flex items-center">
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent focus:outline-none w-24 sm:w-64"
					/>
					<FaSearch className="text-slate-600" />
				</form>
				<ul className="flex gap-4">
					<Link to='/'>
                    <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
						Home
					</li>
                    </Link>
					<Link to='/about'>
                    <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
						About
					</li>
                    </Link>
					<Link to='/sign-in'>
                    <li className='className="sm:inline text-slate-700 hover:underline cursor-pointer"'>
						Sign in
					</li>
                    </Link>
				</ul>
			</div>
		</header>
	);
};

export default Header;
