import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

const Game = React.lazy(() => import("./Rock-Paper-Scissor/Game"))
const Pomodoro = React.lazy(() => import("./Pomodoro/Pomodoro"))
const Navbar = React.lazy(() => import("./Component/Navbar"));
const LoginPage = React.lazy(() => import("./Component/LoginPage"))
const SignupPage = React.lazy(() => import("./Component/SignupPage"))

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route  path='/login' element={<LoginPage/>}/>
        <Route  path='/signup' element={<SignupPage/>}/>
        <Route  path='/' element={<Game/>}/>
        <Route path='/pomodoro' element={<Pomodoro/>} />
      </Routes>
      {/* <Game/> */}
    </div>
  );
}

export default App;
