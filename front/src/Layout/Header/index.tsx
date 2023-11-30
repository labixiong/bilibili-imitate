import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Channel from './Channel'

export default function Header() {
  return (
    <div className=''>
      <Navbar></Navbar>
      <Banner></Banner>
      <Channel></Channel>
    </div>
  )
}
