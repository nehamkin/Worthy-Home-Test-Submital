import { useState, useEffect } from 'react'
import MarketHeader from './components/MarketHeader';
import CaratInput from './components/inputs/CaratInput';
import SelectFromList from './components/inputs/SelectFromList';
import DiamondWorth from './components/DiamondWorth';
import MyDiamondsHeader from './components/MyDiamondsHeader';
import DiamondName from './components/DiamondName';
import DiamondList from './components/inputs/Diamond/DiamondList';
import TotalWorth from './components/TotalWorth';
import './App.css';
import Diamond from './components/inputs/Diamond/Diamond';

const cuts = ['Good','Very Good','Ideal','Astor Ideal'];
const colors = ['D','E','F','G','H','I','J','K'];
const clarities = [	'IF','VVS1','VVS2','VS1','VS2','SI1','SI2'];

const tableOfWorth = [
                       [80,	65,	59,	49,	40,	34,	27,	24,	21,	15,	11],
                       [65,	60,	51,	46,	39,	33,	26,	23,	20,	14,	10],
                       [60,	52,	46,	43,	37,	31,	25,	22,	19,	13,	10],
                       [52,	46,	42,	40,	35,	29,	24,	21,	18,	13,	9],
                       [44,	40,	36,	34,	30,	27,	22,	19,	17,	12,	9],
                       [35,	32,	30,	27,	25,	23,	21,	18,	16,	12,	9],
                       [29,	27,	25,	24,	23,	22,	20,	17,	14,	12,	8],
                       [23,	22,	21,	20,	19,	18,	16,	15,	13,	11,	8],
                       [22,	21,	20,	19,	18,	17,	15,	13,	11,	10,	7],
                       [18,	17,	17,	16,	15,	14,	13,	11,	10,	9,	6],
                      ];



const defaultDiamond= {
  dname : '',
  carat : 0,
  cut : cuts[cuts.length-1],
  color : colors[colors.length-1],
  clarity : clarities[clarities.length-1],
  price : 0
};

function App() {
  
  const[diamond, setDiamond] = useState(defaultDiamond);
  const[submit, setSubmit] = useState(false);
  const[worth, setWorth] = useState(0);
  const[allDiamonds, setAllDiamonds] = useState([]);
  const[totalWorth, setTotalWorth] = useState(0);

  const calculate = () => {
    const row = colors.indexOf(diamond.color);
    const col = clarities.indexOf(diamond.clarity);
    const percentage = (cuts.indexOf(diamond.cut)*(0.25))+0.25;
    const worth = tableOfWorth[row][col];
    const carat = diamond.carat;
    return worth*100*carat*percentage;
  }


  const changeC = (c, val) => {
    setDiamond(
      {...diamond, [c]: val}
    );
  }

  useEffect(()=>{
    setWorth(parseInt(calculate()));
  },[diamond]);

  useEffect(()=>{
    fetchDiamonds().then(res => {setAllDiamonds(res)}).catch(err => console.log(err));
    fetchPrice().then(res => setTotalWorth(res)).catch(err => console.log(err));
  },[]);

  const fetchDiamonds = async () => {
    const res = await fetch('/diamonds');
    const data = await res.json();

    if(res.status !== 200){
      throw Error(data.message);
    }   
    return data;
  }
  const fetchPrice = async () => {
    const res = await fetch('http://localhost:5000/totalprice');
    const data = await res.json();
    if(res.status !== 200){
      throw Error(data.message);
    }   
    return data;
  }

  const updatePrice = ()=>setDiamond({...diamond, 'price': worth});
  // const updateName = () => {
  //   const name = diamond.dname === 'Diamond #1' ? `Diamond #${allDiamonds.length+1}` : diamond.dname;
  //   setDiamond({...diamond, 'dname': name});
  // }

  const PostDiamond = async () => {
    const reqOpt = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({d:diamond, w:worth})
    };

    fetch('http://localhost:5000/addDiamond',reqOpt)
    .then()
    .then(updates).catch(err=>console.log(err));
  }

  const updates = async () => {
    fetchDiamonds().then((res)=>{setAllDiamonds(res)})
    fetchPrice().then((res)=>setTotalWorth(res))
  }

  const AddDiamond =  () => {
    if(diamond.carat <= 0)
      alert("Carat size must be greater than 0");
    else{
    updatePrice();
    // updateName();
    setSubmit(true);
    }
  }


  useEffect(()=>{
    if(submit){
      PostDiamond().then(resetApp());
    }
    else
      return;},[PostDiamond,submit]);

  const resetApp = ()=>{
    setWorth(0);
    const defaultDiamond= {
      dname : '',
      carat : 0,
      cut : cuts[cuts.length-1],
      color : colors[colors.length-1],
      clarity : clarities[clarities.length-1],
      price : 0
    };
    setDiamond(defaultDiamond);
    setSubmit(false);
    
  }

  const deleteDiamond = async (id) => {
    const res = await fetch(`http://localhost:5000/deleteDiamond?id=${id}`, {
      method: 'Post',
      headers: {'Content-type': 'application/json'},
    })
    fetchDiamonds().then((res)=>{setAllDiamonds(res)})
    fetchPrice().then((res)=>setTotalWorth(res))
    .catch(err=>console.log(err));
  }


    

  
  return (
    <div className="App">
     <MarketHeader/>
     <div className="Inputs" id='diamond input'>
       <section className="Inserts">
        <DiamondName diamond={diamond} className="DiamondName" id='dname' changeC={changeC}/>
        <CaratInput className="Carat" diamond={diamond} changeC={changeC}/>
        <SelectFromList diamond={diamond} name='Cut' id='cut' arr={cuts} changeC={changeC}/>
        <SelectFromList diamond={diamond} name='Color' id='color' arr={colors} changeC={changeC}/>
        <SelectFromList diamond={diamond} name='Clarity' id='clarity' arr={clarities} changeC={changeC}/>
       </section>
       <div>
        <DiamondWorth worth={worth}/>
        <input type='submit' value='Add Diamond' className='addDiaBtn' onClick={AddDiamond}></input>
       </div>
     </div>
     <div className="DiamondsInserted">
       <MyDiamondsHeader/>
       <>{
         allDiamonds.length > 0 ? (
           <>
            <DiamondList allDiamonds={allDiamonds} onDelete = {deleteDiamond}/>
            <TotalWorth price={totalWorth.totalprice}/>
          </>
         ) :
         (
           "You have no diamonds entered"
         )
       }
       </>
     </div>
    </div>
  );
}

export default App;
