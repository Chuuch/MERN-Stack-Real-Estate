import {Link} from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold">
        Sign up
      </h1>
      <form
        className="flex flex-col gap-4" 
        type="text">
        <input type="text" placeholder="username" 
          className="border p-3 rounded-lg" id="username"/>
          <input type="email" placeholder="email" 
          className="border p-3 rounded-lg" id="email"/>
          <input type="password" placeholder="password" 
          className="border p-3 rounded-lg" id="password"/>
          <button 
            className="bg-slate-700 text-white p-3 rounded-lg uppercase cursor-pointer
            hover:opacity-95 disabled:opacity-80">
            Sign up
          </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link
        className='hover:underline' 
        to="/sign-in">
          <span className='text-blue-700'>
            Sign in
          </span>
        </Link>
      </div>

    </div>
  )
}

export default SignUp;
