import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Profile from './pages/Profile/Profile.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import Header from './components/Header/Header.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import CreateListing from '../../client/src/pages/CreateListing/CreateListing.jsx';
import UpdateListing from '../../client/src/pages/UpdateListing/UpdateListing.jsx';
import Listing from '../../client/src/pages/Listing/Listing.jsx';
import Search from '../../client/src/pages/Search/Search.jsx';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/about" element={<About />} />
				<Route path="/search" element={<Search />} />
				<Route path="/listing/:listingId" element={<Listing />} />
				<Route element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/create-listing" element={<CreateListing />} />
					<Route path="/update-listing/:listingId" element={<UpdateListing />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
