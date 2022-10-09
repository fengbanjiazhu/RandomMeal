import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import getKeyValue from './utils/getKeyValue'

export default class App extends Component {
  state ={
    receipt: [],
    Ingredient:[],
    Measure:[]
  }
  getMeal = (e) => {
    // has to be a arrow func to keep this.setState work
    let data = axios.get("/api/json/v1/1/random.php")
    data.then((res) =>{
      // console.log(res.data.meals[0]);
      let receipt = res.data.meals[0];
      let Ingredient = getKeyValue(res.data.meals[0],'strIngredient')
      let Measure = getKeyValue(res.data.meals[0],'strMeasure')
      this.setState({
        receipt,
        Ingredient,
        Measure
      })
      // console.log(Measure);
    })

  }
  render() {
    const {receipt,Ingredient,Measure} = this.state
    return (
      <div>
        {/* get meal btn */}
        <button className='getMeal_btn' onClick={this.getMeal}>get meal</button>

        {/* header, include pic, name, ingredient, measure */}
        <header>
          <div className='leftPart'>
            <img alt = "" src={receipt.strMealThumb}/>
          </div>    
          <div className='rightPart'>
            <h1>{receipt.strArea} {receipt.strCategory}</h1>
            <div className='strIngredient'>
              <ul className='Ingredient'>
                {Ingredient.map((item,index) => {
                  if (item !== " " && item !=="") {
                    return <li key={item+index}>{item}</li>
                  }
                })}
              </ul>
              <ul className='Measure'>
                {Measure.map((items,index) => {
                  if (items !== " " && items !=="") {
                    // there are some problems of the null data, has to check twice
                    return <li key={items+index}>{items}</li>
                  }
                })}
              </ul>
            </div>
          </div>
        </header>
        {/* introduction  */}
        <div className='intro'>{receipt.strInstructions}</div>
        {/* video */}
        {receipt.strYoutube ? <iframe src={receipt.strYoutube.replace(
    '/watch?v=',
    '/embed/',
  )} title="video" className='video'> </iframe> : ""}
      </div>
    )
  }
}
