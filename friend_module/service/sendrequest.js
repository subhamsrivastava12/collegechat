const User = require("../../user_module/model/user");

module.exports.sendRequest=async (senderId,senderName,receiverId,receiverName)=>{
    var data={};
    var sender={};
    var receiver={};
    var bool=true;
    var response={};
    console.log("senderId",senderId);
    console.log("receiverId",receiverId);
    response=await User.find({"_id":senderId})
    .then((user)=>{
        sender=user;
    })
    .catch((err)=>{
        console.log("err1",err.message);
        bool=false;
        data={message:err.message,status:500,output:false}
        return data;
    });

    if(!bool){
        return response;
    }
    const sendrequest={
        userId:receiverId,
        username:receiverName
    }
    console.log("sender",sender);
    sender[0].sentRequest.push(sendrequest);
    response = await User.findByIdAndUpdate({"_id":senderId},sender[0])
                .catch((err)=>{
                    console.log("err2",err.message);
                    bool=false;
                    data={message:err.message,status:500,output:false}
                    return data;
                });
    if(!bool){
        return response;
    }  
    
    response=await User.find({"_id":receiverId})
    .then((user)=>{
        receiver=user;
    })
    .catch((err)=>{
        console.log("err3",err.message);
        bool=false;
        data={message:err.message,status:500,output:false}
        return data;
    });

    const friendrequest={
        userId:senderId,
        username:senderName
    }

    receiver[0].friendRequest.push(friendrequest);
    response = await User.findByIdAndUpdate({"_id":receiverId},receiver[0])
                .catch((err)=>{
                    console.log("err4",err.message);
                    bool=false;
                    data={message:err.message,status:500,output:false}
                    return data;
                });
    if(!bool){
        return response;
    }  

    response={"message":"Friend Request sent successfully",status:200,output:true};
    return response;

}