import './Sidebar.css'
import SidedbarItem from './SidebarItem';
import koreanFood from '../../../assets/korean.png'
import chineseFood from '../../../assets/chinese.jpg'
import americanFood from '../../../assets/american.jpg'
import japaneseFood from '../../../assets/japanese.jpg'
import drink from '../../../assets/drink.png'
import { sidebarItems } from '../../../context/SidebarContext';

const sidebarMenus = [
    {
        title: '한식',
        value: sidebarItems['korean'],
        icon: koreanFood
    },
    {
        title: '중식',
        value: sidebarItems['chinese'],
        icon: chineseFood
    },
    {
        title: '양식',
        value: sidebarItems['american'],
        icon: americanFood
    },
    {
        title: '일식',
        value: sidebarItems['japanese'],
        icon: japaneseFood
    },
    {
        title: '술집',
        value: sidebarItems['drink'],
        icon: drink
    }
]

const Sidebar = () => {
    return <div className="sidebar-container">
        {
            sidebarMenus.map(_ => <SidedbarItem key={_.value} title={_.title} icon={_.icon} value={_.value}/>)
        }
    </div>
}

export default Sidebar;