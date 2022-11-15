const { query } = require('express');
const express=require('express');
const app=express();
const port=8080;
const mysql=require('mysql');
const {join}=require("path");
app.set("views",join(__dirname,"views"));
app.set("view engien","ejs");
const bodyParser=require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Auto_Car",
  });
  let MyArrData=[[`Audi`,`A5`,2000,`white`],[`Toyota`,`Toyota yaris`,2018,`white`],[`Reno`,`Clio`,2002,`grey`],['Mercedes','A-class',2005,'white']];
  let InsertCars=()=>{
    let query ="INSERT INTO cars (\`brand\`,\`model\`,\`year\`,\`color\`) VALUES ? ";
    connection.query(query,[MyArrData],(err,result)=>{
        if (err) console.log(err);
console.log(result);
    })
    }
//   InsertCars();
  let carsApi=[ //הדרך הנכונה בצורת api
    {
        brand:"Bently",
        model:"GT-V8",
        year:2014,
        color:"yellow",
    },
    {
        brand:"Ferrari",
        model:"California",
        year:2017,
        color:"red",
    },
    {
    brand:"Ford",
    model:"Focus",
    year:2000,
    color:"grey",
    }
  ];

  let InsertCarsByApi=()=>{
    let query="INSERT INTO cars (\`brand\`,\`model\`,\`year\`,\`color\`) VALUES"
  
  let msg='';
carsApi.forEach((car,index)=>{
    let sign=index===carsApi.length-1? ";":",";

    msg+=`("${car.brand}","${car.model}",${car.year},"${car.color}")${sign}`;
    
})  
let builtQuery=query+msg;
console.log(`this is my query ${builtQuery}`);
connection.query(builtQuery,(err,result)=>{
    if (err) console.log(err);
console.log(result);
})
  }

// InsertCarsByApi();
app.get("",async)


