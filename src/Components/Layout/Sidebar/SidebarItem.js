import { useContext } from "react"
import { SidebarContext } from "../../../context/SidebarContext"

const SidedbarItem = ({title, icon, value}) => {
    const { selectedSidebar, setSelectedSidebar } = useContext(SidebarContext)
    
    return <div className={"sidebar-item-container" + (selectedSidebar === value ? ' selected' : '')} onClick={() => {
        setSelectedSidebar(() => value)
    }}>
        <img src={icon} style={{
            height: 'calc(100% - 16px)',
            objectFit: 'contain'
        }}/>
        <div style={{
            height: '16px'
        }}>
        {title}
        </div>
    </div>
}

export default SidedbarItem