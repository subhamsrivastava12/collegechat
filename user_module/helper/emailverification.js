const axios = require('axios')


module.exports.sendMail = (username,email,confirmationCode)=>{
    console.log(username,email,confirmationCode);
    axios.post('https://mailprovider.herokuapp.com/verifyemail',{
        username:username,
        email:email,
        confirmationCode:confirmationCode
        
    })
    .then((res)=>{
        //console.log("res",res);
        return res;
        
    })
    .catch((err)=>{
        console.log("error");
        return data={"message":err.message,status:500,output:false};
    })
}
