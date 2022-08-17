// import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import React from 'react'
import { adddata } from './context/ContextProvider';

const Home = () => {
    const [dataa, setDataa] = useState([])
    const {udata,setUdata} = useContext(adddata)


    const getData = async () => {
        const res = await fetch("https://crud-app-mern1.herokuapp.com/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await res.json()
     


        if (res.status === 422) {
            alert("error");
        }
        else {
            setDataa(result)
            
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteUser = async (id) => {
        const res2 = await fetch(`https://crud-app-mern1.herokuapp.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deleteData = await res2.json()
        if (res2.status === 422 || !deleteData) {
           alert('error')
        } else {
            setUdata({
                deletedata : true
              })
            
            getData()
        }
    }

    return (
        <div>

        {udata?.newdata ? (
            <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Data Created Successfully.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
            </>
        ) : ("")}


        {udata?.updatedata ? (
            <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Data updated Successfully.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
            </>
        ) : ("")}

        {udata?.deletedata ? (
            <>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Deleted!</strong> Data deleted Successfully.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
            </>
        ) : ("")}
      

        <div className='mt-5'>
            <div className="container">
                <div className="add_btn">
                    <NavLink to="/register" className='btn btn-primary mb-2'>Add New</NavLink>
                </div>
                <table class="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">id</th>
                            <th scope="col">Username</th>
                            <th scope="col">email</th>
                            <th scope="col">job</th>
                            <th scope="col">Number</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataa.map((element, id) => (
                            <tr>
                                <th scope="row">{id + 1}</th>
                                <td>{element.name}</td>
                                <td>{element.email}</td>
                                <td>{element.work}</td>
                                <td>{element.mobile}</td>
                                <td className='d-flex justify-content-between'>
                                    <NavLink to={`view/${element._id}`}>
                                        <button className='btn btn-success' ><RemoveRedEyeIcon /></button>
                                    </NavLink>
                                    <NavLink to={`edit/${element._id}`}>
                                        <button className='btn btn-primary' ><EditIcon /></button>
                                    </NavLink>
                                    <button onClick={() => deleteUser(element._id)} className='btn btn-danger' ><DeleteIcon /></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default Home