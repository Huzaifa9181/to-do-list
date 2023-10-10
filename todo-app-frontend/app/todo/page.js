"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';

const page = () => {
  const [data , Setdata] = useState([]);
  const getData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/to_do_list/list');
    const data = res.data;
    Setdata(data);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="m-5">
        <Table striped className="mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td><span className="flex"><a className="btn btn-success">Edit</a><button className="btn btn-danger mx-2">Delete</button></span></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default page