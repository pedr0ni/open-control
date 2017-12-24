var currentUser = "";

module.exports = {

    setLogged: function(user) {
        currentUser = user;
    },
    getLogged: function() {
        return currentUser;
    }

}
