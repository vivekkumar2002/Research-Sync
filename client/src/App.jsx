import React from 'react'
import TextEditor from './components/TextEditor'
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Signup from './components/authentication/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/UserProfie/Profile';
import Price from './components/pricing/price';
import {v4 as uuidV4} from 'uuid'
import Login from './components/authentication/Login';
import LandingPage from './components/landing/LandingPage';
import QuillEditor from './components/segmentation/QuillEditor';
import SearchOp from './components/searchquery/SearchOp';
import Logbook from './components/logbook/Logbook';
import Project from './components/createProject/Project';
import { useEffect,useState } from 'react';


export default function App() {

const [roomId,setRoomId] = useState('')


  useEffect(()=>{

    function getData(){
setRoomId(uuidV4())
    }
getData()
  },[])
  


  return (
    <div>
       <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/text" element={<Navigate to={`/text/documents/${roomId}`}/>}></Route>
        
        <Route path='/text/documents/:id' element={ <TextEditor/>}/>
         
        
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/price" element={<Price />} />
        <Route path="/login" element={<Login />} />
        <Route path="/segment" element={<QuillEditor />} />
        <Route path="/search" element={<SearchOp />} />
        <Route path="/logbook/:documentId" element={<Logbook/>} />
        <Route path="/project" element={<Project/>} />
        
        
        
        </Routes>
       </Router>
    
    </div>
  )
}
