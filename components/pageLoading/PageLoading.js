import React from "react";

const Loading = () => {
  return (
    <main className="w-svw h-svh flex flex-col items-center justify-center text-center text-white">
      <h1 className="text-[20px]">Checking auth state ...</h1>
      <p>Hopefully not for too long :)</p>
    </main>
  );
};

export default Loading;
