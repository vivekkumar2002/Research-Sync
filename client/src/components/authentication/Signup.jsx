import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUserApi } from './signupapi';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const history = useNavigate();

  const handleInputs = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const { name, password, email } = form;

      if (name.length <= 4) {
        toast.error('Name should have more than 4 characters');
        return;
      }
      if (password.length <= 8) {
        toast.error('Password should be greater than 8 characters');
        return;
      }
      if (email.length === 0) {
        toast.error('Please enter email');
        return;
      }

      const { data } = await registerUserApi(form);
      if (data?.user?.name) {
        toast.success(`Welcome ${data.user.name}`);
        history('/text');
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 400') {
        toast.error('User already exists');
      }
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-600 min-h-screen flex items-center justify-center">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-full max-md:w-[31%] max-md:ml-0">
          <span className="flex flex-col mt-5 items-start max-md:mt-10">
            <div>
              <img alt="" src="/favicon.png" />
              <h1 className="text-4xl text-white">Research Sync</h1>
            </div>
            <div className="text-white text-2xl leading-20 tracking-widest self-stretch mt-14 max-md:mt-10">
              ResearchCollab: Unifying Collaboration Efforts
            </div>
            <div className="text-white text-xl leading-9 tracking-widest self-stretch mt-12 max-md:mt-10">
              Manage your research and collaborate through an all-in-one platform.
            </div>
          </span>
        </div>
        <div className="flex flex-col items-stretch w-full max-md:w-[69%] ml-5 max-md:ml-0">
          <span className="bg-white flex-grow flex flex-col items-center p-10 rounded-[36px] max-w-full max-md:max-w-[536px] max-md:mt-10 max-md:px-5">
            <div className="text-black text-2xl font-extrabold leading-9 tracking-widest mt-16 mb-6 max-md:max-w-full max-md:mt-10">
              Create Account
            </div>
            <form onSubmit={registerUser} className="w-full max-w-md">
              <div className="flex items-stretch justify-between gap-5 self-end mt-6 mb-6 max-md:max-w-full max-md:flex-wrap">
                <div className="bg-white flex items-stretch justify-between gap-3 px-4 py-3 rounded-lg border border-neutral-200 max-md:pr-5">
                  <img
                    alt="Google Icon"
                    loading="lazy"
                    src="https://www.shutterstock.com/shutterstock/photos/2275269793/display_1500/stock-vector-google-popular-realistic-social-media-logotype-editorial-illustration-eps-2275269793.jpg"
                    className="aspect-square object-contain object-center w-8 h-8 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-zinc-600 text-xs leading-9 my-auto">
                    Sign up with Google
                  </div>
                </div>
                <div className="bg-white flex items-stretch justify-between gap-3 px-4 py-3.5 rounded-lg border border-neutral-200 max-md:pr-5">
                  <img
                    alt="Facebook Icon"
                    loading="lazy"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlI_3rHTSCdcenWLKRHAl5e1G7DEI1TYSLpJthkxgaQ&s"
                    className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-zinc-600 text-xs leading-9 mt-1.5">
                    Sign up with Facebook
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Full Name"
                onChange={handleInputs}
                className="w-full mb-4 p-3 rounded-md border border-gray-300"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Email Address"
                onChange={handleInputs}
                className="w-full mb-4 p-3 rounded-md border border-gray-300"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Password"
                onChange={handleInputs}
                className="w-full mb-6 p-3 rounded-md border border-gray-300"
              />
              <button className="bg-slate-600 text-white text-center text-base font-extrabold leading-9 w-full py-4 rounded-lg">
                Create Account
              </button>
            </form>

            <div className="text-slate-600 text-base leading-9 mt-4">
              Already have an account?{' '}
              <Link to={'/login'} className="text-slate-600">
                Log in
              </Link>
            </div>
          </span>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
