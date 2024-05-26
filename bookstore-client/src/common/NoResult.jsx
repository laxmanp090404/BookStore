import React from "react";
export const NoResult= () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center mb-[5%]">
    <div className="animate-bounce">
      <img
        alt="No results found illustration"
        className="mx-auto h-64 w-64"
        height="256"
        src="/assets/noresults.png"
        style={{
          aspectRatio: "256/256",
          objectFit: "cover",
        }}
        width="256"
      />
    </div>
    <div className="max-w-md space-y-2">
      <h2 className="text-4xl font-bold tracking-tight text-[#060740]">No results found</h2>
      <p className="text-gray-600">We couldn't find what you searched for.</p>
      <button className="mt-4" variant="secondary">
        Try searching again
      </button>
    </div>
  </div>
  );
};



