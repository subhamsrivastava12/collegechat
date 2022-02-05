const User = require('../model/user');




module.exports.deleteUser = async (id) => {
    var data = {};
    var sender = {};
    var response = {};
    var bool = true;
    var receiver = {};
    var receiverId = {};
    response = await User.find({ "_id": id })
        .then((user) => {
            sender = user[0];
        })
        .catch((err) => {
            bool = false;
            data = { message: err.message, status: 500, output: false }
            return data;
        })
    if (!bool) {
        return response;
    }
    console.log("step1");
    for (var i = 0; i < sender.friendsList.length; i++) {
        receiverId = sender.friendsList[i].userId;
        await User.find({ "_id": receiverId })
            .then((user) => {
                receiver=user[0];
                console.log("rec",receiver);
            })
            .catch((err) => {
                console.log("err1",err.message);
                bool = false;
                data = { message: err.message, status: 500, output: false }
                return data;
            });

        for (var j = 0; j < receiver.friendsList.length; j++) {

            if (receiver.friendsList[j].userId == id) {
                receiver.friendsList.splice(j, 1);
                break;
            }
        };
        response = await User.findByIdAndUpdate({ "_id": receiverId }, receiver)
            .catch((err) => {
                bool = false;
                console.log("err2",err.message);
                data = { message: err.message, status: 500, output: false }
                return data;
            });

    }

    if (!bool) {
        return response;
    }
    console.log("step2");
    for (var i = 0; i < sender.sentRequest.length; i++) {
        receiverId = sender.sentRequest[i].userId;
        await User.find({ "_id": receiverId })
            .then((user) => {
                receiver=user[0];
                console.log("rec",receiver);
            })
            .catch((err) => {
                console.log("err3",err.message);
                bool = false;
                data = { message: err.message, status: 500, output: false }
                return data;
            });

        for (var j = 0; j < receiver.friendRequest.length; j++) {

            if (receiver.friendRequest[j].userId == id) {
                receiver.friendRequest.splice(j, 1);
                break;
            }
        };
        response = await User.findByIdAndUpdate({ "_id": receiverId }, receiver)
            .catch((err) => {
                console.log("err4",err.message);
                bool = false;
                data = { message: err.message, status: 500, output: false }
                return data;
            });

    }


    if (!bool) {
        return response;
    }

    console.log("step3");

    for (var i = 0; i < sender.friendRequest.length; i++) {
        receiverId = sender.friendRequest[i].userId;
        await User.find({ "_id": receiverId })
            .then((user) => {
                receiver=user[0];
            })
            .catch((err) => {
                console.log("err5",err.message);
                bool = false;
                data = { message: err.message, status: 500, output: false }
                return data;
            });

        for (var j = 0; j < receiver.sentRequest.length; j++) {

            if (receiver.sentRequest[j].userId == id) {
                receiver.sentRequest.splice(j, 1);
                break;
            }
        };
        response = await User.findByIdAndUpdate({ "_id": receiverId }, receiver)
            .catch((err) => {
                console.log("err6",err.message);
                bool = false;
                data = { message: err.message, status: 500, output: false }
                return data;
            });

    }

    if (!bool) {
        return response;
    }
    console.log("step4");
    response = await User.remove({ "_id": id })
        .then((user) => {
            data = { message: "user deleted successfully", status: 200, output: true };
            return data;
        })
        .catch((err) => {
            console.log("err6",err.message);
            data = { message: err.message, status: 500, output: false }
            return data;
        })

    return response;


}