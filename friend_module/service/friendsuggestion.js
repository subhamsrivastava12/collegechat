const _ = require("lodash");
const User = require("../../user_module/model/user");
const { getAllUser } = require("../../user_module/services/user")

module.exports.getFriendsuggestion = async (userId) => {
    var data = {};
    var user1 = {};
    var allUsers = {};
    var suggestion = [];
    var bool = true;
    var response = {};
    response = await User.find({ "_id": userId })
        .then((user) => {
            user1 = user[0];
        })
        .catch((err) => {
            console.log("err1", err.message);
            bool = false;
            data = { message: err.message, status: 500, output: false }
            return data;
        })

    if (!bool) {
        return response;
    }

    for (var i = 0; i < user1.friendsList.length; i++) {
        var friend = user1.friendsList[i];
        var newfriends = await User.find({ "_id": friend.userId });
        suggestion = [...newfriends[0].friendsList];
    };

    if (suggestion.length < 10) {
        var string = "";
        await getAllUser(string)
            .then((data) => {
                allUsers = data;
            })
            .catch((err) => {
                bool = false;
                data = { message: err.message, status: 500, output: false }
                return data;
            })
        if (!bool) {
            return response;
        }

        //if suggestion list has less elements than suggesting from global users  

        for (var i = 0; i < Math.min(30, allUsers.users.length); i++) {
            var user2 = {
                userId: allUsers.users[i]._id,
                username: allUsers.users[i].username
            }
            //console.log("user2",user2);
            suggestion.push(user2);
        }

    }
    
    //generating unique friendlist and then deleting persons who are already friends

    var friendset = [...user1.friendsList];
    console.log("friendset", friendset);
    var uniquesuggestion = [...new Map(suggestion.map((v) => [v.username, v])).values()];
    console.log("uniq", uniquesuggestion);
    var finalsuggestion = [];
    for (var i = 0; i < uniquesuggestion.length; i++) {
        var flag = true;
        for (var j = 0; j < friendset.length; j++) {
            if (uniquesuggestion[i].username == friendset[j].username) {
                flag = false;
                break;
            }
            if (flag) {
                finalsuggestion.push(uniquesuggestion[i]);
            }
        }
    }

    for (var i = 0; i < finalsuggestion.length; i++) {
        if (finalsuggestion[i].userId == userId) {
            finalsuggestion.splice(i, 1);
            break;
        }
    }
    response = { friendSuggestion: finalsuggestion, status: 200, output: true };

    return response;
}