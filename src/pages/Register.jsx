import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/lws-logo-light.svg";
import Button from "../components/ui/Button";
import CheckInput from "../components/ui/CheckInput";
import Error from "../components/ui/Error";
import Input from "../components/ui/Input";
import { useRegisterMutation } from "../features/auth/authApi";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  reminderMe: false,
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [register, { data, isLoading, isError, error: responseError }] =
    useRegisterMutation();
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

    if (!formData.name) {
      setError(" Name is required ");
    } else if (!formData.email) {
      setError(" Email is required ");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError(" Email is invalid ");
    } else if (!formData.password) {
      setError(" Password is required ");
    } else if (formData.password.length < 6) {
      setError(" Password must be at least 6 characters ");
    } else if (formData.password !== formData.confirmPassword) {
      setError(" Passwords do not match !");
    } else if (!formData.reminderMe) {
      setError(" You must agree to the terms and conditions ");
    } else {
      register({
        name: formData.name,
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
              Create your account
            </h2>
          </div>
          {error && <Error message={error} />}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                className="rounded-t-md"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="confirmPassword"
                className="rounded-b-md"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <CheckInput
              label="Agreed with the terms and condition"
              name="reminderMe"
              required
              checked={formData.reminderMe}
              onChange={handleInputChange}
            />

            <Button disabled={isLoading}>Sign up</Button>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                You have already account !{" "}
                <Link
                  to="/"
                  className="font-medium text-violet-600 hover:text-violet-500">
                  Please Login ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
