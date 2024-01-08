import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { TbHomeSearch } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useEffect, useState } from'react';
import DarkModeToggle from '../DarkMode/DarkMode';

const Header = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('searchTerm', searchTerm);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get('searchTerm');
		if (searchTermFromUrl) {
			setSearchTerm(searchTermFromUrl);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[location.search]);

	return (
		<header className="bg-slate-200 dark:bg-gray-700 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/" className="flex flex-row items-center">
					{/* <img src='./logo.png' alt='logo' className='w-10'/> */}
					<TbHomeSearch size={32} className="text-gray-500" />
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
						<span className="text-slate-500">Home</span>
						<span className="text-slate-700 dark:text-slate-100">4</span>
						<span className="text-gray-400">You</span>
					</h1>
				</Link>
				<form
				onSubmit={handleSubmit} 
				className="bg-slate-100 dark:bg-gray-400 p-3 rounded-lg flex items-center">
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent dark:text-slate-800 focus:outline-none w-24 sm:w-64"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FaSearch className="text-slate-600" />
				</form>
				<ul className="flex items-center gap-4">
					<Link to="/">
						<li className="hidden sm:inline text-slate-700 dark:text-gray-400 hover:underline cursor-pointer">
							Home
						</li>
					</Link>
					<Link to="/about">
						<li className="hidden sm:inline text-slate-700 dark:text-gray-400 hover:underline cursor-pointer">
							About
						</li>
					</Link>
					<Link
					className='flex'
					to="/profile">
					{currentUser ? (
						<img
						className='rounded-full h-7 w-7 object-cover' 
						src={currentUser.avatar} 
						alt=""/>
					) : (
						<li className="text-slate-700 dark:text-gray-400 hover:underline">Sign in</li>
					)}
					</Link>
					<DarkModeToggle />
				</ul>
			</div>
		</header>
	);
};

export default Header;
