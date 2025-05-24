"use client";
import React, { useState } from "react";
import Header from "../sidebar/Header";
import MenuContent from "../sidebar/MenuContent";
import Navigation from "../body/Navigation";
import Overview from "../body/Overview";
import { Grid } from "antd";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  // md breakpoint'inden küçükse mobil olarak kabul et
  const isMobile = !screens.md;
  const isLargeScreen = screens.lg; // lg breakpoint'ini kontrol et
  const isSidebarCollapsed = !isLargeScreen;

  // Sidebar'ın mobil görünümde açık/kapalı durumunu yönetecek state
  // Başlangıçta mobil değilse açık, mobil ise kapalı (hamburger menü kapalı gibi)
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [openKeys, setOpenKeys] = useState(screens.lg ? ["products", "orders"] : []);

  const handleSidebarToggle = () => {
    // Sadece mobil ekranlarda sidebar durumunu değiştir
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  // Sidebar'ın render edilme koşulu:
  // Mobil değilse (md ve üstü) HER ZAMAN render et
  // VEYA mobil ise (md altı) VE sidebar açıksa render et
  const shouldRenderSidebar = !isMobile || isSidebarOpen;

  // İçerik alanı kenar boşluğunu sidebar'ın durumuna göre ayarla
  // Mobil değilse ve sidebar açıksa ml-64, mobil değilse ve sidebar kapalıysa ml-20
  // Mobil ise ve sidebar açıksa ml-20, mobil ise ve sidebar kapalıysa kenar boşluğu yok (zaten sidebar render edilmiyor)
  const contentMarginClass = isMobile ? (isSidebarOpen ? 'ml-20' : '') : (isSidebarCollapsed ? 'ml-20' : 'ml-64');
  const contentClassName = `p-2 sm:p-2 md:p-4 ${contentMarginClass}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar'ı koşullu olarak render et */}
      {shouldRenderSidebar && (
        <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col py-6 z-20 transition-all duration-300 ${isSidebarCollapsed ? 'w-20 px-2' : 'w-64 px-4'} overflow-y-auto`}>
          <Header isCollapsed={isSidebarCollapsed} />
          <div className="mt-6">
            <MenuContent 
              isCollapsed={isSidebarCollapsed}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            />
          </div>
        </aside>
      )}
      {/* İçerik alanı */}
      <div className={contentClassName}> 
        {/* Navigation'a isSidebarOpen ve onSidebarToggle proplarını gönder */}
        {/* isSidebarOpen prop'u Navigation'daki hamburger menünün görünürlüğünü kontrol etmek için kullanılır */}
        {/* onSidebarToggle prop'u hamburger menüye basıldığında sidebar'ı açıp kapatmak için kullanılır */}
        <Navigation isSidebarOpen={isSidebarOpen} onSidebarToggle={handleSidebarToggle} />
        <div className="mt-2">
          <Overview isSidebarCollapsed={isSidebarCollapsed} />
          <main className="mt-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 