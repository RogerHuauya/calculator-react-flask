import './App.css';
import React, {useState} from 'react';

//componentes

function Display({value}){
  return (
    <div>{value}</div>
  )
}

function Button({value, changeValue}){
  return (
    <button className='Button' onClick={() => {changeValue(value)}}>
      {value}
    </button>
  )
} 

function App() {
  let [currentValue, setCurrentValue] = useState('');
  const changeValue = (val) => {
    if(val === 'delete'){
      val = '';
      currentValue = '';
    }else if (val === '='){
      val = '';
      let operator = '';
      let num1 = 2;
      let num2 = 2;
      let array = ['x', '+', '-', '/', '%', 'F'];
      for(let i = 0; i < currentValue.length; i++){
        if(array.includes(currentValue[i])){
          operator = currentValue[i];
          num1 = Number(currentValue.slice(0, i));
          num2 = Number(currentValue.slice(i+1, currentValue.length));
        }
      }
      if(operator === 'x'){ 
        currentValue = num1 * num2;
      }else if(operator === '+'){
        currentValue = num1 + num2;
      }else if(operator === '-'){
        currentValue = num1 - num2;
      }else if(operator === '/'){
        currentValue = num1 / num2;
      }else if(operator === '%'){
        currentValue = num1 % num2;
      currentValue = currentValue.toString();
    }
  }else if(val === 'F'){
        val = ''
            console.log('f')
        const fiboFn = async (currentValue) => {
          const response = await fetch(`/fibonacci/${currentValue}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          setCurrentValue(data.result);
        }
        fiboFn(currentValue);
    }
    setCurrentValue(currentValue + val);
  };
  
  
  return (
    <div className="App">
      <p>My calculator</p>
      <header className="App-header">
        <table>
          <thead>
            <tr><th><Display value={currentValue}></Display> </th></tr>
          </thead>
          <tbody>
              <tr>
              <td><Button value={'1'} changeValue={changeValue}></Button></td>
              <td><Button value={'2'} changeValue={changeValue}></Button></td>
              <td><Button value={'3'} changeValue={changeValue}></Button></td>
              <td><Button value={'+'} changeValue={changeValue}></Button></td>
              <td><Button value={'-'} changeValue={changeValue}></Button></td>
              </tr>
              <tr>
              <td><Button value={'4'} changeValue={changeValue}></Button></td>
              <td><Button value={'5'} changeValue={changeValue}></Button></td>
              <td><Button value={'6'} changeValue={changeValue}></Button></td>
              <td><Button value={'x'} changeValue={changeValue}></Button></td>
              <td><Button value={'%'} changeValue={changeValue}></Button></td>
              </tr>
              <tr>
              <td><Button value={'7'} changeValue={changeValue}></Button></td>
              <td><Button value={'8'} changeValue={changeValue}></Button></td>
              <td><Button value={'9'}changeValue={changeValue}></Button></td>
              <td><Button value={'/'} changeValue={changeValue}></Button></td>
              <td><Button value={'F'} changeValue={changeValue}></Button></td>
              </tr>
              <tr>
              <td><Button value={'0'} changeValue={changeValue}></Button></td>
              <td><Button value={'='} changeValue={changeValue}></Button></td>
              <td><Button value={'delete'} changeValue={changeValue}></Button></td>
              </tr>
              </tbody>
          </table>
      </header>
    </div>

  );
}

export default App;
