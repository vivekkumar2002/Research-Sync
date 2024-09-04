import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Project() {
    const history = useNavigate();
  const [input, setInput] = useState('');
  const [projName,setProjName] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [projData, setProjData] = useState([]); 

  const [error, setError] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleProj = (e) => {
    setProjName(e.target.value);
    setError('');
  };
  


  const storeDataInLocal = async() => {
    sessionStorage.setItem('roomID',JSON.stringify({input,projName}));
    const email = sessionStorage.getItem('email')
    const data = {email,projectId:input,projectName:projName}
    console.log("data!!!!",data)
    await axios.post('http://localhost:4000/api/v1/storeProject',data)
    history('/text')
};




useEffect(()=>{
async function getProjectDetails(){
  const res = await axios.post('http://localhost:4000/api/v1/getProject',{email:sessionStorage.getItem('email')})
  if(res?.data)
  {

    setProjData([...projData,...res.data])
    
  }
  console.log(projData)
}
   getProjectDetails()
},[])



  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-cover" style={{backgroundImage: "url('https://img.freepik.com/free-vector/vintage-science-education-background_23-2148483429.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=ais_user')"}}>
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-lg bg-opacity-90 backdrop-blur-sm">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Research Sync</h2>
        <div className="mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="Enter room ID"
            className="w-full px-4 py-2 bg-white bg-opacity-75 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={projName}
            onChange={handleProj}
            placeholder="Project Name *"
            className="w-full px-4 py-2 mt-2 bg-white bg-opacity-75 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
        </div>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button type='button'
            onClick={storeDataInLocal}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </button>
          <Link
            to={`/text/documents/${input}`}
            className="flex-1 px-4 py-2 text-center text-white transition duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Join Room
          </Link>
        </div>

        <div className='mt-3'>
          <strong>My Projects</strong>
         {projData.map((data,index)=>{
           return(
             <div key={index} className='flex items-center justify-between mt-2'>
               <div className='' >{data.projectName}</div>
               
               <Link to={`/text/documents/${data.projectId}`}   className=" mx-[63px] flex-1 px-4 py-2 text-center text-white transition duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Join Room</Link>
             </div>
          )
         })}
        </div>
      </div>
    </div>
  );
}




//   const handleCreateProject = async () => {
//     if (!input.trim()) {
//       setError('Please enter a room ID');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.post('http://localhost:4000/api/v1/send', { roomId: input });
//       console.log('Room created:', response.data);
//       setInput('');
//       setError('');
//       // You might want to add a success message or redirect here
//     } catch (error) {
//       console.error('Error creating room:', error);
//       setError('Failed to create room. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };