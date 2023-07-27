import React, { useEffect } from 'react';
import SosLoc from '../../Data/SOSLocation.json'
import './home.css'
const SosMap = () => {
    const data = SosLoc;
    useEffect(() => {
        // Kakao Maps API key, replace with your actual API key
        const KAKAO_API_KEY = '627febc1693dbff48776490bf4ef5a93';

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            const positions = [
                {
                    title: '카카오',
                    latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
                },
                {
                    title: '생태연못',
                    latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
                },
                {
                    title: '텃밭',
                    latlng: new window.kakao.maps.LatLng(33.450879, 126.569940),
                },
                {
                    title: '근린공원',
                    latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
                },
            ];

            const imageSrc =
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

            for (let i = 0; i < positions.length; i++) {
                const imageSize = new window.kakao.maps.Size(24, 35);
                const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: positions[i].latlng,
                    title: positions[i].title,
                    image: markerImage,
                });
            }
        };
    }, []);

    return (
        <article  id='sosmap'>
            <header><h2>인명구조함 위치</h2></header>
            <div id="map" style={{ width: '100%', height: '350px' }} />
        </article>

    )
};

//   return (
//     <main>

// <div>SosMap</div>
//     <div id="map" style="width:100%;height:350px;"></div>

//     </main>

//   )
// }

export default SosMap