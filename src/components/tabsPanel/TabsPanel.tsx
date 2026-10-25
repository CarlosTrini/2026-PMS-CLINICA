import { useState } from "react";

interface Props {
    id: string;
    label: string | React.ReactNode;
    content: React.ReactNode;
}

interface TabsPanelProps {
    tabsData: Props[];
    className?: string;
}

export default function TabsPanel({ tabsData, className = "" }: TabsPanelProps) {
    const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

    const handleTabClick = (id: string) => {
        setActiveTab(id);
    };

    return (
        <section className={`flex flex-col w-full min-h-50 ${className}`}>
            {/* Header de pestañas */}
            <div className="flex gap-x-1 border-b border-gray/20 dark:border-gray/40">
                {tabsData.map((tab) => {
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => handleTabClick(tab.id)}
                            className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-theme-sm font-medium transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${isActive
                                ? "bg-theme-light-dark text-brand dark:text-brand-light font-semibold border-t-2 border-t-brand dark:border-t-brand border-x border-gray/20 dark:border-gray/40 -mb-[1px] z-10 shadow-theme-xs"
                                : "text-gray dark:text-gray-light/70 hover:text-gray-dark dark:hover:text-light-accent hover:bg-gray-light/30 dark:hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Contenedor del contenido */}
            {/* <div className="bg-theme-light-dark flex-1 border border-gray/20 dark:border-gray/40 border-t-0 rounded-b-xl p-4 sm:p-5 shadow-theme-xs text-theme-light-gray">
                {tabsData.map((tab) => {
                    if (tab.id === activeTab) {
                        return (
                            <div key={tab.id} className="h-full w-full">
                                {tab.content}
                            </div>
                        );
                    }
                    return null;
                })}
            </div> */}
            <div className="bg-theme-light-dark flex-1 border border-gray/20 dark:border-gray/40 border-t-0 rounded-b-xl p-4 sm:p-5 shadow-theme-xs text-theme-light-gray">
                {tabsData.map((tab) => (
                    <div
                        key={tab.id}
                        className={`h-full w-full ${tab.id === activeTab ? "block" : "hidden"}`}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>

        </section>
    );
}