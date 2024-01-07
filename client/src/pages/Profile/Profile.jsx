/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
	getStorage,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../config/firebase-config';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../../redux/user/userSlice';

const Profile = () => {
	const fileRef = useRef(null);
	const { currentUser, loading, error } = useSelector((state) => state.user);
	const [file, setFile] = useState(undefined);
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [formData, setFormData] = useState({});
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [showListingsError, setShowListingsError] = useState(false);
	const [userListings, setUserListings] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (file) {
			handleFileUpload(file);
		}
	}, [file]);

	const handleFileUpload = (file) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on('state_changed', (snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setFilePerc(Math.round(progress));
		},
		(error) => {
			setFileUploadError(true);
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				setFormData({ ...formData, avatar: downloadURL })
				}
			);
		});
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();
		try {
			dispatch(updateUserStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(updateUserFailure(data.message));
				return;
			}
			dispatch(updateUserSuccess(data));
			setUpdateSuccess(true);
		} catch (error) {
			dispatch(updateUserFailure(error.message));
		}
    };

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4">
				<input
					onChange={(e) => setFile(e.target.files[0])}
					type="file"
					ref={fileRef}
					hidden
					accept="image/*"
				/>
				<img
					onClick={() => fileRef.current.click()}
					src={formData.avatar || currentUser.avatar}
					alt="avatar"
					className="rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center mt-2"
				/>
				<p className="text-sm self-center">
					{fileUploadError ? (
						<span className="text-red-700">
							Failed to upload image (image must be less than 2 mb)
						</span>
					) : filePerc > 0 && filePerc < 100 ? (
						<span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
					) : filePerc === 100 ? (
						<span className="text-green-700">Image uploaded successfully!</span>
					) : (
						''
					)}
				</p>
				<input
					id="username"
					type="text"
					placeholder="Username"
					defaultValue={currentUser.username}
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<input
					id="email"
					type="email"
					placeholder="Email"
					defaultValue={currentUser.email}
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<input
					id="password"
					type="password"
					placeholder="Password"
					className="border p-3 rounded-lg"
					onChange={handleChange}
				/>
				<button
				disabled={loading}
				className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
					{ loading ? 'Loading...' : 'Update' }
				</button>
			</form>
			<div className="flex justify-between mt-5">
				<span className="text-red-700 cursor-pointer">Delete Account</span>
				<span className="text-red-700 cursor-pointer">Sign out</span>
			</div>
			<p className='text-red-700 mt-5 self-center'>
				{error ? error : ''}
			</p>
			<p className='text-green-700 mt-5'>
				{updateSuccess ? 'User is update successfully' : ''}
			</p>
		</div>
	);
};

export default Profile;
