const express = require('express');
const port = 5000;
const app = express();

let i = 0;

app.use(express.json())
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'DELETE', 'POST', 'PATCH');
  next();
});

let diamonds = [];

app.get('/diamonds', (req,res)=>{
  res.send(diamonds);
})


app.get('/totalprice', (req,res)=>{
  res.send({totalprice : calcTotalPrice()});
})

app.post('/addDiamond', (req,res) => {
  d = req.body.d;
  d.price= req.body.w;
  d.id = i++;
  d.dname = d.dname==='' ? `Diamond #${i}` : d.dname;
  diamonds = diamonds.concat(d);
  res.send("diamond added");
})

app.post('/deleteDiamond', (req, res) => {
  let id = req.query.id;
  const index = diamonds.findIndex((d)=>{
    return d.id==id});
  diamonds.splice(index,1);
  res.send(`Deleted ${id}`);
})

const calcTotalPrice = () => diamonds.reduce((acc,d) => acc + d.price, 0);

app.listen(port, ()=>console.log('Serever Started'));

