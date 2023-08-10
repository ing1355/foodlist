import { useEffect, useRef } from 'react'
import './Contents.css'

const Contents = () => {
    const container = useRef(null)
    useEffect(() => {
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        var map = new window.kakao.maps.Map(container.current, options);
    }, [])
    return <div className='content-container' ref={container}>
    </div>
}

export default Contents