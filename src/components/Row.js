import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import '../styles/Row.css';
import MovieModal from './MovieModal';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({isLargeRow, title, id, fetchUrl}) {
    const [movies, setMovies] = useState([]);
    // 영화정보 디테일
    const [modlaOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelceted] = useState({})

    useEffect(() => {
        fetchMovieData();
    },[fetchUrl]);

    const fetchMovieData = async() => {
        const request = await axios.get(fetchUrl);
        //console.log("request",request)
        setMovies(request.data.results);
    }

    // 무비 객체 전달.
    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelceted(movie);
    }

  return (
    <section className='row' key={id}>
        <h2>{title}</h2>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} /* loop기능을 사용할건지 */
        breakpoints={{
            1378: { // 해상도
                slidesPerView: 6, // 한번에 보이는 슬라이드갯수 
                slidesPerGroup: 6, // 몇개씩 슬라이드 할것인지.
            },
            998: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            625: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            0: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }
        }}
        navigation
        pagination={{ clickable: true }} //페이지 버튼 보이게 할지
    >
        {/* <div className='slider'> */}
            {/* <div className='slider__arrow left'>
                <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft -= window.innerWidth - 80;}}>{"<"}</span>
            </div> */}
            <div id={id} key={id} className="row__posters">
                {movies.map(movie => (
                    <SwiperSlide>
                        <img key={movie.id} 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}  
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title || movie.name || movie.original_name} 
                        onClick={()=> handleClick(movie)}/>
                    </SwiperSlide>
                ))}        
            </div>
            {/* <div className='slider__arrow right'>
                <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft += window.innerWidth - 80;}}>{">"}</span>
            </div> */}
        {/* </div> */}
      </Swiper>
        {modlaOpen && (
            <MovieModal 
                {...movieSelected}
                // setModalOpen의 true값을 전달해줌.
                setModalOpen={setModalOpen}
            />
        )}
    </section>
  )
}

export default Row