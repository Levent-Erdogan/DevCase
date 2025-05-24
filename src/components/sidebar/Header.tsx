import React from "react";
import { ShoppingOutlined, UnorderedListOutlined } from '@ant-design/icons';

interface HeaderProps {
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ isCollapsed }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Logo ve hamburger */}
      <div className="flex items-center justify-between">
        {/* Logo Text and Icon */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          {/* Logo Icon */}
          <div className="relative w-10 h-10 rounded-full bg-[#2D3139] flex items-center justify-center">
            <ShoppingOutlined style={{ color: '#A7F3D0', fontSize: '22px' }} />
            <span className="absolute text-white text-sm font-bold">M</span>
          </div>
          {/* Logo Text - Only visible when sidebar is expanded */}
          {!isCollapsed && (
            <div className="flex flex-col gap-y-0.5">
              <span className="text-black">master</span>
              <span className="text-indigo-600">POS</span>
            </div>
          )}
        </div>
        {/* Hamburger menü simgesi - Sadece geniş modda görünür */}
        {!isCollapsed && (
          <button
            className="p-2 text-gray-500 text-2xl focus:outline-none"
          >
            <UnorderedListOutlined />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header; 