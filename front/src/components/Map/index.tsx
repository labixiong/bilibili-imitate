import { useCallback, useEffect, useRef } from 'react'
import styles from './map.module.scss'
import AMapLoader from '@amap/amap-jsapi-loader'

const w: any = window

interface MapConfig {
  viewMode: string,
  zoom: string,
  center: number[]
}

interface IProps {
  mapConfig: MapConfig,
  getMap: Function
}

export default function Map(props: IProps) {
  let map = useRef(null)
  let getMap = useCallback((current: any) => {
    props.getMap(current)
  }, [props])

  useEffect(() => {
    AMapLoader.load({
      ...w.AMapCommonConfig,
      plugins: w.AMapPlugins
    }).then((AMap) => {
      map.current = new AMap.Map('map', {
        viewMode: props.mapConfig.viewMode,
        zoom: props.mapConfig.zoom,
        center: props.mapConfig.center,
        resizeEnable: true
      })
    }).catch(e => {
      console.log(e, 'Map Error');
    })

    getMap(map.current)

  }, [props.mapConfig, getMap])

  // function handleMap(map: any) {
  //   props.getMap(map)
  // }

  return (
    <div className={styles.container}>
      <div id='map'></div>
    </div>
  )
}
