import React from 'react'
import Banner from '../components/Banner';
import Row from '../components/Row';
import requests from '../api/requests'

function MainPage() {
  return (
    <div>
      <Banner />
      <Row title="NETFLIX OROGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
      <Row title="Animation Movie" id="AM" fetchUrl={requests.fetchAnimationMovies}/>
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies}/>
      <Row title="Adventure Movies" id="DM" fetchUrl={requests.fetchAdventureMovies}/>
      <Row title="Science Fiction Movies" id="SM" fetchUrl={requests.fetchScienceFictionMovies}/>
      <Row title="Action" id="CM" fetchUrl={requests.fetchAction}/>
    </div>
  )
}

export default MainPage