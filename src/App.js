import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import {Typography, Card, CardContent, Grid, TextField, Button} from '@material-ui/core';


const apidata = "https://clientback.vercel.app/customers"

function App() {

  // useEffect(()=> {
  //   async function getStoredData(){
  //     const response = await Axios.get(apidata);
  //     console.log(response)
  //   }
  //   getStoredData();
  // }, [])

  
// const [customers, setCustomers] = useState([]);

//   useEffect(()=>{
//     const fetchData = async () => {
//       const data = await fetch("https://clientback.vercel.app/customers")
//       const json = await data.json();
//     setCustomers(json);
//     };
//     fetchData(); 
//   },
     

//   []);
//   useEffect(()=> {
//     console.log({customers})
//   })

  const [full_name, setName] = useState("");
  const [home_address, setAddress] = useState("");
  const [grass, setGrass] = useState("");
  const [sqft, setSize] = useState(0);

  const [newName, setNewName] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [newGrass, setNewGrass] = useState("")
  const [newSqft, setNewSqft] = useState("")

  const [customerList, setCustomerList] = useState([]);

  const deleteCustomer = (id) => {
    Axios.delete(`http://clientback.vercel.app/delete/${id}`).then((response)=> {
      setCustomerList(customerList.filter((val)=> {
        return val.id != id;
      }))
    })
  }

  const addCustomer = () => {
    Axios.post('https://clientback.vercel.app/create', {
      full_name: full_name, 
      home_address: home_address, 
      grass: grass, 
      sqft: sqft
    }).then(() => {
      setCustomerList([...customerList, {
        full_name: full_name, 
      home_address: home_address, 
      grass: grass, 
      sqft: sqft
      }])
    })
  }

  const getCustomer = async () => {
    const response = await Axios.get('https://clientback.vercel.app/customers');
    if (response.status === 200) {
      setCustomerList(response.data)
    }
  }

  const updateCustomerName = (id) => {
    Axios.put('https://clientback.vercel.app/update', {full_name: newName, id: id}).then((response) => {
      setCustomerList(customerList.map((val)=> {
        return val.id == id ? {id: val.id , full_name: newName, grass: val.grass, home_address: val.home_address, sqft: val.sqft} : val
      }))
    })
  }


  return (
    <div className="App">
      <Typography gutterBottom variant="h4" align="center">
        Customer Information Input
      </Typography>
      <Card style={{maxWidth:450, margin:"0 auto", padding:"20px 5px"}}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid xs={12} item>
              <TextField
                label="Full Name"
                placeholder="Customer Full Name"
                variant="outlined"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Home Address"
                placeholder="Address"
                variant="outlined"
                type="text"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Grass"
                placeholder="Grass Type"
                variant="outlined"
                onChange={(event) => {
                  setGrass(event.target.value);
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Lawn Size in Sqft"
                placeholder="Lawn Size"
                variant="outlined"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                fullWidth
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <Button variant="contained" color="primary" onClick={addCustomer} fullWidth>
                Add Customer
              </Button>
            </Grid>
            <Grid xs={12} item>
              <Button variant="contained" onClick={getCustomer} fullWidth>
                Show Customers
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <div className="Info">
        <label>Full Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <label>Grass Type</label>
        <input
          type="text"
          onChange={(event) => {
            setGrass(event.target.value);
          }}
        />
        <label>Lawn Size (sqft) </label>
        <input
          type="number"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <button onClick={addCustomer}>Add Customer</button>
      </div>
      <div className="Customers">
        <button onClick={getCustomer}>Show Customers</button> */}

        {customerList.map((val, key) => {
          return (
            <div className="customer">
              <div>
                <h3>Name: {val.full_name}</h3>
                <h3>Address: {val.home_address}</h3>
                <h3>Grass type: {val.grass}</h3>
                <h3>Lawn size: {val.sqft}</h3>
              </div>
              <h4>
                <input
                  type="text"
                  placeholder="Name..."
                  className="updateValues"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Address..."
                  className="updateValues"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Turf..."
                  className="updateValues"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Sqft..."
                  className="updateValues"
                  onChange={(event) => {
                    setNewName(event.target.value);
                  }}
                />
                <button
                  className="button2"
                  onClick={() => {
                    updateCustomerName(val.id);
                  }}
                >
                  {" "}
                  Update{" "}
                </button>
                <button
                  className="button3"
                  onClick={() => {
                    deleteCustomer(val.id);
                  }}
                >
                  Delete
                </button>
              </h4>
            </div>
          );
        })}
      </div>
    // </div>
  );
}

export default App;
