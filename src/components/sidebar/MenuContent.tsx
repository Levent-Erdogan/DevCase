import React from "react";
import { Menu, Badge, Input } from "antd";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  PlusSquareOutlined,
  TagsOutlined,
  BarcodeOutlined,
  DatabaseOutlined,
  InboxOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  HomeOutlined,
  GiftOutlined,
  PieChartOutlined,
  TrophyOutlined,
  ReloadOutlined,
  PercentageOutlined,
  UnorderedListOutlined,
  MailOutlined,
  GlobalOutlined,
  SettingOutlined,
  SearchOutlined
} from '@ant-design/icons';

interface MenuContentProps {
  isCollapsed: boolean;
  openKeys: string[];
  onOpenChange: (keys: string[]) => void;
}

const MenuContent: React.FC<MenuContentProps> = ({ isCollapsed, openKeys, onOpenChange }) => {
  const mainMenuItems = [
    {
      key: 'dashboard',
      icon: <HomeOutlined className="text-lg" />,
      label: 'Dashboard',
      className: 'flex items-center h-12'
    },
    {
      key: 'products',
      icon: <ShoppingOutlined className="text-lg" />,
      label: 'Products',
      className: 'custom-submenu',
      popupClassName: 'custom-submenu-popup',
      children: [
        {
          key: 'all-products',
          icon: <AppstoreOutlined className="text-lg" />,
          label: 'All Products',
          className: 'flex items-center h-12'
        },
        {
          key: 'add-product',
          icon: <PlusSquareOutlined className="text-lg" />,
          label: 'Add New Product',
          className: 'flex items-center h-12'
        },
        {
          key: 'tags',
          icon: <TagsOutlined className="text-lg" />,
          label: 'Tags',
          className: 'flex items-center h-12'
        }
      ]
    },
    {
      key: 'categories',
      icon: <DatabaseOutlined className="text-lg" />,
      label: 'Categories',
      className: 'flex items-center h-12'
    },
    {
      key: 'sub-category',
      icon: <UnorderedListOutlined className="text-lg" />,
      label: 'Sub Category',
      className: 'flex items-center h-12'
    },
    {
      key: 'brands',
      icon: <GiftOutlined className="text-lg" />,
      label: 'Brands',
      className: 'flex items-center h-12'
    },
    {
      key: 'scan-barcode',
      icon: <BarcodeOutlined className="text-lg" />,
      label: 'Scan Barcode',
      className: 'flex items-center h-12'
    },
    {
      key: 'import-products',
      icon: <InboxOutlined className="text-lg" />,
      label: 'Import Products',
      className: 'flex items-center h-12'
    }
  ];

  const analyticsItems = [
    {
      key: 'sales',
      icon: <BarChartOutlined className="text-lg" />,
      label: (
        <span className="flex items-center justify-between w-full">
          Sales
          {!isCollapsed && <Badge count={49} style={{ backgroundColor: '#b6e388', color: '#222', marginLeft: 8 }} />}
        </span>
      ),
      className: 'flex items-center h-12'
    },
    {
      key: 'pos',
      icon: <ShoppingCartOutlined className="text-lg" />,
      label: 'Point of Sales',
      className: 'flex items-center h-12'
    },
    {
      key: 'leaderboards',
      icon: <TrophyOutlined className="text-lg" />,
      label: 'Leaderboards',
      className: 'flex items-center h-12'
    },
    {
      key: 'orders',
      icon: <PieChartOutlined className="text-lg" />,
      label: 'Orders',
      className: 'flex items-center h-12',
      children: [
        {
          key: 'refund',
          icon: <ReloadOutlined className="text-lg" />,
          label: 'Refund',
          className: 'flex items-center h-12'
        },
        {
          key: 'taxes',
          icon: <PercentageOutlined className="text-lg" />,
          label: 'Taxes',
          className: 'flex items-center h-12'
        },
        {
          key: 'stock',
          icon: <InboxOutlined className="text-lg" />,
          label: 'Stock',
          className: 'flex items-center h-12'
        }
      ]
    }
  ];

  const appsItems = [
    {
      key: 'chat',
      icon: <MailOutlined className="text-lg" />,
      label: (
        <span className="flex items-center justify-between w-full">
          Chat
          {!isCollapsed && <Badge count={80} style={{ backgroundColor: '#b6e388', color: '#222', marginLeft: 8 }} />}
        </span>
      ),
      className: 'flex items-center h-12'
    },
    {
      key: 'calendar',
      icon: <DatabaseOutlined className="text-lg" />,
      label: 'Calendar',
      className: 'flex items-center h-12'
    },
    {
      key: 'email',
      icon: <GlobalOutlined className="text-lg" />,
      label: 'Email',
      className: 'flex items-center h-12'
    }
  ];

  const settingsItems = [
    {
      key: 'settings',
      icon: <SettingOutlined className="text-lg" />,
      label: 'Settings',
      className: 'flex items-center h-12'
    },
    {
      key: 'log-out',
      icon: <ReloadOutlined className="text-lg" />,
      label: 'Log Out',
      className: 'flex items-center h-12'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      {!isCollapsed && (
        <Input
          placeholder="Search here"
          prefix={<SearchOutlined className="text-gray-400" />}
          className="rounded bg-gray-100 border-none mb-4"
          size="large"
        />
      )}
      {/* Main Menu */}
      {!isCollapsed && <div className="text-xs font-bold text-gray-400 mb-2 mt-2">MAIN MENU</div>}
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={["all-products"]}
        className="border-none bg-transparent flex-grow"
        style={{ fontWeight: 500 }}
        inlineCollapsed={isCollapsed}
        items={mainMenuItems}
      />
      {/* Analytics başlığı - isCollapsed false ise görünür */}
      {!isCollapsed && <div className="text-xs font-bold text-gray-400 mb-2 mt-2">ANALYTICS</div>}
      <Menu 
        mode="inline" 
        className="border-none bg-transparent flex-grow" 
        style={{ fontWeight: 500 }} 
        inlineCollapsed={isCollapsed}
        items={analyticsItems}
      />
      {/* APPS başlığı - isCollapsed false ise görünür */}
      {!isCollapsed && <div className="text-xs font-bold text-gray-400 mb-2 mt-2">APPS</div>}
      <Menu 
        mode="inline" 
        className="border-none bg-transparent flex-grow" 
        style={{ fontWeight: 500 }} 
        inlineCollapsed={isCollapsed}
        items={appsItems}
      />
      {/* SETTINGS başlığı - isCollapsed false ise görünür */}
      {!isCollapsed && <div className="text-xs font-bold text-gray-400 mb-2 mt-2">SETTINGS</div>}
      <Menu 
        mode="inline" 
        className="border-none bg-transparent flex-grow" 
        style={{ fontWeight: 500 }} 
        inlineCollapsed={isCollapsed}
        items={settingsItems}
      />
    </div>
  );
};

export default MenuContent; 