import React from "react";
import Logo from "../assets/lws-logo-light.svg";
import Button from "../components/ui/Button";
import CheckInput from "../components/ui/CheckInput";
import Input from "../components/ui/Input";
const Register = () => (
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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              className="rounded-t-md"
              type="text"
              name="name"
              placeholder="Name"
            />
            <Input type="email" name="email" placeholder="Email address" />
            <Input type="password" name="password" placeholder="Password" />
            <Input
              type="password"
              name="confirmPassword"
              className="rounded-b-md"
              placeholder="Confirm Password"
            />
          </div>
          <CheckInput
            label="Agreed with the terms and condition"
            name="reminder-me"
          />

          <Button>Sign up</Button>
        </form>
      </div>
    </div>
  </div>
);

export default Register;
