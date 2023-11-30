import React from 'react'
import Header from './Header/index'
import Content from './Content'
import RouteConfig from '../router/index'

export default function Layout() {
  return (
    <div>
      <div className='header'>
        <Header></Header>
      </div>
      <div className="content">
        <Content>
          <RouteConfig></RouteConfig>
        </Content>
      </div>
    </div>
  )
}

