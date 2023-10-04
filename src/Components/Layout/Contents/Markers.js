import { useContext, useEffect } from "react"
import Korean from "../../../Foods/Korean"
import { SidebarContext, sidebarItems } from '../../../context/SidebarContext'
import Japanese from "../../../Foods/Japanese"
import Chinese from "../../../Foods/Chinese"
import Drink from "../../../Foods/Drink"
import noImage from '../../../assets/noImage.gif'
import American from "../../../Foods/American"

const koreanMarkers = []
const americanMarkers = []
const japaneseMarkers = []
const chineseMarkers = []
const drinkMarkers = []

let currentInfoWindow
let currentOverlay

window.closeOverlay = () => {
    currentOverlay.setMap(null)
}

const Markers = ({ kakao }) => {
    const { selectedSidebar } = useContext(SidebarContext)

    const createMarker = (data) => {
        const position = new window.kakao.maps.LatLng(data.y, data.x)
        const marker = new window.kakao.maps.Marker({
            position,
            clickable: true,
            map: kakao
        })
        const overlay = new window.kakao.maps.CustomOverlay({
            position
        })
        const content = `<div class="wrap">
            <div class="info">
                <div class="title">
                    ${data.place_name}
                    <div class="close" onclick="closeOverlay()" title="닫기"></div>
                </div>
                <div class="body"> 
                    <div class="img">
                        ${data.imgs.length > 0 ? data.imgs.map(_ => `
                        <img src="${_}" width="100%" height="100%">
                    `) : `<img src="${noImage}" width="100%" height="100%">`}
                   </div>
                    <div class="desc">
                        <div class="description">${data.description}</div>
                        <div class="address">주소 : ${data.road_address_name}</div>
                    </div> 
                </div>
            </div>  
        </div>`;
        overlay.setContent(content)
        window.kakao.maps.event.addListener(marker, 'click', function() {
            console.log(currentOverlay)
            if(currentOverlay) currentOverlay.setMap(null)
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(position)
            kakao.setBounds(bounds)
            overlay.setMap(kakao)
            currentOverlay = overlay
      });
        return marker
    }

    useEffect(() => {
        if (kakao) {
            console.log('init')
            const bounds = new window.kakao.maps.LatLngBounds();
            American.forEach(_ => {
                const marker = createMarker(_)
                marker.setVisible(false)
                americanMarkers.push(marker)
            })
            Chinese.forEach(_ => {
                const marker = createMarker(_)
                marker.setVisible(false)
                chineseMarkers.push(marker)
            })
            Japanese.forEach(_ => {
                const marker = createMarker(_)
                marker.setVisible(false)
                japaneseMarkers.push(marker)
            })
            Drink.forEach(_ => {
                const marker = createMarker(_)
                marker.setVisible(false)
                drinkMarkers.push(marker)
            })
            Korean.forEach(_ => {
                const marker = createMarker(_)
                koreanMarkers.push(marker)
                bounds.extend(marker.getPosition())
            })
            kakao.setBounds(bounds)
        }
    }, [kakao])

    useEffect(() => {
        if (kakao) {
            let markers
            let otherMarkers
            let bounds = new window.kakao.maps.LatLngBounds();
            switch (selectedSidebar) {
                case sidebarItems['american']:
                    markers = americanMarkers
                    otherMarkers = [...koreanMarkers, ...japaneseMarkers, ...chineseMarkers, ...drinkMarkers]
                    break;
                case sidebarItems['japanese']:
                    markers = japaneseMarkers
                    otherMarkers = [...koreanMarkers, ...americanMarkers, ...chineseMarkers, ...drinkMarkers]
                    break;
                case sidebarItems['chinese']:
                    markers = chineseMarkers
                    otherMarkers = [...koreanMarkers, ...americanMarkers, ...japaneseMarkers, ...drinkMarkers]
                    break;
                case sidebarItems['drink']:
                    markers = drinkMarkers
                    otherMarkers = [...koreanMarkers, ...americanMarkers, ...japaneseMarkers, ...chineseMarkers]
                    break;
                case sidebarItems['korean']:
                default:
                    markers = koreanMarkers
                    otherMarkers = [...americanMarkers, ...japaneseMarkers, ...chineseMarkers, ...drinkMarkers]
                    break;
            }
            markers.forEach(_ => {
                _.setVisible(true)
                bounds.extend(_.getPosition())
            })
            otherMarkers.forEach(_ => {
                _.setVisible(false)
            })
            if (!bounds.isEmpty()) kakao.setBounds(bounds)
            if(currentOverlay) currentOverlay.setMap(null)
        }
    }, [selectedSidebar])

    return <></>
}

export default Markers