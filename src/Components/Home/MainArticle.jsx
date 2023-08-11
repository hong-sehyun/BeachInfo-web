import { useState, useEffect, useRef, React } from 'react'
import Maindiv from './Maindiv';
import Home from './Home';
import { AiOutlineClose } from 'react-icons/ai'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsMap } from 'react-icons/bs'
import './home.css'
import AOS from "aos";
import "aos/dist/aos.css";
import 'animate.css';

const MainArticle = ({ item }) => {

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimationClass, setModalAnimationClass] = useState('');

  const { kakao } = window
  const handleModalOpen = () => {
    setModalAnimationClass('animate__fadeIn');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setModalAnimationClass('animate__fadeOut');
    setTimeout(() => {
      setIsModalOpen(false);
    }, 100); 
  };

  useEffect(() => {
    if (isModalOpen) {
      // 카카오 맵 API 로드 후 실행할 함수
      const initMap = () => {
        const KAKAO_API_KEY = '627febc1693dbff48776490bf4ef5a93'; // 카카오 맵 API 키
        const mapContainer = document.getElementById('kakaoMap');

        // 주소로 좌표를 검색하는 함수
        const searchAddress = (address) => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(address, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 지도에 표시
              const mapOption = {
                center: coords,
                level: 3,
              };
              const map = new window.kakao.maps.Map(mapContainer, mapOption);
              const marker = new window.kakao.maps.Marker({
                position: coords,
              });
              marker.setMap(map);

              // 인포윈도우로 장소에 대한 설명 표시
              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${item.beach} 해수욕장</div>`,
              });
              infowindow.open(map, marker);
            }
          });
        };

        // 카카오 맵 API 스크립트 로드
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`;
        script.onload = () => searchAddress(`${item.address}`); // item.address를 기반으로 주소를 검색하고 지도 표시
        document.head.appendChild(script);

        // 컴포넌트가 언마운트될 때 스크립트 태그 제거
        return () => {
          document.head.removeChild(script);
        };
      };

      initMap();
    }
  }, [isModalOpen, item.address, item.beach]);

  return (
    <main>
      <article data-aos="fade-up" className='cardArticle'>
        <header>
          <hgroup>
            <h2>{item.beach} 해수욕장</h2>
            <h3><HiOutlineLocationMarker className='locicon' /> {item.address}</h3>
          </hgroup>
        </header>
        <div className='cardBody flex'>
          <span>
            <p>개장일 : {item.open}</p>
            <p>폐장일 : {item.close}</p>
          </span>
          <a onClick={handleModalOpen}><BsMap /> 지도 보기 </a>
        </div>

      </article>
      <div>


        {isModalOpen && (
          <dialog id="modalContainer"  className={`animate__animated ${modalAnimationClass}`}>
            <article id="modalContent">
              <div id='spbt'>
                <AiOutlineClose onClick={handleModalClose} id='closebt' />
              </div>
              <h2>{item.beach} 해수욕장</h2>
              <p>{item.address}</p>
              <div id="kakaoMap" className="kakaoMap" style={{ width: '500px', height: '400px' }}></div>
            </article>
          </dialog>
        )}
      </div>
    </main>
  );
};

export default MainArticle;