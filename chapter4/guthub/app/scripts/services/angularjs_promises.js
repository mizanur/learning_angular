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
    }).then(function(profiles) {
            return profiles.currentProfile;
    }, function(error) {
       // Handle errors in either fetchServerConfig or
       // fetchUserProfiles here
    });