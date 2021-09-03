require('dotenv').config();
const Discord = require('discord.js');
const http = require("http");
const url = require("url");
const fetch = require('node-fetch');
global.fetch = require("node-fetch");
const axios = require('axios').default;
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const apiKey1 = process.env.BMAPIKEY
const prefix = process.env.PREFIX
const steamApiKey = process.env.STEAMAPIKEY
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Http = new XMLHttpRequest();

client.login(TOKEN);
client.status

client.once('ready', () => {
  console.log('Bot Started on ' + client.user.tag + " with prefix " + prefix.toString());
  /* var statusID = ("status" + Math.floor(Math.random() * 4));
  var status1 = "teststatus1"
  var status2 = "teststatus2"
  var status3 = "teststatus3"
  var status4 = "teststatus4" */

  client.user.setPresence({
    status: "dnd",
    game: {
      name: "the squirrels (im the dev bot)",
      type: "WATCHING"
    }
  })


});

client.on('message', message => {
  if (message.content.startsWith(prefix)){


  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "help") {
    message.reply("Commands: \n `^help` - Shows this message \n `^hourcheck [steamid64]` - Checks a player's total hours in the past 30-ish days. \n `^staffhourcheck [steamid64]` - Checks the player's total & low pop hours between last Friday and this Friday")
  }
  if (command === "status") {
    if ([279266428975054849, 337293676931973120].indexOf(message.author.id)) {
      client.user.setPresence({
        status: "dnd",
        game: {
          name: args.join(" ")
        }
      })
    }else {
      message.reply("Yes daddy, I will listen to you from now on")
    }
  }
  if (command === "staffhourcheck") {


    if (!args.toString().match(/^765611/)) {
      message.channel.send("<@!" + message.author.id + ">, You didn't put a valid steamID64. Try again.")
    } else {
      /******************/
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var Http = new XMLHttpRequest();
      /* Get BattleMetrics ID from SteamID64 */
      var apiGetBMID = "https://api.battlemetrics.com/players/match"
      var jsonForGettingBMID = "{\"data\":[{\"type\":\"identifier\",\"attributes\":{\"type\":\"steamID\",\"identifier\":\"" + args + "\"}}]}"

      Http.open("POST", apiGetBMID, false);
      Http.setRequestHeader("Authorization", "Bearer " + apiKey);
      Http.setRequestHeader("Content-Type", "application/json");

      Http.send(jsonForGettingBMID);
      var apiResponse = Http.responseText
      /* Parse response from BM API to get player ID */
      var string = apiResponse
      var string = string.split(",");
      for (var i in string) {
        if ((string[i].includes('"id":')) && (string[i].includes("}}"))) {
          string = string[i];
          break;
        }
      }
      var string = string.replace("}}", "").split(":");
      var string = string[1];
      var playerBMID = string.replace('"', "").replace('"', "");


      var string1 = apiResponse
      var string1 = string1.split(",");
      for (var value in string1) {
        if ((string1[value].includes('"personaname":'))) {
          string1 = string1[value];
          break;
        }
      }
      string1 = string1.split(":");
      string1 = string1[1];
      playerName = string1.replace('"', "").replace('"', "");


      var string2 = apiResponse
      var string2 = string2.split(",");
      for (var value in string2) {
        if ((string2[value].includes('"avatarfull":'))) {
          string2 = string2[value];
          break;
        }
      }
      string2 = string2.split(":");
      string2 = string2[2];
      playerAvatar = string2.replace('"', "").replace('"', "");
      playerAvatar = ("https:" + playerAvatar)


      /* Initalization */
      var total = 0;
      var lowPopTotal = 0;
      var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
      var Http = new XMLHttpRequest();
      var servers = [3260244, 9113699, 5192962, 3657891, 2703938, 3481329, 6841036, 4032701, 6842591, 5192054, 2930255, 2801208, 3665933, 3973236, 3044995, 8939401, 2801795, 3410403];
      var lowPopServers = [3657891, 5192054, 6841036, 6842591, 5192962, 4032701, 3481329];


      /* BROKEN DATE LOGIC
      // Get next fri Date
      var todayWeekday = new Date().getDay()
      var todayDate = new Date().getDate()
      var differenceFromNxtFri = (5 - todayWeekday)
      var nxtFriDay = String((todayDate + differenceFromNxtFri)).padStart(2, '0');
      var nxtFriMonth = String(new Date().getMonth() + 1).padStart(2, '0');
      var nxtFriYear = new Date().getFullYear();
      var nxtFri = nxtFriYear + "-" + nxtFriMonth + "-" + todayDate

      // Get last Fri date
      var todayWeekday = 4
      var todayDate = 7
      var lastFriDay = String((nxtFriDay - 7)).padStart(2, '0');
      var lastFriMonth = String(new Date().getMonth() + 1).padStart(2, '0');
      var lastFriYear = new Date().getFullYear();
      var lastFri = lastFriYear + "-" + lastFriMonth + "-" + lastFriDay
      */
      /* BROKEN DATE LOGIC v2
      var today = new Date();
      var nextFriday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      var lastFriday = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);


      var nxtFriDay = nextFriday.getDate().toString().padStart(2, '0');
      console.log(nxtFriDay)
      var nxtFriMonth = (nextFriday.getMonth() + 1).toString().padStart(2, '0');
      console.log(nxtFriMonth)
      var nxtFriYear = nextFriday.getFullYear().toString();
      var nxtFri = nxtFriYear + "-" + nxtFriMonth + "-" + nxtFriDay
      console.log(nxtFri)



      var lastFriDay = lastFriday.getDate().toString().padStart(2, '0');
      console.log(lastFriDay)
      var lastFriMonth = (lastFriday.getMonth().toString() + 1).padStart(2, '0');
      console.log(lastFriMonth)
      var lastFriYear = lastFriday.getFullYear().toString();
      var lastFri = lastFriYear + "-" + lastFriMonth + "-" + lastFriDay
      console.log(lastFri)
      */

      var lastFri = new Date(),
          day = lastFri.getDay(),
          diff = (7 - 5 + day) % 7;
      lastFri.setDate(lastFri.getDate() - diff);
      var lastFriFormatted = lastFri.toISOString().split("T")
      console.log(lastFriFormatted[0])


      var nxtFri = lastFri
      nxtFri.setDate(lastFri.getDate() + 8);
      var nxtFriFormatted = nxtFri.toISOString().split("T")
      console.log(nxtFriFormatted[0])





      /* The URL is the API Requst Link */
      for (var server in servers) {
        var apiRequest = "https://api.battlemetrics.com/players/" + playerBMID + "/time-played-history/" + servers[server] + "?start=" + lastFriFormatted[0] + "T14%3A00%3A00Z&stop=" + nxtFriFormatted[0] + "T14%3A00%3A00Z";
        /* Does the API Request */
        Http.open("GET", apiRequest, false);
        Http.setRequestHeader("Authorization", "Bearer " + apiKey1);
        Http.send();
        var response = Http.responseText.split("{");

        /* Process the Data */
        var tempTotal = 0;
        for (var i in response) {
          if (response[i].includes('"value"')) {
            var temp = response[i].split(",");
            temp = temp[1].replace("}}", "").replace("]}", "").split(":");
            total += parseInt(temp[1]);
            tempTotal += parseInt(temp[1]);
          }
        }
      }
      for (var server in lowPopServers) {
        var apiRequest = "https://api.battlemetrics.com/players/" + playerBMID + "/time-played-history/" + lowPopServers[server] + "?start=" + lastFri + "T00%3A01%3A00Z&stop=" + nxtFri + "T23%3A59%3A00Z";

        /* Does the API Request */
        Http.open("GET", apiRequest, false);
        Http.setRequestHeader("Authorization", "Bearer " + apiKey);
        Http.send();
        var response = Http.responseText.split("{");

        /* Process the Data */
        var lowPopTempTotal = 0;
        for (var i in response) {
          if (response[i].includes('"value"')) {
            var lowPoptemp = response[i].split(",");
            lowPoptemp = lowPoptemp[1].replace("}}", "").replace("]}", "").split(":");
            lowPopTotal += parseInt(lowPoptemp[1]);
            lowPopTempTotal += parseInt(lowPoptemp[1]);
          }
        }
      }


      var hours = (total / 3600).toFixed(2)
      var lowPopTotalHours = (lowPopTotal / 3600).toFixed(2)
      if (hours >= 10) {
        var hoursmessage = (":white_check_mark: **Total Hours:** " + hours)
      } else {
        var hoursmessage = (":x: **Total Hours:** " + hours)
      }
      if (lowPopTotalHours >= 2) {
        var lowPopHoursMessage = (":white_check_mark: **Low Pop Hours:** " + lowPopTotalHours)
      } else {
        lowPopHoursMessage = (":x: **Low Pop Hours:** " + lowPopTotalHours)
      }


      const lowPopEmbed = {
        "title": "Staff Hour Check Response (since last Friday at 7pm EST)",
        "color": 2236962,
        "description": "• " + hoursmessage + "\n• " + lowPopHoursMessage,
        "timestamp": "",
        "author": {
          "name": playerName,
          "url": "https://www.battlemetrics.com/rcon/players/" + playerBMID,
          "icon_url": playerAvatar
        },
        "image": {},
        "thumbnail": {
          "url": "https://i.imgur.com/PSA07y2.png"
        },
        "footer": {
          "text": "Powered by BattleMetrics API • Bot Development by SSH#4388",
          "icon_url": "https://i.imgur.com/Hgy99hw.png"
        },
        "fields": []
      }
      message.channel.send({embed: lowPopEmbed})
    }
  }
  if (command === "hourcheck") {
    var start = new Date().getTime();
    if(! args.toString().match(/^765611/)){
      message.channel.send("<@!" + message.author.id + ">, You didn't put a valid steamID64. Try again.")
    }else{

    /******************/
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var Http = new XMLHttpRequest();
    /* Get BattleMetrics ID from SteamID64 */
    var apiGetBMID = "https://api.battlemetrics.com/players/match"
    var jsonForGettingBMID = "{\"data\":[{\"type\":\"identifier\",\"attributes\":{\"type\":\"steamID\",\"identifier\":\"" + args + "\"}}]}"

    Http.open("POST", apiGetBMID, false);
    Http.setRequestHeader("Authorization", "Bearer " + apiKey1);
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(jsonForGettingBMID);
    var apiResponse = Http.responseText
    /* Parse response from BM API to get player ID */
    var string = apiResponse
    var string = string.split(",");
    for (var i in string) {
      if ((string[i].includes('"id":')) && (string[i].includes("}}"))) {
        string = string[i];
        break;
      }
    }
    string = string.replace("}}", "").split(":");
    string = string[1];
    string = string.replace('"', "").replace('"', "");


    var string1 = apiResponse
    var string1 = string1.split(",");
    for (var value in string1) {
      if ((string1[value].includes('"personaname":'))) {
        string1 = string1[value];
        break;
      }
    }
    string1 = string1.split(":");
    string1 = string1[1];
    playerName = string1.replace('"', "").replace('"', "");


    var string2 = apiResponse
    var string2 = string2.split(",");
    for (var value in string2) {
      if ((string2[value].includes('"avatarfull":'))) {
        string2 = string2[value];
        break;
      }
    }
    string2 = string2.split(":");
    string2 = string2[2];
    playerAvatar = string2.replace('"', "").replace('"', "");
    playerAvatar = ("https:" + playerAvatar)




    var totalHoursApiCall = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=" + steamApiKey + "&steamid=" + args + "&format=json"
      console.log(totalHoursApiCall)
    Http.open("GET", totalHoursApiCall, false)
    Http.send()
    totalHoursApiCallResponse = Http.responseText
    if( ! totalHoursApiCallResponse.includes("Rust")) {
      var rustPlaytimeHours = "Private Profile/Hours/Rust not recently played"
    }else {


    var TotalSecondsPlayed = 0;
    var tempSeconds = 0;
    var array1 = [0, 0, 0];
    var string4 = Http.responseText
    var string4 = string4.split("}")
    var string5 = ""
    for (var value in string4) {
      if (string4[value].includes('Rust')) {
        string5 = string4[value]
        break;
      }
    }
    var string5 = string5.split(",")
    for (var value in string5) {
      if (string5[value].includes('playtime_forever')) {
        string6 = string5[value].replace('"playtime_forever":', "")
        rustPlaytimeHours = ((parseInt(string6))/60).toFixed(2)
        break;
      }
    }

    }
    /* Initalization */
    var total = 0;
    var lowPopTotal = 0;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var Http = new XMLHttpRequest();
    var servers = [5192962, 3260244, 9113699, 3657891, 2703938, 3481329, 6841036, 4032701, 6842591, 5192054, 2930255, 2801208, 3665933, 3973236, 3044995, 8939401, 2801795, 3410403];
    /* OLD DATE LOGIC
    // Get Tomorrow's Date
    var today = new Date()
    today = new Date().setDate(today.getDate() + 1) // <-- The +1 is tomorrow's date from the current date.
    today = new Date(today);
    var todayDay = String(today.getDate()).padStart(2, '0');
    var todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    var todayYear = today.getFullYear();
    var curDay = todayYear + "-" + todayMonth + "-" + todayDay
    console.log(curDay)
    // Get Date 30-ish Days Ago
    var priorDate = new Date().setDate(today.getDate() - 30) // <-- The -32 is 32 days ago from the current date.
    priorDate = new Date(priorDate);
    var priorDay = String(priorDate.getDate()).padStart(2, '0');
    var priorMonth = String(priorDate.getMonth() + 1).padStart(2, '0');
    var priorYear = priorDate.getFullYear();
    var priorDate = priorYear + "-" + priorMonth + "-" + priorDay
      console.log(priorDate)
      */
          var priorDate = new Date();
          priorDate.setMonth(priorDate.getMonth() - 1);
      var priorDateFormatted = priorDate.toISOString().split("T")

      var curDay = new Date()
      var curDayFormatted = curDay.toISOString().split("T")

      /* The URL is the API Requst Link */


      for (var server in servers) {
      var apiRequest = "https://api.battlemetrics.com/players/" + string + "/time-played-history/" + servers[server] + "?start=" + priorDateFormatted[0] + "T00%3A01%3A00Z&stop=" + curDayFormatted[0] + "T23%3A59%3A00Z&access_token=" + apiKey1;

      /* Does the API Request */
        Http.open("GET", apiRequest, false);
        Http.setRequestHeader("Authorization", "Bearer " + apiKey1);

        Http.send();
        var response = Http.responseText.split("{");

      /* Process the Data */
      var tempTotal = 0;
      for (var i in response) {
        if (response[i].includes('"value"')) {
          var temp = response[i].split(",");
          temp = temp[1].replace("}}", "").replace("]}", "").split(":");
          total += parseInt(temp[1]);
          tempTotal += parseInt(temp[1]);
        }
      }
    }

    pastMonthHours = (total/3600).toFixed(2)
    if (rustPlaytimeHours >= 30) {
      var HoursPlayedmessage = (":white_check_mark: **Total Rust Hours:** " + rustPlaytimeHours)
    } else
      var HoursPlayedmessage = (":x: **Total Rust Hours:** " + rustPlaytimeHours)
    if (pastMonthHours >= 20) {
      var pastMonthHoursMessage = (":white_check_mark: ** IFN Hours for Past 30 Days:** " + pastMonthHours)
    } else {
      var pastMonthHoursMessage = (":x: **IFN Hours for Past 30 Days:** " + pastMonthHours)
    }
    const totalHourCheckEmbed = {
      "title": "Player Hour Check Response",
      "color": 2236962,
      "description": "• " + HoursPlayedmessage + "\n• " + pastMonthHoursMessage,
      "timestamp": "",
      "author": {
        "name": playerName,
        "url": "https://www.battlemetrics.com/rcon/players/" + string,
        "icon_url": playerAvatar
      },
      "image": {},
      "thumbnail": {
        "url": "https://i.imgur.com/PSA07y2.png"
      },
      "footer": {
        "text": "Powered by BattleMetrics API • Bot Development by SSH#4388",
        "icon_url": "https://i.imgur.com/Hgy99hw.png"
      },
      "fields": []
    }
    message.channel.send({embed: totalHourCheckEmbed})
      var rustPlaytimeHours

      }
    var end = new Date().getTime();
    var time = end - start;
    console.log('Execution time: ' + time);
  }


}});
