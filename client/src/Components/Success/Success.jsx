import Link from "next/link";
import React from "react";

function Success() {
  return (
    <div className="flex flex-col w-1/2 items-center gap-2">
      <div className="text-center w-full p-5 font-semibold text-xl rounded-md  border-1 border-green-500 bg-green-300 text-black">
        Success
      </div>
      <Link className="text-blue-500 underline" href="/">
        back to home
      </Link>
    </div>
  );
}

export default Success;
