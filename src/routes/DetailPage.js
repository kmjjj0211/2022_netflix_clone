import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/SearchPage.css';

function DetailPage() {
  const [movie, setMovie] = useState({});

  // params값을 가져오는 훅 함수
  let {movieId} = useParams();

 // console.log("movieId",movieId);
 // console.log("useParams()",useParams());

  const fetchData = async() => {
    const request = await axios.get(`/movie/${movieId}`)
   console.log("request",request);
    setMovie(request.data)
  }

  useEffect(()=>{
    fetchData();
  },[movieId])

  if(!movie) return <div>...loading</div>
  return (
    <section>
      <img className='modal__poster_img'
           src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
           alt="poster" />
      <div className='movie_info_text'>
        <p className='movie_info_title'>{movie.title || movie.name || movie.original_name}</p>
        <p className='green'><span>평점</span>:{movie.vote_average}</p>
        <p className='red'><span>추천</span>:{movie.vote_count}</p>
        <p className='movie_info_overview'>{movie.overview}</p>
      </div>
      
    </section>
  )
}

export default DetailPage