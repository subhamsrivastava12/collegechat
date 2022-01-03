const axios = require('axios')


module.exports.sendMail = (username,email,token)=>{
    axios.post('https://mailprovider.herokuapp.com/resetpassword',{
        username:username,
        email:email,
        resetPasswordtoken:token
        
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return {data:err.message,status:500,output:false};
    })
}
