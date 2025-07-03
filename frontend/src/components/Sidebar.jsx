import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ isOpen, onClose }) => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders", exact: true },
    { name: "Create Order", path: "/orders/create" },
  ];

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if clicked outside the sidebar,
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Faded overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-blue-800 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:${isOpen ? "block" : "hidden"}`}
      >
        <div className="relative h-full p-4 space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white text-2xl hover:text-gray-200 md:hidden"
          >
            <IoMdClose />
          </button>

          {/* Nav links  */}
          <nav className="space-y-2 mt-12">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.exact}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors ${isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
