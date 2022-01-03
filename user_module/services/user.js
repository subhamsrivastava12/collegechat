const User = require('../model/user');


module.exports.getAllUser= ()=>{
    let data={};
     User.find({},{limit:10},function(err,users){
        if(err){
            data={message:err.message,status:500,output:false}
            return data;
        }
        else{
            data={users:users,status:200,output:true};
            console.log(data);
            return data;
        }
    });
}

module.exports.getUser=async (id)=>{
    let data={};
    await User.find({"_id":id},function(err,user){
        if(err){
            data={message:err.message,status:500,output:false}
            return data;
        }
        else{
            data={user:user,status:200,output:true};
            return data;
        }
    });
    return data;
}

module.exports.updateUser=(id,updatedValue)=>{
    let data={};
    User.findByIdAndUpdate({"_id":id},updatedValue,function(err,docs){
        if(err){
            data={message:err.message,status:500,output:false}
            return data;
        }
        else{
            data={message:"your account updated successfully",status:200,output:true};
            return data;
        }
    });
    return data;
}

module.exports.deleteUser=(id)=>{
    let data={};
    User.remove({"_id":uid}, function(err, result) { 
        if(result===1){
            data={message:"your account updated successfully",status:200,output:true};
            return data;
        }
        else{
            data={message:err.message,status:500,output:false};
            return data;
        }
    });
    return data;
    
}