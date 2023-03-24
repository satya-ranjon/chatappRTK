import React from "react";
import Logo from "../assets/lws-logo-light.svg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={Logo}
              alt="Learn with sumit"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                name="email"
                type="email"
                className="rounded-t-md"
                placeholder="Email address"
              />
              <Input
                name="password"
                type="password"
                className="rounded-b-md"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-violet-600 hover:text-violet-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button> Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
