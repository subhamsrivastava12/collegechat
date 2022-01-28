const {sharedFeed} = require("../service/sharedfeed")

module.exports.sharedFeed=async (req,res)=>{
    const userId=req.cookies.userId;
    var pageNo=1;
    if(req.params.page){
        pageNo=req.params.page
    }
    sharedFeed(userId,pageNo)
    .then((data)=>{
        console.log("data",data);
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })

    
    
    
}
