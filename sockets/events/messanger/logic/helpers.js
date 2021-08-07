const User=require("../../../../models/User");

const alreadyTalked = async(host_id, talker_id)=>{
    const result={
        flag: false,
        hoster: null,
        index: -1
    };
    try {
        const user=await User.findOne({ _id: host_id});
        if(!user) return result;
        result.flag=user.messages.some(
            (item, index)=>{
                result.index=index;
                return (item.sender_id===talker_id || item.receiver_id===talker_id);
            });
        if(result.flag){
            result.hoster=user;
            return result;
        }
        return result;
    } catch (error) {
        console.log(error);
        return result;
    }
};

module.exports=alreadyTalked;