import React from 'react';

const LoginActivity = () => {
  return (
    <div className="m-auto w-full max-w-md min-h-[350px] mt-6 md:mt-8 flex flex-col justify-center rounded-[30px] bg-slate-300/70 shadow-sm p-4 md:p-12">
      <h1 className="text-center text-2xl md:text-4xl text-blue-800">
        Login Codehills
      </h1>
      <form className="mt-6 md:mt-8 flex flex-col w-full">
        <label htmlFor="email" className="flex flex-col space-y-1">
          <span className="text-gray-600">Email</span>
          <input
            id="email"
            type="text"
            placeholder="Email"
            className="p-2 rounded border-gray-400 bg-white w-full"
          />
        </label>

        <label
          htmlFor="password"
          className="flex flex-col space-y-1 mt-2"
        >
          <span>Password</span>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-2 rounded border-gray-400 bg-white w-full"
          />
        </label>

        <button
          type="submit"
          className="rounded mt-6 md:mt-8 py-3 px-3 bg-blue-800 text-white font-semibold px-8 md:px-12"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginActivity;
