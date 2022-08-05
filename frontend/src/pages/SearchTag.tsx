import React from 'react'
import GridView from '../components/GridView'

export default function SearchTag() {
  return (
    <div>
      <div className="search-bar">
        <h3>검색창 자리</h3>
      </div>
      <div>
        <GridView />
      </div>
    </div>
  )
}
