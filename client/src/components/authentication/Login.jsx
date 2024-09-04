import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { loginUserApi } from './signupapi';
import { Link } from 'react-router-dom';

export default function Login() {
  const history = useNavigate();

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const { password, email } = form;

      if (password.length <= 8) {
        toast.error('Password should be greater than 8 characters');
        return;
      }
      if (email.length === 0) {
        toast.error('Please enter email');
        return;
      }

      const { data } = await loginUserApi(form);
      if (data?.user?.email) {
        sessionStorage.setItem('email',data?.user?.email);
        history('/dashboard');
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 401') {
        toast.error('Email or Password Wrong');
      }
      console.log(error);
    }
  };

  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-slate-600">
      <div className="flex flex-col w-full max-w-screen-xl p-10 bg-white shadow-lg md:flex-row rounded-xl">
        <div className="md:w-1/2 md:pr-12">
          <img alt="" src="/favicon.png" className="mb-4" />
          <h1 className="text-4xl text-slate-600">Research Sync</h1>
          <div className="mt-5 text-xl leading-6 tracking-widest text-gray-600">
            ResearchCollab: Unifying Collaboration Efforts
          </div>
          <div className="mt-3 text-lg leading-5 tracking-wider text-gray-600">
            Manage your research and collaborate through an all-in-one platform.
          </div>
        </div>
        <div className="flex items-center justify-center md:w-1/2">
          <div className="flex flex-col items-center w-full">
            <div className="flex mb-4">
              <span className="flex items-stretch justify-between gap-3 px-3 py-2 border border-solid rounded-lg border-neutral-200 max-md:pr-5">
                <img
                  alt="img"
                  loading="lazy"
                  src="https://www.shutterstock.com/shutterstock/photos/2275269793/display_1500/stock-vector-google-popular-realistic-social-media-logotype-editorial-illustration-eps-2275269793.jpg"
                  className="object-contain object-center w-8 h-8 max-w-full overflow-hidden aspect-square shrink-0"
                />
                <div className="my-auto text-xs leading-6 text-zinc-600">
                  Sign up with Google
                </div>
              </span>
              <span className="flex items-stretch justify-between gap-3 px-3 py-2 ml-4 border border-solid rounded-lg border-neutral-200 max-md:pr-5">
                <img
                  alt="img"
                  loading="lazy"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFlI_3rHTSCdcenWLKRHAl5e1G7DEI1TYSLpJthkxgaQ&s"
                  className="object-contain object-center w-8 h-8 max-w-full overflow-hidden aspect-square shrink-0"
                />
                <div className="text-zinc-600 text-xs leading-6 mt-1.5">
                  Sign up with Facebook
                </div>
              </span>
            </div>
            <div className="self-center my-4 text-lg leading-6 text-slate-600 whitespace-nowrap">
              OR
            </div>
            <form onSubmit={loginUser} className="flex flex-col items-center w-full">
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Email Address"
                onChange={handleInputs}
                style={{ outline: 'none' }}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="Password"
                onChange={handleInputs}
                style={{ outline: 'none' }}
                className="w-full p-3 mb-4 border border-gray-300 rounded"
              />
              <div className="mb-4 text-base leading-6 text-slate-600">
                No account?{' '}
                <Link to={'/signup'} className="text-slate-600">
                  Sign up
                </Link>
              </div>
              <button className="w-full p-3 text-white rounded bg-slate-600" type="submit">
                Log in
              </button>
            </form>
          </div>
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
