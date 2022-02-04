const {getUserpost} = require("../service/getuserpost")

module.exports.getUserpost=async (req,res)=>{
    const userId=req.cookies.userId;
    const requserId=req.params.id;
    var pageNo=1;
    if(req.params.page){
        pageNo=req.params.page;
    }
    console.log("userid",userId);
    getUserpost(userId,pageNo,requserId)
    .then((data)=>{
        //console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
    
    
}
