import { Link } from "react-router-dom";
import { useState } from "react";

export default function HoverDropdown(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex justify-center ${props.className}`}>
      <div onMouseLeave={() => setOpen(false)} className="relative sm:w-full">
        <Link
          className="mr-4 hover:!text-green-400"
          onMouseOver={() => setOpen(true)}
          to={props.to}>
          {props.label}
        </Link>
        <ul
          className={`absolute left-0 bg-white top-5 w-40 top-10 md:top-5 pt-2 z-20 rounded-lg shadow-xl ${
            open ? "block" : "hidden"
          }`}>
          {props.children}
        </ul>
      </div>
    </div>
  );
}
