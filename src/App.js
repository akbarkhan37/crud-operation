import { useEffect, useState } from "react";
import "./App.css";
import { EmployeeData } from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isupdate, setIsupdate] = useState(false);
  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsupdate(true);
      setId(id);
      setFirstname(dt[0].firstname);
      setLastname(dt[0].lastname);
      setAge(dt[0].age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };
  const handleSave = (e) => {
    let error = "";
    if (firstname === "") error += "First name is required, ";
    if (lastname === "") error += "Last name is required, ";
    if (age <= 0) error += "age is required. ";
    if (error === "") {
      e.preventDefault();
      const dt = [...data];
      const newobject = {
        id: EmployeeData.length + 1,
        firstname: firstname,
        lastname: lastname,
        age: age,
      };
      dt.push(newobject);
      setData(dt);
    } else {
      alert(error);
    }
  };
  const handleClear = () => {
    setId(0);
    setFirstname("");
    setLastname("");
    setAge("");
    setIsupdate(false);
  };
  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].firstname = firstname;
    dt[index].lastname = lastname;
    dt[index].age = age;

    setData(dt);
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="text"
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        {!isupdate ? (
          <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
            Save
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => handleUpdate()}>
            Update
          </button>
        )}
        &nbsp; &nbsp;
        <button className="btn btn-danger" onClick={() => handleClear()}>
          Clear
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr. No</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
