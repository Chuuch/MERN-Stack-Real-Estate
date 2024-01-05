import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.cxcqa9RvhGnRd8x3N2oBdgHaHn%26pid%3DApi&f=1&ipt=7a071eb2708c112a981d2d43d9516157485f01513bc6324ff9697ec2a3f8338f&ipo=images',
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
