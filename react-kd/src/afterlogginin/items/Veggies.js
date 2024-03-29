import React, { useEffect, useState } from 'react'
import Header from '../Header';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import About from '../../About.jsx'

function Veggies() {
    let navigator = useNavigate();
    const token = localStorage.getItem('token')
    const [viewFood, setViewFood] = useState([]); 

    useEffect(()=>{     
      let fetching = ()=>{ 
          fetch('http://localhost:3120/food/food/items/')
          .then(response => response.json())
          .then(data =>{
            if (data.server) {
              setViewFood(data.results)
            } else {
              setViewFood(data.results)
            }
          })
        }
       return ()=> fetching()
      
    }, [])

    let filtering = viewFood.filter((f)=>f.food_type === 'veg')
    const mapping = filtering?.map((food, a)=>{
        return(
    <div className="col-lg-2 col-md mx-3 my-3 p-3 shadow rounded " key={a}>
    <img src="/veg.jpg" className='img-fluid' alt="" /><br /> 
    <h4 className='text-center'> {food.food_name} </h4>
    <small className='text-center'>Type : {food.food_type}</small><hr />
    <p className='text-center'>{food.food_description}</p>
    <div className='example'>
    <h5 className='text'>Price : ₹{food.food_amount}/-</h5>
    <div>
    <button className='btn-sm btn-primary mx-1' onClick={()=>navigator(`/SelectAddress/${food.food_id}`)}>Order</button>
    <button className='btn-sm btn-primary' onClick={()=>{
              let options = {
                  method : 'POST',
                  headers : {'Content-Type' : 'application/json', 'kalyan_header_key' : token}
              }
      
              fetch(`http://localhost:3120/cart/add/${food.food_id}`, options)
              .then(response =>response.json())
              .then(data =>{
                  if (data.server) {
                      alert('item added to cart')
                  } else {
                      navigator('/Cart')
                  }
              })
    }}><AiOutlineShoppingCart /></button>
    </div>
    </div>
      </div>
        )
    })
  return (
    <>
      <Header/>
      <div className='row'>
        {viewFood ? mapping
         :
         <div className="container">
     <div className="text-center">
  <div className="spinner-border m-auto" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
    </div>
         }
      </div>
      <About/>
    </>
  )
}

export default Veggies

