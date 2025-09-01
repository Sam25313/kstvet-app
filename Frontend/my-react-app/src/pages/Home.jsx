import React from 'react'
import Hero from '../components/Hero';
import About from './About';
import Ministries from './Ministries';
import Events from './Events';
import Contact from './Contact';
import Footer from '../components/Footer';
import Sermons from './Sermons';


const Home = () => {
  
  return (
    <div className='pt-16'> 
      <Hero/>
      <About/>
      <Ministries/>
      <Events/>
      <Sermons/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home;
