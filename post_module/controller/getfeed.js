const {getFeed} = require("../service/getfeed")

module.exports.getFeed=async (req,res)=>{
    const userId=req.cookies.userId;
    var pageNo=1;
    if(req.params.page){
        pageNo=req.params.page
    }
    getFeed(userId,pageNo)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })

    
    
    
}
