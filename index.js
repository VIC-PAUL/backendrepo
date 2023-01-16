const express=require('express');
const {connection}=require("./config/db")
const {usersRoute} =require("./routes/users.route")
const {postsRoute} =require("./routes/posts.route")
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors");
require("dotenv").config()

const app = express();

app.use(express.json());
app.use(
    cors({
    origin:"*"
})
);

app.use("/users", usersRoute)
app.use(auth)
app.use("/posts", postsRoute)

app.get("/", (req,res)=>{
    res.send("Welcome to the Social Media App")
})

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Server is listening on port 8080");
    }
    catch(e){
        console.log(e)
        console.log("Error occurred")
    }
})