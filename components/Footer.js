"use client";
import React, { useContext } from "react";
import GlobalContext from "./context/Context";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { userDataStatus } = useContext(GlobalContext);

  const pathname = usePathname();

  return (
    <>
      {pathname === "/backdoor" || pathname === "/login" ? (
        <div></div>
      ) : (
        <>
          {userDataStatus === "hasData" && (
            <div className="flex justify-center mt-20 py-10 text-secondary">
              Copyright 2024. All Rights Reserved.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Footer;
