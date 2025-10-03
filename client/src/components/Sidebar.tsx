import React from 'react';
import AuthLinks from './AuthLinks';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">   
            <div>
                <div className="text-2xl font-bold mb-8">Text-to-Learn</div>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="hover:text-gray-300">Dashboard</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:text-gray-300">My Courses</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:text-gray-300">Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mt-auto">
                <AuthLinks />
            </div>
        </aside>
    );
};

export default Sidebar;