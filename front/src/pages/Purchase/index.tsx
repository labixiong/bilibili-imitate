import React, { useEffect, useRef } from 'react'
import Map from '../../components/Map'

const w: any = window

export default function Purchase() {
  let geolocation = useRef(null)

  const maoConfig = {
    viewMode: '3D',
    zoom: '11',
    center: []
  }

  useEffect(() => {
    console.log(w.AMap.Geolocation, 'purchase');
  })

  function handleMap(map: any) {
    console.log(map, 'map');
  } 

  return (
    <div>
      <Map mapConfig={maoConfig} getMap={handleMap}></Map>
    </div>
  )
}
