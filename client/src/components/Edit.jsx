import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { adddata } from './context/ContextProvider'

const Edit = () => {
  const {setUdata} = useContext(adddata)
  const navigate = useNavigate("")
  const { id } = useParams("")
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: "",


  })

  const getData = async () => {


    const result = await fetch(`https://crud-app-mern1.herokuapp.com/getuser/${id}`, {
      method: "GET",
      header: "Content-Type : application/type"

    })

    const dataa = await result.json()
    if (result.status === 422 || !data) {
      alert("error");
    } else {
      setData(dataa)
   
    }
  }

  const handleForm = (e) => {
   
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }

    })
  }

  const updateUser =  async(e)=>{
    e.preventDefault()

    const {name,email,address,mobile,age,work,desc} = data

    const result = await fetch(`https://crud-app-mern1.herokuapp.com/updateuser/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name,email,address,mobile, age,work,desc
      })
    })

    const data2 = await result.json()
    if(result.status === 422 || !data2){
      alert("error")
    }else{
      setUdata({
        updatedata : true
      })
      alert("data updated")
      navigate("/")
    }
  }

  useEffect(() => {
    getData()
  }, [])
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
            <label for="exampleInputPassword1" class="form-label">Age</label>
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

          <button type="submit" onClick={updateUser} class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Edit