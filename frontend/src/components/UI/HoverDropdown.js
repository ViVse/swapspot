import { Navbar } from "flowbite-react";
import { useState } from "react";

export default function HoverDropdown(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex justify-center ${props.className}`}>
      <div onMouseLeave={() => setOpen(false)} className="relative sm:w-full">
        <Navbar.Link
          className="mr-4 hover:!text-green-400"
          onMouseOver={() => setOpen(true)}
          href={props.href}>
          {props.label}
        </Navbar.Link>
        <ul
          className={`absolute left-0 bg-white top-5 w-40 top-10 md:top-5 pt-2 z-20 rounded-lg shadow-xl ${
            open ? "block" : "hidden"
          }`}>
          {props.children.map((el) => (
            <li className="flex w-full items-center px-5 py-2 text-sm hover:bg-gray-100">
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
