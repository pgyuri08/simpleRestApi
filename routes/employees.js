const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Employee = require('../models/Post');
const router = express.Router();

router.get('/', async (req,res) => {
  try{
    const posts = await Employee.find()
    res.json(posts)
  }catch(err){
    res.json({message:err })
  }
});

router.post('/', async (req,res) => {
  const post = new Employee({
      name: req.body.name,
      position: req.body.position,
      available: req.body.available
    });
    try{
      const savedPost = await post.save();
      res.json(savedPost);
    }catch (err) {
      res.json({ message: err });
    }
});

router.get('/:postId', async (req,res) => {
  try {
    //console.log(req.params.postId);
    const post = await Employee.findById(req.params.postId)
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete('/:postId', async (req,res) => {
  try {
    const removedPost = await Employee.remove({_id: req.params.postId })
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put('/:postId', async (req,res) => {
  let newBody = {}
  Object.keys(req.body).filter( i => i !== '_id').map(key => newBody[key] = req.body[key])
  console.log(newBody)

  try{
    const updatePost = await Employee.findByIdAndUpdate({_id: req.params.postId }, newBody)
    res.send(updatePost)
  } catch (err) {
    res.json({ message: err });
    console.log(err)
  }
});


module.exports = router;
