console.log("Top of service.js file.")
function Service(callback)
{
    console.log("top of  service function")
    arr_players = []
    att_team = []
    
    this.getPlayers = function()
    {
        return arr_players;
    }

    function loadPlayersData()
    {
    console.log("inside loadPlayersData")
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site
      //we can cut down on the load time by saving and pulling from localstorage

      var localData = localStorage.getItem('playerData');
      if(localData){
          console.log("local data exists -- not reloading.")
        playerData = JSON.parse(localData);

        //begin filtering process
        arr_players = playerData.filter(function(player){if (player.firstname==''){return false} else {return true}});
        console.log("length of filtered array: ",arr_players.length)
        return callback();
        //return will short-circuit the loadPlayersData function
        //this will prevent the code below from ever executing
      }

      var url = "http://bcw-getter.herokuapp.com/?url=";
      var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(endpointUri);
      var baseUrl = 'https://api.myjson.com/bins/utw41'

        $.getJSON(baseUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playerData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback()
        });
        }


        console.log("just before calling loadPlayersData")
    loadPlayersData()
    console.log("bottom of service function")
}
console.log("Bottom of service.js file.")
