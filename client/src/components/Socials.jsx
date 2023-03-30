import React from "react";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="d-flex gap-2">
      <a className="text-white" href="">
        <AiFillFacebook fontSize={20} />
      </a>
      <a className="text-white" href="">
        <GrInstagram />
      </a>
      <a className="text-white" href="">
        <FaTwitter fontSize={20} />
      </a>
      <a className="text-white" href="">
        <AiFillYoutube fontSize={20} />
      </a>
    </div>
  );
};

export default Socials;
