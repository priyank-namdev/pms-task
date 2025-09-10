"use client";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} All rights reserved. | Created by{" "}
        <span className="font-semibold text-white">Priyank Namdev</span>
      </p>
    </footer>
  );
};

export default Footer;
