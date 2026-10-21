import { useSidebar } from "@/context/SidebarContext";

const Backdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-gray-dark/50 xl:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
