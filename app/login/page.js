"use client";
import React, { useContext, useEffect } from "react";
import GlobalContext from "../../components/context/Context";
import { redirect } from "next/navigation";
import { Alert, Button, Input } from "@material-tailwind/react";
import Loading from "../../components/pageLoading/PageLoading";
import DashboardLoarding from "@/components/dashboardLoarding/DashboardLoarding";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    login,
    authState,
    setAuthState,
    userDataStatus,
    setUserDataStatus,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (authState === "authenticated") {
      redirect("/backdoor");
    }
  }, [authState]);

  return (
    <>
      {authState === "pending" && <Loading />}
      {authState === "pending" && userDataStatus === "hasData" && (
        <DashboardLoarding />
      )}

      {authState === "unauthenticated" && (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="w-80 mb-4">
            <Alert variant="outlined" color="blue">
              <span>Sign in to edit site content.</span>
            </Alert>
          </div>
          <div className="flex flex-col items-center justify-center w-80 py-10 bg-white">
            <h1 className="mb-10 sm:text-[31px] md:text-[33px] text-[35px]">
              Login
            </h1>
            <div className="flex w-72 flex-col gap-5">
              <Input
                type="email"
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                label="Password"
                // className="w-full h-12 p-2 mb-4 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                // className="sm:w-5/12 md:w-5/12 lg:w-2/12 h-12 p-2 bg-black text-white rounded-full"
                onClick={() => {
                  setAuthState("pending");
                  login();
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
