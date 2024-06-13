import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen gap-4 text-xl">
      <div
        className="inline-block te h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      Loading ...
    </div>
  );
}
