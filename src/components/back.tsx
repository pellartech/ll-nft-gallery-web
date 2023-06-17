import Image from "next/image";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Back = () => {
  // const navigate = useNavigate()
  return (
    <div className="text-grey-80 font-medium text-base flex gap-2 cursor-pointer">
      <img alt="" src="/images/icons/back.svg" />
      Back
    </div>
  );
};
