const user = require('./../models/User.js')
const userConnection = require('./../models/UserConnection.js')
const userProfile = require('./../models/UserProfile.js')
const connection = require('./../models/Connection.js')

const initUserProfile = function (user){ //initializes the user profile. The object is intantiated here and added to session.
  var uc = [];
  var up1 = new userProfile(user, uc);
  return up1;
}

const addUserConnection = function (up1, connection, rsvp){ //used to add a new user connection
  up1._userConnection.push(new userConnection(connection, rsvp));
  return up1;
}

const updateUserRsvp = function (up1, connection, rsvp){//updates the rsvp status
  for(i=0; i<up1._userConnection.length;i++){
    if(up1._userConnection[i]._connection._connectionID == connection._connectionID){
        up1._userConnection[i]._rsvp = rsvp;
    }
  }
  return up1;
}


function _arrayRemove(arr, value) {
	return arr.filter(function(ele){
    console.log(ele._connection._connectionID);
		return ele._connection._connectionID != value._connectionID;
	});
}

const removeUserConnection = function (up1, connection){ //used for deletion, when a user is no longer interested in attending a talk.
  var uc = _arrayRemove(up1._userConnection, connection);
  up1._userConnection = uc;
  return up1;
}


module.exports.initUserProfile = initUserProfile;
module.exports.addUserConnection = addUserConnection;
module.exports.removeUserConnection = removeUserConnection;
module.exports.updateUserRsvp = updateUserRsvp;
