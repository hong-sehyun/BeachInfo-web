import { useState, useEffect, useRef, React } from 'react'
import Maindiv from './Maindiv';
import Home from './Home';
import Modal from './Modal';
import './home.css'
const MainArticle = ({ item }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  // const KAKAO_API_KEY = '627febc1693dbff48776490bf4ef5a93';
  // const map = useRef(null);
  // const markers = useRef([]);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     const mapContainer = document.getElementById('map');
  //     const mapOption = {
  //       center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //       level: 3,
  //     };
  //     map.current = new window.kakao.maps.Map(mapContainer, mapOption);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!map.current) return; 
  //   markers.current.forEach(marker => marker.setMap(null));
  //   markers.current = [];


  //   const filteredData = sosMapData.filter(item => item.city1 === city1Ref.current.value);

  //   filteredData.forEach(item => {
  //     const position = new window.kakao.maps.LatLng(item.lat, item.long);
  //     const marker = new window.kakao.maps.Marker({
  //       position: position,
  //     });
  //     marker.setMap(map.current);
  //     markers.current.push(marker);
  //   });
  // }, [sosMapData, city1Ref]);

  return (

    <article>
      <header>
        <hgroup>
          <h2>{item.beach} 해수욕장</h2>
          <h3>{item.address}</h3>
        </hgroup>
      </header>
      <div>
        <ul>
          <li>개장일 {item.open}</li>
          <li>폐장일 {item.close}</li>
        </ul>
        <div>
          <a onClick={handleModalOpen}>자세히</a>

          {isModalOpen && (
            <div id="modalContainer">
              <div id="modalContent">
                <h2>{item.beach} 해수욕장</h2>
                <p>{item.address}</p>
                <div className='kakaoMap'></div>
                <button onClick={handleModalClose}>닫기</button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {showModal && <Modal onClose={handleModalClose} item={item} />} */}
    </article>
  )
}

export default MainArticle