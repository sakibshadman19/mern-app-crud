const express = require("express")
// const users = require("../model/Userschema")
const users = require("../model/Userschema")

const router = express.Router()

router.post("/register", async (req, res) => {
    const { name, email, age, mobile, work, address, desc } = req.body

    if (!name || !email || !age || !mobile || !work || !address || !desc) {
        res.status(422).json({error : 'please fill up the form'})
    }
    try {
        const preuser = await users.findOne({ email: email })
       

        if (preuser) {
            res.status(422).json({error: "email already exist"})
        } else {
            const adduser = new users({
                name, email, age, mobile, work, address, desc
            })

            await adduser.save()
            res.status(201).json(adduser)
           
        }


    }
    catch (error) {
        res.status(422).json(error)
    }

})

router.get("/getdata",async(req,res)=>{
    try{
        const user = await users.find()
       
        res.status(201).json(user)

    }catch(err){
     res.status(422).json(err)
    }



})

router.get("/getuser/:id",async (req,res)=>{
  try{
    const {id} = req.params;
    const result = await users.findById({_id: id})
    res.status(201).json(result)
  }catch(error){
    res.status(422).json(error)
  }
})

router.patch("/updateuser/:id",async(req,res)=>{
    const {id} = req.params

    try{
        const result = await users.findByIdAndUpdate(id,req.body,{
            new:true,
        })

       res.status(201).json(result)

    }
    catch(error){
         res.status(422).json(error)
    }
})

router.delete("/deleteuser/:id",async(req,res)=>{
    const {id} = req.params
    try{

        const deleteUser = await users.findByIdAndDelete({_id : id})
    
      res.status(201).json(deleteUser)
    }catch(error){
        res.status(422).json(error)
    }
})


module.exports = router