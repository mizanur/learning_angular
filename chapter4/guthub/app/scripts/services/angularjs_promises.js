var currentProfile = null;
var username = 'something';

fetchServerConfig(function(serverConfig) {
    fetchUserProfiles(serverConfig.USER_PROFILES, username,
        function(profiles) {
            currentProfile = profiles.currentProfile;
        });
});


//fetchServerConfig (function)

var currentProfile =
    fetchServerConfig().then(function(serverConfig) {
        return fetchUserProfiles(serverConfig.USER_PROFILES, username);
    }).then(function(profiles) {                        //then passes two functions, f
            return profiles.currentProfile;             //first is a success handler
    }, function(error) {                                //second is an error handler
       // Handle errors in either fetchServerConfig or
       // fetchUserProfiles here
    });

