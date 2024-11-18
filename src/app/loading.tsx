import { Spinner } from "flowbite-react";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
};

export default loading;
