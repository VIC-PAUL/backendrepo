const express = require("express");
const { postModel } = require("../model/posts.model");
const postsRoute = express.Router();

postsRoute.use(express.json());

postsRoute.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.send(posts);
  } catch (err) {
    console.log(err);
    console.log("Error occurred");
  }
});

postsRoute.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    const npost = new  postModel(payload);
    await npost.save();
    res.send("Post added")
  } catch (err) {
    console.log(err);
    console.log("Error occurred");
  }
});

postsRoute.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const ID =req.params.id;
    const post =await postModel.findOne({_id: ID});
    const user_db=post.userID;
    const user_req=req.body.userID;
  try {
    if(user_db!==user_req){
        res.send("Not authorized");
    }else{
        const upost= await postModel.findByIdAndUpdate({_id:ID},payload)
        res.send("Post updated")
    }

  } catch (err) {
    console.log(err);
    console.log("Error occurred");
  }
});


postsRoute.delete("/delete/:id", async (req, res) => {
    const ID =req.params.id;
    const post =await postModel.findOne({_id: ID});
    const user_db=post.userID;
    const user_req=req.body.userID;
  try {
    if(user_db!==user_req){
        res.send("Not authorized");
    }else{
        const dpost= await postModel.findByIdAndDelet({_id:ID})
        res.send("Post deleted")
    }

  } catch (err) {
    console.log(err);
    console.log("Error occurred");
  }
});

module.exports = {
  postsRoute
};
