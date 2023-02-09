const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req,res,next) =>{
    try {
        console.log(req.body);
        const{from,to,message} = req.body;
        console.log(message);
        const data = await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from
        });
        if (data) {
            return res.json({msg:"msg added"});
        }
        return res.json({msg:"Failed to add msg"});
        
    } catch (ex) {
        next(ex);
    }
}
module.exports.getMessage = async (req,res,next) =>{
    try {
        const {from,to} = req.body;
        console.log(from);
        const messages = await messageModel.find({
            users:{
                $all:[from,to]
            }
        })
        .sort({updatedAt:1});
        const projectedMessages = messages.map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message : msg.message.text,
            };
        });
        console.log(projectedMessages);
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
}