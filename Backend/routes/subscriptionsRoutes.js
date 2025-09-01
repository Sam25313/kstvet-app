const express = require('express');
const router = express.Router();


router.post('/subscribe', async(req,res)=>{
    const {email} = req.body;

    if(!email || !email.includes('@')){
        return res.status(400).json({message: 'Invalid email adress'})
    }
      console.log(`Received subscription request for: ${email}`);
       res.status(200).json({ message: 'Subscription successful!' });
})

module.exports = router;