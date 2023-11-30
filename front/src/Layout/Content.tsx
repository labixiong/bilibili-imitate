import React from 'react'

export default function Content(props: any) {
  return (
    <div>
      <main>
        {props.children}
      </main>
    </div>
  )
}
