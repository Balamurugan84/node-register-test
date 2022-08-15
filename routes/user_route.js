const router = require('express').Router();
const bcrypt = require('bcrypt');
const { joiSchema } = require('../middleware/joivalidation');
const userSchema = require('../models/user_schema');


router.post('/register', async(req, res)=>{
    try {
        let username = req.body.username;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;

        if(username){
            let nameData = await userSchema.findOne({username:username}).exec();
            if(nameData){
                return res.status(400).json({'status':'failed', 'message':'user name already exist'})
            }
        }else{
            return res.status(404).json({'status':'failed', 'message':'use another name'})
        }

        if(email){
            let emailData = await userSchema.findOne({email:email}).exec();
            if(emailData){
                return res.status(400).json({'status':'failed', 'message':'user name already exist'})
            }
        }else{
            return res.status(404).json({'status':'failed', 'message':'use another name'})
        }

        if(phoneNumber){
            let phoneNumberData = await userSchema.findOne({phoneNumber:phoneNumber}).exec();
            if(phoneNumberData){
                return res.status(400).json({'status':'failed', 'message':'user name already exist'})
            }
        }else{
            return res.status(404).json({'status':'failed', 'message':'use another name'})
        }
        
        let joi = await joiSchema.validateAsync(req.body);
        let details = new userSchema(req.body);
        let password = req.body.password;
        if(password){
            const salt = await bcrypt.genSalt(10);
            details.password = bcrypt.hashSync(password, salt)
        }

        const result = await details.save();
        return res.status(200).json({"status":'success', "message":'register successed', 'result':result});

    } catch (error) {
        return res.status(404).json({"status":"error found", "message":error.message})
    }
})

module.exports = router;