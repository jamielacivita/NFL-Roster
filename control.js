function Control()
{
    var serv = new myService(cb);

    this.playerClicked = function(id)
    {
        serv.moveToTeam(id);
        listTeam()
        drawPlayers()
    }

    this.searchKey = function()
    {
        var searchTerm = document.getElementById("playerSearchInput").value
        arr_selectedPlayers = serv.getSelectPlayers(searchTerm)
        drawSelectPlayers(arr_selectedPlayers)
    }

    function listPlayers()
    {
        arr_players = serv.getPlayers()
        template = ""
        for (player of arr_players)
        {
            template += `<li class="list-group-item">`
            template += `<span onclick="ctrl.playerClicked(${player.id})">${player.fullname}<\span>`
            template += `</li>`
        }
        document.getElementById('ul_players').innerHTML = template;
    }

    function temp_listPlayers(arr)
    {
        arr_players = arr
        template = ""
        for (player of arr_players)
        {
            template += `<li class="list-group-item">`
            template += `<span onclick="ctrl.playerClicked(${player.id})">${player.fullname}<\span>`
            template += `</li>`
        }
        document.getElementById('ul_players').innerHTML = template;
    }

    function listTeam()
    {
        arr_team = serv.getTeam()
        template = ""
        for (player of arr_team)
        {
            template += `<div class="player-card">`
            template += `<img src="${player.photo}" width="170" alt="player_generic">`
            template += `<h2>${player.fullname}<\h2>`
            template += `<h2>${player.position}<\h2>`
            template += `</div>`
        }
        document.getElementById("div_team").innerHTML = template;
    }

    function cb()
    {
        drawPlayers()
    }

    function drawPlayers()
    {
        var playersArray = serv.getPlayers();
        listPlayers(playersArray,"div_players")
    }

    function drawTeam()
    {
        var teamArray = serv.getTeam();
        listPlayers(teamArray,"div_team")
    }

    function drawSelectPlayers(arr)
    {
        var playersArray = arr;
        temp_listPlayers(playersArray,"div_players")
    }







}
console.log("Bottom of control.js file.")

//ToDo: fix so that if a player is clicked in the team window he is placed back in the players array. 