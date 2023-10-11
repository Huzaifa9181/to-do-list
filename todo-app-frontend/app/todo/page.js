"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from "./../Components/toDolist.css";

const page = () => {
  const [data , Setdata] = useState([]);
  const [Title , setTitle] = useState('');
  const [Description , setDescription] = useState('');
  const [Id , setId] = useState(0);
  const [deletedRowId, setDeletedRowId] = useState(null);

  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/to_do_list/list');
    const data = res.data;
    Setdata(data);
  }

  const deleteData = async (id) => {
    setDeletedRowId(id);
    const res = await axios.get('http://127.0.0.1:8000/api/to_do_list/delete/' + id);
    const data = res.data;
    Setdata(data);
    setTimeout(() => {
      getData();
      setDeletedRowId(null);
    }, 10);
  }

  const storeRecord = async (id) => {
    if (Id == 0) {
      const value = {
        title: Title,
        description: Description
      };
      const res = await axios.post('http://127.0.0.1:8000/api/to_do_list/store' , value);
      setTitle('');
      setDescription('');
      getData();
    }else{
      const value = {
        title: Title,
        description: Description,
        id: Id,
      };
      const res = await axios.post('http://127.0.0.1:8000/api/to_do_list/update' , value);
      setTitle('');
      setDescription('');
      setId('');
    }
  }
  
  const editData = async (id) => {
    const res = await axios.get('http://127.0.0.1:8000/api/to_do_list/edit/' + id);
    setTitle(res.data.data.title);
    setDescription(res.data.data.description);
    setId(res.data.data.id);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="container">
      <div className="row mt-5 mx-5">
        <div className="col-md-4">
          <label><b>Title</b></label>
          <input type="text" className="form-control" placeholder="Enter Your Title" onChange={(e)=>{setTitle(e.target.value) }}  name="title" value={Title} />
        </div>
        <div className="col-md-4">
          <label><b>Description</b></label>
          <input type="text" className="form-control " placeholder="Enter Your Description" onChange={(e)=>{setDescription(e.target.value) }} value={Description} name="description" />
        </div>
        <div className="col-md-4 mt-4">
          <button className="btn btn-primary" onClick={(e) => {
            e.preventDefault()
            storeRecord({Id})
          }}>Submit</button>
        </div>
      </div>
      <div className="m-5">
        <Table striped className="mt-5" >
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data.map((row) => (
              <tr key={row.id} className={deletedRowId === row.id ? 'fade-out' : ''}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td><span className="flex"><button onClick={(e)=>{
                  e.preventDefault()
                  editData(row.id)
                }} className="btn btn-success">Edit</button><button onClick={(e)=>{
                  e.preventDefault()
                  deleteData(row.id)
                }} className="btn btn-danger mx-2">Delete</button></span></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    </>
  );
}

export default page