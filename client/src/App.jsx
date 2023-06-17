import React, { useEffect, useState } from "react";
import "./index.css";

import { Formik, useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState("");

  const getAllData = () => {
    axios
      .get("http://localhost:5000/api/getAll")
      .then((response) => {
        console.log("datahhhh", response);
        setData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);
  // let {setValues} = useFormik()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (toggle === true) {
        axios
          .patch(`http://localhost:5000/api/update/${editId}`, values)
          .then((response) => {
            getAllData();
            // formik.setValues("")
            formik.handleReset();
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        axios
          .post("http://localhost:5000/api/post", values)
          .then((response) => {
            getAllData();
            // formik.setValues("")
            formik.handleReset();
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  });

  const getOneData = (id) => {
    setEditId(id);
    setToggle(true);
    axios
      .get(`http://localhost:5000/api/getOne/${id}`)
      .then((response) => {
        // setEditData(response.data);
        formik.setValues(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const getDataDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then((response) => {
        getAllData();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const goBack = () => {
    setToggle(false);
    formik.handleReset();
  };

  return (
    <div>
      {toggle === true ? (
        <h1 className="text-[34px] text-center">Edit Data</h1>
      ) : (
        <h1 className="text-[34px] text-center">Add Data</h1>
      )}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-[2%]  text-center">
            <div>
              <TextField
                type="text"
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <TextField
                type="text"
                name="password"
                placeholder="Enter Number"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => goBack()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-8 w-[80%] m-auto">
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
                {data.map((elem, i) => (
                  <tr key={elem._id}>
                    <th>{i + 1}</th>
                    <td>{elem.email}</td>
                    <td>{elem.password}</td>

                    <td>
                      <button
                        className="btn btn-neutral"
                        onClick={() => getOneData(elem._id)}
                      >
                        Edit
                      </button>{" "}
                    </td>
                    <td>
                      <button
                        className="btn btn-neutral"
                        onClick={() => getDataDelete(elem._id)}
                      >
                        Delete
                      </button>{" "}
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
