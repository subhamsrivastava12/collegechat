const axios = require('axios')


module.exports.sendMail = async (username,email,confirmationCode)=>{
    console.log(username,email,confirmationCode);
    const {data} = await axios.post('https://mailprovider.herokuapp.com/verifyemail',{
        username:username,
        email:email,
        confirmationCode:confirmationCode
        
    })
    .catch((err)=>{
        console.log(err.message);
        return err.message;
    })
    //console.log("data in helper",data);
    return data;
}
