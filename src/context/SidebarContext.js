import { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext({
    selectedSidebar: null,
    setSelectedSidebar: () => { }
});

export const sidebarItems = {
    korean: 'KOREAN',
    chinese: 'CHINESE',
    american: 'AMERICAN',
    japanese: 'JAPANESE',
    drink: 'DRINK'
}

const SidebarProvider = ({children}) => {
    const [selectedSidebar, setSelectedSidebar] = useState(sidebarItems['korean'])
    const value = useMemo(() => ({ selectedSidebar, setSelectedSidebar }),[selectedSidebar])
    
    return <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider>
}

export default SidebarProvider