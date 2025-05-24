"use client";
import React from "react";
import { Grid } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface OverviewProps {
  isSidebarCollapsed: boolean;
}

const Overview: React.FC<OverviewProps> = ({ isSidebarCollapsed }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobileOrTablet = !screens.lg || isSidebarCollapsed;

  const stats = [
    { label: "Active Products", value: "247,384", change: "+15%", color: "#52c41a", icon: <ArrowUpOutlined style={{ color: '#52c41a' }} /> },
    { label: "New Products", value: "+2,368", change: "+2%", color: "#52c41a", icon: <ArrowUpOutlined style={{ color: '#52c41a' }} /> },
    { label: "Completed Order", value: "33,847", change: "-4.5%", color: "#ff4d4f", icon: <ArrowDownOutlined style={{ color: '#ff4d4f' }} /> },
    { label: "Pending Payment", value: "1,284", change: "+5%", color: "#52c41a", icon: <ArrowUpOutlined style={{ color: '#52c41a' }} /> },
    { label: "Canceled Order", value: "836", change: "-2%", color: "#ff4d4f", icon: <ArrowDownOutlined style={{ color: '#ff4d4f' }} /> },
  ];

  return (
    <>
      {isMobileOrTablet && (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 w-full mb-4">
          <div className="text-xl text-[#222] font-bold mb-1">Products</div>
          <div className="text-gray-400 text-sm">Manage your products</div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 w-full">
            <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-[#222] mb-1">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: stat.change.startsWith('+') ? '#52C41A' : '#FF4D4F' }}>
              {stat.icon} {stat.change}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Overview; 