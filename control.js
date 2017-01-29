console.log("Top of control.js file.")
function Control()
{
    console.log("top of  control function")
    serv = new Service(cb);

    function listPlayers(arr)
    {
        for (player of arr)
        {
            console.log(player.fullname)
            var arr_players = serv.getPlayers()
            
        }
    }

    function cb()
    {
        console.log("Inside the cb callback function.")

    }

    console.log("just before list players function")
    listPlayers(arr_players)
     console.log("bottom of  control function")
}
console.log("Bottom of control.js file.")