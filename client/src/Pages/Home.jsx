import React from 'react'
import NavBar from '../Components/NavBar'
import Hero from '../Components/Hero'
import { JobListing } from '../Components/JobListing'
import { AppDownload } from '../Components/AppDownload'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
        <NavBar></NavBar>
        <Hero></Hero>
        <JobListing></JobListing>
        <AppDownload></AppDownload>
        <Footer></Footer>
    </div>
  )
}

export default Home