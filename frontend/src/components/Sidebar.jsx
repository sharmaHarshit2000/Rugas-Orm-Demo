import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Create Order", path: "/orders/create" },

  ];

  return (
    <div className="w-64 min-h-screen bg-blue-800 text-white p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">RUGAS</h1>
      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-blue-700 ${isActive ? "bg-blue-700 font-semibold" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
