import { NavLink } from "react-router-dom";
import AppLogo from "./app-logo";
import { Menu } from "lucide-react";
import { useState } from "react";

const SideBar = ({ navs }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    return (
        <aside className={`h-screen flex flex-col border-r border-blue-200 shadow overflow-hidden transition-all duration-300 ${collapsed ? 'w-20' : 'w-70'}`}>
            <div className="min-h-24 flex items-center justify-center border-b-blue-100 border-b p-3 pl-1">
                {!collapsed && <AppLogo width={150} className={'flex-1 justify-center'} />}
                {/* <h2 className="">Track My Vechicle Portal</h2> */}
                <Menu className="cursor-pointer" onClick={() => setCollapsed((v) => !v)} />
            </div>
            <nav className="flex-1 mt-5">
                {navs.map((nav) => (
                    <div key={nav.id}>
                        <NavLink
                            key={nav.id}
                            to={nav.path}
                            onClick={() => setOpenMenu(openMenu === nav.id ? null : nav.id)}
                            className={({ isActive }) => `flex gap-2 items-center p-3 m-1 rounded-md transition-all duration-300
                        ${isActive ? 'bg-blue-600 text-white' : ''} ${collapsed ? 'justify-center' : 'justify-start'}
                        `}
                        >
                            {nav.icon}
                            {!collapsed && <span className="transition-all duration-500 delay-50">{nav.title}</span>}
                        </NavLink>

                        {/*child nav */}
                        {openMenu === nav.id && nav.subChild?.length > 0 && (
                            <div
                                className={`ml-5 overflow-hidden transition-all duration-300 ease-in-out
                             ${openMenu === nav.id ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                {nav.subChild.map((child) => (
                                    <NavLink
                                        key={child.id}
                                        to={child.path}
                                        className={({ isActive }) =>
                                            `flex gap-2 items-center p-2 m-1 mt-2 rounded-md  ${isActive ? "bg-blue-500 text-white" : ""
                                            } ${collapsed ? "justify-center" : "justify-start"}`
                                        }
                                    >
                                        {child.icon}
                                        {!collapsed && (
                                            <span className="transition-all duration-300">
                                                {child.title}
                                            </span>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default SideBar;