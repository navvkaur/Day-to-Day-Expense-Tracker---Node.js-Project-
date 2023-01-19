require('dotenv').config();
const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');


exports.forgotpassword = async (req,res)=>{
    try {
        console.log(req.body.email);
        const  email  = req.body.email;
        console.log(email);
        //console.log(process.env.SENGRID_API_KEY)
        const user = await User.findOne({where : { username:email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

            //sgMail.setApiKey(process.env.SENGRID_API_KEY)

            const msg = {
                to: email, // Change to your recipient
                from: 'kaur2305navneet@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            }
                console.log(msg.html)
                return res.status(200).json({message: 'Link to reset password sent to your mail ', sucess: true,link :`http://localhost:3000/password/resetpassword/${id}`})
                
            

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}
exports.resetpassword = async (req, res) => {
    console.log('hii')
    const id =  req.params.id;
    console.log(id);
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
       if (forgotpasswordrequest) {
            forgotpasswordrequest.update({ isActive: false });
            res.status(200).send(`<html>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassward">Enter New password</label>
                                        <input name="newpassward" type="password"></input>
                                        <button>Reset Password</button>
                                    </form>
                                </html>`
            );
            res.end();
        

        }
    }).catch((err)=>{
        console.error(err)
        return res.json({ message: err, sucess: false });
})
}

exports.updatepassword = async(req, res) => {

    try {
console.log(req.query.newpassward);
        const  newpassword  = req.query.newpassward;
        console.log(".............."+newpassword);
        
        const { resetpasswordid } = req.params;
        console.log(resetpasswordid)
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;

                         bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                           
                            user.update({ password: hash }).then(() => {
                              //  res.redirect('http://localhost:3000/views/login.html')
                           // return  window.location.href = 'http://127.0.0.1:5500/views/login.html'
                                 return res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    }
             else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


