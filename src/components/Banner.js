import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import '../styles/Banner.css'
import styled from 'styled-components';
import MovieModal from './MovieModal';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [modlaOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelceted] = useState({});

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelceted(movie);
    }

    useEffect(()=>{
        fetchData();
    },[])

    // 영화 정보를 가져오는 함수
    const fetchData = async() => {
        //현재 상영중인 영화정보 가져오기(20개의 영화)
        const request = await axios.get(requests.fetchNowPlaying);
        //console.log(request);

        // axios로 가져온 data 속성 안에 requests안에 영화 객체(랜덤으로 객체번호 가져오기)의 id
        const movieId = request.data.results[
            // 소수점 절삭(랜덤수 구하기() * 데이터객체갯수 + 시작 숫자 (0이라 사실 없어도 무관))
            Math.floor(Math.random() * request.data.results.length + 0)
        ].id;

        //특정 영화의 더 상세한 정보를 가져오기(videos :비디오 정보도 포함)
        //movieId 여기까지만 가져오면 videos의 정보는 없음.
        const {data:movieDetail} = await axios.get(`movie/${movieId}`,{
            //append_to_response : params의 속성 중 하나. movieId의 videos를 하나 더 추가해서 가져오라.
            params:{append_to_response: "videos"}
        });
        // console.log("movieDetail",movieDetail);
        setMovie(movieDetail)
    }

    const truncate = (str, n) => {
        // str : movie.overview(영화소개글) > 100보다 크면
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
if(!isClicked){
  return (
    <header className='banner'
            style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie.title || movie.name || movie.original_name}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
                <button className='banner__button info' onClick={()=> handleClick(movie)}>More Information</button>
            </div>
            {modlaOpen && (
            <MovieModal 
                {...movieSelected}
                // setModalOpen의 true값을 전달해줌.
                setModalOpen={setModalOpen}
            />
        )}
            <p className='banner__description'>
                {truncate(movie.overview, 100)}
            </p>
        </div>
        <div className='banner__fadeBottom'></div>
    </header>
  )}else{
    return (
        <Container>
            <HomeContainer>
                <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" title='Yoytube video player' allowfullscreen></Iframe>
            </HomeContainer>
        </Container>
    )
  }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;
const Iframe = styled.iframe`
position: relative; left: 50%;
transform: translateX(-50%);
    width: 640px;
    height: 360px;
    z-index: 1;
    opacity: 0.65;
    border: none;
    &::after{
        content:"";
        position: absolute; top:0; left:0;
        width: 100%;
        height: 100%;
    }
`;
export default Banner