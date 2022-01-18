const axios = require('axios')


module.exports.sendMail = async (username,email,token)=>{
    const {data}=await axios.post('https://mailprovider.herokuapp.com/resetpassword',{
        username:username,
        email:email,
        resetPasswordtoken:token
        
    })
    .catch((err)=>{
        console.log(err.message);
        return err.message;
    })
    //console.log("data in helper",data);
    return data;
}
