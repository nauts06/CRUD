import React, { useEffect, useState } from "react";
import "./index.css";

import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const getAllData =()=>{
    axios
    .get("http://localhost:5000/api/getAll")
    .then((response) => {
      console.log("datahhhh", response);
      setData(response.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
  }
  const getOneData =(id)=>{
    axios
    .get(`http://localhost:5000/api/getOne/${id}`)
    .then((response) => {
       setEditData(response.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
  }

  useEffect(() => {
    getAllData()
  }, []);

  return (
    <div>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values) => {
            axios
              .post("http://localhost:5000/api/post", values)
              .then((response) => {
                getAllData()
              })
              .catch((error) => {
                console.log("error", error);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  type="text"
                  name="email"
                  placeholder="enter mail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <TextField
                  type="text"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>

        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Edit</th>

                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((elem,i) => (
                  <tr key={elem._id}>
                    <th>{i+1}</th>
                    <td>{elem.email}</td>
                    <td>{elem.password}</td>

                    <td>
                      <button className="btn btn-neutral" onClick={()=>getOneData(elem._id)} >Edit</button>{" "}
                    </td>
                    <td>
                      <button className="btn btn-neutral">Delete</button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
