const { query } = require('express');
const express=require('express');
const app=express();
const port=3002;
const mysql=require('mysql');
const {join}=require("path");
app.set("views",join(__dirname,"views"));
app.set("view engien","ejs");
const bodyParser=require("body-parser");
const { Console } = require('console');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopping",
  });
//my list
  app.get('/mylist',async(req,res)=>{
    let mylist;
    let query=`SELECT a.id,a.product,a.quntity,a.product_type,b.type FROM mylist as a JOIN product_type as b ON a.product_type=b.id;`;
    let data=await connection.query(query,(err,result)=>{
        if(err) console.log(err);
        mylist=result;
        res.render('myList.ejs',{mylist});
        });
  })
//delete from list
app.get('/delete/:id',(req,res)=>{
  let id=req.params.id;
  let query=`DELETE FROM mylist WHERE \`id\`=${id};`;
  connection.query(query,(err,result)=>{
    if(err) console.log(err);
    console.log(result);
  });
  res.redirect('/mylist')
})
//selct to insert page the types name
app.get('/add',async(req,res)=>{
    let query=`SELECT * FROM product_type;`;
   let data= await connection.query(query,(err,result)=>{
        if(err) console.log(err);
        res.render('addNewProduct.ejs',{result});
    })
})

//select to update page types
app.get('/update/:id',async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    let myProds;
    let proddata; 
    let query=`SELECT * FROM product_type;`;
let data= await connection.query(query,(err,result)=>{
        if(err) console.log(err);
         myProds=result;
        let updatequery=`SELECT a.id,a.product,a.quntity,a.product_type,b.type FROM mylist as a JOIN product_type as b ON a.product_type=b.id WHERE a.id=${id};  `;
        let data2= connection.query(updatequery,(err,result2)=>{
          if(err) console.log(err);
          proddata=result2;
          let data=[proddata,myProds];
          console.log(data);
          res.render('update.ejs',{data})
    });
    });
})
//update product
app.post('/update/:id',async(req,res)=>{
  let id=req.params.id;
  let {product,quntity,type}=req.body;
  let query=`UPDATE mylist SET \`product\`="${product}",\`quntity\`=${quntity},\`product_type\`=${type} WHERE \`id\`=${id}`
  let data=await connection.query(query,(err,result)=>{
    if(err) console.log(err);
    console.log(result);

  });
  res.redirect('/mylist');
})
//insert new product
app.post('/insertProd',async(req,res)=>{
    let {product,quntity,type}=req.body;
    let query=`INSERT INTO mylist (\`product\`,\`quntity\`,\`product_type\`) VALUES ("${product}",${quntity},${type});`
    connection.query(query,(err,result)=>{
        console.log(query);
        if(err) console.log(err);
        console.log(result);
    });
    res.redirect("/mylist");
});
  app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
