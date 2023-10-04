import { useContext, useEffect, useRef, useState } from 'react'
import './Contents.css'
import Markers from './Markers'

const Contents = () => {
    const [kakao, setKakao] = useState(null)
    const container = useRef(null)
    
    useEffect(() => {
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        setKakao(new window.kakao.maps.Map(container.current, options))
        var ps = new window.kakao.maps.services.Places();
        ps.keywordSearch('요이텐', (data, status, pagination) => {
            console.log(data, status, pagination.nextPage())
        });
    }, [])
    return <>
        <div className='content-container' ref={container}>
        </div>
        <Markers kakao={kakao}/>
    </>
}

export default Contents