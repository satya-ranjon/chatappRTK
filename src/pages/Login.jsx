import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/lws-logo-light.svg";
import Button from "../components/ui/Button";
import Error from "../components/ui/Error";
import Input from "../components/ui/Input";
import { useLoginMutation } from "../features/auth/authApi";

const initialState = {
  email: "",
  password: "",
};
const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [login, { data, isLoading, isError, error: responseError }] =
    useLoginMutation();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/inbox");
      setFormData(initialState);
    }
  }, [isError, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError(" Email is required ");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError(" Email is invalid ");
    } else if (!formData.password) {
      setError(" Password is required ");
    } else {
      login({
        email: formData.email,
        password: formData.password,
      });
    }
  };

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
          {error && <Error message={error} />}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                name="email"
                type="email"
                className="rounded-t-md"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                name="password"
                type="password"
                className="rounded-b-md"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                You have no account !{" "}
                <Link
                  to="/register"
                  href="#"
                  className="font-medium text-violet-600 hover:text-violet-500">
                  Please Register ?
                </Link>
              </div>
            </div>
            <Button disabled={isLoading}> Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
