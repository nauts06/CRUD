const express = require('express')

const router =express.Router()


module.exports = router


//Post Method
router.post('/post',(req,res)=>{
    res.send('Post API')
})

//Get All Method
router.get('/getOne/:id',(req,res)=>{
    res.send(req.params.id)  
})


// Get by ID Method
router.get('/getOne/:id',(req,res)=>{
    res.send('Get By ID API')
})


//Update by ID Method
router.patch('/update/:id',(req,res)=>{
    res.send('Update By ID API')
})
 
//Delete by ID  Method
router.delete('/delete/:id',(req,res)=>{
    res.send('Delete by ID API')
})












