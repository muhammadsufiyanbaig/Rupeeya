import {Link} from "react-router-dom";
import React from "react";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { FaThreads } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdWifiCalling } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
const Footer = () => {
  return (
    <div className="flex gap-4 text-center flex-col bg-gray-100">
      <footer className="mx-auto max-w-screen px-4 md:px-8 ">
        <div className="flex flex-col items-center border-t pt-6 sm:justify-between">
          <a className="title-font font-medium items-center md:justify-start text-gray-900 image-wrapper">
            <span className="ml-3 text-xl">Rupeeya</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
            © 2023 - Created by <a href={`mailto:send.sufiyan@gmail.com`}>@ Muhammad Sufiyan Baig</a>
          </p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start pt-4">
          <Link
            to={"https://muhammadsufiyanbaig.vercel.app/"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <TbWorldWww />
          </Link>
          <Link
            to={"https://wa.link/lx08cc"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <IoLogoWhatsapp />
          </Link>
          <Link
            to={"https://www.facebook.com/profile.php?id=100068723281045"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <RiFacebookCircleLine />
          </Link>
          <Link
            to={"https://www.instagram.com/muhammad_sufiyan_baig/"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <FaInstagram />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/muhammadsufiyanbaig//"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <FiLinkedin />
          </Link>
          <Link
            to={"https://www.threads.net/@muhammad_sufiyan_baig"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <FaThreads />
          </Link>
          <Link
            to={"https://twitter.com/Sufiyan395"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <FaXTwitter />
          </Link>
          <Link
            to={"https://github.com/muhammadsufiyanbaig"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <IoLogoGithub />
          </Link>
          <a
            href={"tel:+92-3123352687"}
            className="text-gray-500 text-2xl ml-3"
            target="_blank">
            <MdWifiCalling />
          </a>

        </div>
      </footer>
    </div>
  );
};
export default Footer;
