
function myService(callback)
{
    var arr_players = []
    var arr_team = []
    
    this.getPlayers = function()
    {
        return arr_players;
    }

    this.getTeam = function()
    {
        return arr_team;
    }

    this.getSelectPlayers = function(nameSearchText)
    {
        
        arr_selectPlayers = []
        for (var i = 0; i<arr_players.length;i++)
        {
            player = arr_players[i];
            if (player.fullname.includes(nameSearchText))
            {
                //arr_selectPlayers.push(arr_players.splice(i,1)[0])
                arr_selectPlayers.push(player)
            }
        }
        return arr_selectPlayers
    }

    this.moveToTeam = function(idin)
    {
        for (var i = 0; i<arr_players.length;i++)
        {
            player = arr_players[i];
            if (player.id == idin)
            {
                arr_team.push(arr_players.splice(i,1)[0])
            }
        }
    }



    function loadPlayersData()
    {
    console.log("inside loadPlayersData")
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site
      //we can cut down on the load time by saving and pulling from localstorage

      var localData = localStorage.getItem('playerData');
    //   if(localData){
    //       console.log("local data exists -- not reloading.")
    //     playerData = JSON.parse(localData);

    //     //begin filtering process
    //     arr_players = playerData.filter(function(player){if (player.firstname==''){return false} else {return true}});
    //     console.log("length of filtered array: ",arr_players.length)
    //     return callback();
    //     //return will short-circuit the loadPlayersData function
    //     //this will prevent the code below from ever executing
    //   }

      var url = "http://bcw-getter.herokuapp.com/?url=";
      var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playerData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')

          playerData = JSON.parse(localData);

         //Filter out non-player elements
         arr_players = playerData.filter(function(player){if (player.firstname==''){return false} else {return true}});
         console.log("length of filtered array: ",arr_players.length)

          callback()
        });
        }

    loadPlayersData()

}

