import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [full_name, setName] = useState("");
  const [home_address, setAddress] = useState("");
  const [grass, setGrass] = useState("");
  const [sqft, setSize] = useState(0);

  const [newName, setNewName] = useState("")

  const [customerList, setCustomerList] = useState([]);

  const deleteCustomer = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=> {
      setCustomerList(customerList.filter((val)=> {
        return val.id != id
      }))
    })
  }

  const addCustomer = () => {
    Axios.post('http://localhost:3001/create', {
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

  const getCustomer = () => {
    Axios.get('http://localhost:3001/customers').then((response) => {
      setCustomerList(response.data)
    })
  }

  const updateCustomerName = (id) => {
    Axios.put('http://localhost:3001/update', {full_name: newName, id: id}).then((response) => {
      setCustomerList(customerList.map((val)=> {
        return val.id == id ? {id: val.id , full_name: newName, grass: val.grass, home_address: val.home_address, sqft: val.sqft} : val
      }))
    })
  }
  return (
    <div className="App">
      <div className='Info'>
      <label>Full Name</label>
      <input 
      type="text" 
      onChange={(event) => {
        setName(event.target.value);
        }} />
      <label>Address</label>
      <input 
      type="text" 
      onChange={(event) => {
        setAddress(event.target.value);
        }} />
      <label>Grass Type</label>
      <input 
      type="text" 
      onChange={(event) => {
        setGrass(event.target.value);
        }} />
      <label>Lawn Size (sqft) </label>
      <input 
      type="number" 
      onChange={(event) => {
        setSize(event.target.value);
        }} />
      <button onClick={addCustomer} >Add Customer</button>
      </div>
        <div className='Customers'>
      <button onClick={getCustomer}>Show Customers</button>

      {customerList.map((val, key) => {
        return <div className='customer'>
          <div>
           <h3>Name: {val.full_name}</h3> 
           <h3>Address: {val.home_address}</h3> 
           <h3>Grass type: {val.grass}</h3> 
           <h3>Lawn size: {val.sqft}</h3> 
           </div>
           <div> 
            <input type="text" placeholder="Name..."  onChange={(event) => {
        setNewName(event.target.value);
        }} /> 
           <button onClick={() => {updateCustomerName(val.id)}}> Update </button>
           <button onClick={()=> {deleteCustomer(val.id)}}>Delete</button>
           </div>
           </div>
      })}
      </div>
      </div>
  );
}

export default App;
