import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Game from '../Rock-Paper-Scissor/Game'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Game />} />
    </Routes>
  )
}

export default AllRoutes
