import video from '../../Assets/homevideo.mp4'
import './home.css'
import { useState, useEffect, useRef, React } from 'react'
import Maindiv from './Maindiv';
import binfo from "../../Data/beachesinfo.json";
//import SosMap from './SosMap';
import SosLoc from '../../Data/SOSLocation.json'
const Home = () => {

  const data = binfo;

  // const [sosMapData, setSosMapData] = useState([]);
  const sosMapData = SosLoc;

  const [dtlist, setDtlist] = useState([]);
  const [cities1, setCities1] = useState([]);
  const [selCity1, setSelCity1] = useState('');
  const [cities2, setCities2] = useState([]);
  const [selCity2, setSelCity2] = useState('');

  const city1Ref = useRef();
  const city2Ref = useRef();

  useEffect(() => {
    const newCities1 = [...new Set(data.map(item => item.city1))];
    setCities1(newCities1);
  }, [data]);

  useEffect(() => {
    const newCities2 = [...new Set(data.filter(item => item.city1 === selCity1).map(item => item.city2))];
    setCities2(newCities2);
  }, [selCity1, data]);

  


  const show = (e) => {
    const city1Val = encodeURI(city1Ref.current.value);
    const city2Val = encodeURI(city2Ref.current.value);


    e.preventDefault();
    if (!city1Val || !city2Val) return;

    const url = `http://localhost:8080/beaches?city1=${city1Val}&city2=${city2Val}`;
    console.log(url);

    fetch(url)
      .then((resp) =>
        resp.json()
      )
      .then(data => {
        setDtlist(data);
      })
      .catch(error => {
        console.error(error);
      });


  };





  return (
    <main>

      <div className="container">

        <div className="background-video">
          <video src={video} muted autoPlay loop type="homevideo/mp4"></video>
          <div className='overlay'></div>
        </div>

        <div className="textDiv">
          <span className="smallText">
          </span>
          <h1 className="homeTitle">
          </h1>
        </div>

        <article className="grid">
          <div className='grid'>
            <div className="destinationInput">
              <label htmlFor="city">Search your destination:</label>
              <div className="input flex">
                <select ref={city1Ref} onChange={(e) => setSelCity1(e.target.value)}>
                  <option value="">시 도</option>
                  {cities1.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                <select ref={city2Ref} onChange={(e) => setSelCity2(e.target.value)}>
                  <option value="">시 군 구</option>
                  {cities2.map(town => (
                    <option key={town} value={town}>{town}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="btdiv grid">
              <button onClick={(e) => show(e)}>검색</button>
              <button>취소</button>
            </div>
          </div>
        </article>
        {/* <div>
          <article id='sosmap'>
            <header><h2>인명구조함 위치</h2></header>
            <div id="map" style={{ width: '100%', height: '350px' }} />
          </article>

        </div> */}

        {dtlist && <Maindiv content={dtlist} />}
        {/* {dtlist && <SosMap content={dtlist} />} */}

      </div>
    </main>
  )
}



export default Home