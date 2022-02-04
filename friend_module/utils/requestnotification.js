const axios = require('axios')


module.exports.sendMail = async (senderName,email,receiverName)=>{
    console.log(email);
    const {data} = await axios.post('https://mailprovider.herokuapp.com/requestnotification',{
        senderName:senderName,
        email:email,
        receiverName:receiverName
        
    })
    .catch((err)=>{
        console.log(err.message);
        return err.message;
    })
    //console.log("data in helper",data);
    return data;
}
