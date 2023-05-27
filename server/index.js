const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password:"",
    database:"mytodo"
});

app.get("/", (req, res)=>{
    res.send("Hello, SM ")
})


app.post("/create", (req, res)=>{
    // const todo = 'my todo test server'
    const todo = req.body.todo;
    // const priority = "High"
    const priority = req.body.priority;
    db.query(
        "INSERT INTO todos (todo, priority) VALUES(?,?)",[todo, priority], (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send("Values inserted")
            }
        }
    )
    })

app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    db.query(
        "DELETE FROM todos WHERE id=?", id, (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
    })

app.put("/update", (req, res)=>{
    const id = req.body.id;
    const priority = req.body.priority;
    db.query(
        "UPDATE todos SET priority = ? WHERE id = ?", [priority, id], (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
    })




app.get("/all", (req, res)=>{
    db.query(
        "SELECT* FROM todos" , (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
    })

app.listen(4000, ()=>{
    console.log("your server is running at 4000")
})