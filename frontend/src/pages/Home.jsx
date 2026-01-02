import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Testimonials from '../components/Testinomials'
import CTASection from '../components/CTASection'


const Home = () => {
  return (
    <div>
        <Hero />
        <HowItWorks />
        <Features/>
        <Testimonials/>
        <CTASection/>
        
    </div>
  )
}

export default Home