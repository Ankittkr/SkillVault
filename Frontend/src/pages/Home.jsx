import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ExploreCourses from '../components/ExploreCourses'
import Card from '../components/Card'
import CardPage from '../components/CardPage'
import { About } from '../components/About'
import { Footer } from '../components/Footer'
import ReviewPage from '../components/ReviewPage'

const Home = () => {
  
  const exploreRef = useRef(null);

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className='w-[100%]'>
      <div className='w-[100%] fixed top-0 z-50'>
        <Navbar/>
      </div>
      <HeroSection scrollToExplore={scrollToExplore}/>
      <div  ref={exploreRef}>

      <ExploreCourses/>
      <CardPage/>
      <About/>
      <ReviewPage/>
      <Footer/>
      </div>
    </div>
  )
}

export default Home