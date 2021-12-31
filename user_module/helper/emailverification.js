const axios = require('axios')


module.exports.sendMail = (username,email,confirmationCode)=>{
    axios.post('localhost:5000/verifyemail',{
        username:username,
        email:email,
        confirmationCode:confirmationCode
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        return {data:err.message,status:500,output:false};
    })
}
