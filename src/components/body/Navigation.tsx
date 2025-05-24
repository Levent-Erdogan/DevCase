"use client";
import React from "react";
import { Avatar, Badge, Switch, Divider, Grid, Button } from "antd";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  GlobalOutlined,
  MailOutlined,
  BulbOutlined,
  MoonOutlined,
  DownOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

interface NavigationProps {
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
}

// Sub-components for better organization and reusability
const Logo = () => (
  <div className="flex items-center gap-2 text-2xl font-bold">
    <div className="relative w-10 h-10 rounded-full bg-[#2D3139] flex items-center justify-center">
      <ShoppingOutlined style={{ color: '#A7F3D0', fontSize: '22px' }} />
      <span className="absolute text-white text-sm font-bold">M</span>
    </div>
  </div>
);

const TitleAndDescription = () => (
  <>
    <div className="text-xl text-[#222] font-bold">Products</div>
    <div className="text-gray-400 text-sm">Manage your products</div>
  </>
);

const ThemeSwitcher = () => (
  <div className="flex items-center gap-2">
    <BulbOutlined style={{ color: '#222', fontSize: 22 }} />
    <Switch defaultChecked={false} className="bg-gray-200" />
    <MoonOutlined style={{ color: '#222', fontSize: 22 }} />
  </div>
);

const CommonIconsSet = () => (
  <>
    <ThemeSwitcher />
    <Divider type="vertical" className="h-8" />
    <GlobalOutlined style={{ color: '#444', fontSize: 22 }} />
    <Badge
      count={12}
      size="small"
      offset={[-2, 2]}
      color="#b6e388"
      className="notification-badge-black-text"
    >
      <BellOutlined style={{ color: '#444', fontSize: 22 }} />
    </Badge>
    <MailOutlined style={{ color: '#444', fontSize: 22 }} />
    <SettingOutlined style={{ color: '#222', fontSize: 22 }} />
    <Divider type="vertical" className="h-8" />
  </>
);

const UserInfo = () => (
  <div className="flex items-center gap-2">
    <Avatar size={40} icon={<UserOutlined />} />
    <div>
      <div className="font-medium text-gray-700">
        Patricia Peter <DownOutlined className="ml-1 text-xs" />
      </div>
      <div className="text-xs text-gray-400 -mt-1">Super Admin</div>
    </div>
  </div>
);

const Navigation: React.FC<NavigationProps> = ({ isSidebarOpen, onSidebarToggle }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // Clear screen size definitions
  const isDesktop = !!screens.lg;
  const isTablet = !!screens.md && !screens.lg;
  const isMobile = !screens.md;
  const isMobileOrTablet = isMobile || isTablet;

  // Conditional rendering flags
  const showLogoOnLeft = isMobile && !isSidebarOpen;
  const showTitleOnLeft = isDesktop;
  const showCommonIcons = isDesktop || (isMobileOrTablet && isSidebarOpen);
  const showUserInfo = !isMobile;
  const showHamburger = isMobileOrTablet && !isSidebarOpen;

  return (
    <div className="bg-white rounded-xl shadow px-8 py-4 flex items-center justify-between mb-6">
      {/* Left side: Logo or Title/Description */}
      <div>
        {showLogoOnLeft && <Logo />}
        {showTitleOnLeft && <TitleAndDescription />}
      </div>

      {/* Right side: Icons and User */}
      <div className="flex items-center gap-8">
        {showCommonIcons && <CommonIconsSet />}
        {showUserInfo && <UserInfo />}
        {showHamburger && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onSidebarToggle}
          />
        )}
      </div>
    </div>
  );
};

export default Navigation; 