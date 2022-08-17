import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Card, CardContent } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { adddata } from './context/ContextProvider';

const Details = () => {
  const {setUdata} = useContext(adddata)
  const [userr,setUser] = useState([])
  const {id} = useParams("")
  const navigate = useNavigate()

  const getUser = async()=>{
    const result = await fetch(`https://crud-app-mern1.herokuapp.com/getuser/${id}`,{
      method : "GET",
      headers: {
        "Content-Type" : "application/type"
      }
      
    })

    const data = await result.json()
    if(result.status === 422 || !data){
      alert("error");
    }
    else{
      setUser(data)
    }

  }

  const deleteUser = async (id) => {
    const res2 = await fetch(`https://crud-app-mern1.herokuapp.com/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const deleteData = await res2.json()
    if (res2.status === 422 || !deleteData) {
       alert("error");
    } else {
      setUdata({
        deletedata : true
      })
        alert("user deleted");
        navigate("/")
       
    }
}



  useEffect(()=>{
getUser()
  },[])
  return (
    <div className='container mt-3'>
        <h1 style={{fontWeight : 400}}>{userr.name}</h1>
        <Card sx={{ maxWidth:600}}>
             <CardContent>
             <div className="row">
                <div className="add_btn ">
              
                               <NavLink to={`/edit/${userr._id}`}>
                               <button className='btn btn-primary mx-2' ><EditIcon/></button>
                               </NavLink> 
                                <button onClick={() => deleteUser(userr._id)} className='btn btn-danger' ><DeleteIcon/></button>
                </div>

                <div className="left_view col-lg-6 col-md-6 col-12 ">
                    <img src="/profile.jpg" style={{width: 50}} alt="profile" />
                    <h3 className='mt-3'> Name : <span> {userr.name}</span></h3>
                    <h3 className='mt-3'> Age : <span>{userr.age}</span></h3>
                    <p><EmailIcon/>Email : <span>{userr.email}</span></p>
                    <p><WorkIcon/>Occupation : <span>{userr.work}</span></p>
                </div>
                <div className="right_view col-lg-6 col-md-6 col-12">
                <p className="mt-5"><MobileFriendlyIcon/>Mobile : <span>{userr.mobile}</span></p>
                <p className="mt-3"><LocationOnIcon/>Location : <span>{userr.address}</span></p>
                <p className="mt-3">Description : <span>{userr.desc}</span></p>

                </div>
             </div>
             </CardContent>

        </Card>
    </div>
  )
}

export default Details