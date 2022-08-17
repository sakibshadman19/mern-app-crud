import React, { useContext } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { adddata } from './context/ContextProvider'

const Register = () => {

  const {udata,setUdata} = useContext(adddata)
  const navigate = useNavigate("")
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",


  })

  const handleForm = (e) => {
    
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }

    })
  }


  const addData = async(e)=>{
      e.preventDefault()
      const {name,email,age,mobile,work,address,desc} = data

      const res = await fetch("https://crud-app-mern1.herokuapp.com/register",{
        method: "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          name,email,age,mobile,work,address,desc
        })
      })

      const dataFile =  await res.json()
      


      if(res.status === 422 || !dataFile){
        alert("error")
      
      }else{
        setUdata({newdata : dataFile})
        alert("data added")
        navigate("/")
      }
  }




  return (
    <div className='container'>
      <NavLink to="/">Home</NavLink>
      <form className='mt-5'>
        <div className="row">

          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" class="form-control" name='name' onChange={handleForm} value={data.name} id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Email</label>
            <input type="email" class="form-control" name='email' onChange={handleForm} value={data.email} id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">age</label>
            <input type="text" class="form-control" name='age' onChange={handleForm} value={data.age} id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Mobile</label>
            <input type="number" class="form-control" name='mobile' onChange={handleForm} value={data.mobile} id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Work</label>
            <input type="text" class="form-control" name='work' onChange={handleForm} value={data.work} id="exampleInputPassword1" />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Address</label>
            <input type="text" class="form-control" name='address' onChange={handleForm} value={data.address} id="exampleInputPassword1" />
          </div>

          <div class="mb-3 col-lg-12 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Description</label>
            <textarea className='form-control' name='desc' onChange={handleForm} value={data.desc} id='' cols="30" rows="10" />

          </div>

          <button type="submit" onClick={addData} class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register