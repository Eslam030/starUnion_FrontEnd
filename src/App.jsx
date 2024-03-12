import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home'
import Title from './Components/Title/Title';
import About_us from './Components/About_us/About_us';
import Sponsors from './Components/Sponsors/Sponsors';
import Event from './Components/Events/Event';
import Contact from './Components/Contact/Contact';
import Workshop from './Components/Workshops/Workshop';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
        <Home />
        {/* <Title subTitle="About Us" title="Get to know about us and relive our journey" /> */}
        <About_us />
        <Sponsors />
        <Event />
        <Workshop />
        <Contact />
        <Footer />
    </div>
  );
}

export default App