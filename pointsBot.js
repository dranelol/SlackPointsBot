var SlackBot = require('slackbots');

var BOT_ID = '<@U0B0Q9Z4M>';

Object.prototype.toArray=function()
{
    var arr=new Array();
    for( var i in this ) {
        if (this.hasOwnProperty(i)){
            arr.push(this[i]);
        }
    }
    return arr;
};

// create a bot 
var bot = new SlackBot({
    token: 'xoxb-11024339157-d0D55lrBzmFZDbczLaF08Nqo', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'PointsBot'
});

var botUserID;

var users;

var channels;

var userArray;

var channelArray;

var groups;

var groupArray;

var makeMention = function(userId) {
    return '<@' + userId + '>';
};

var stripMention = function(userStr)
{
	return userStr.substring(2, userStr.length-1);
};

var isDirect = function(userId, messageText) {
    var userTag = makeMention(userId);
    return messageText &&
           messageText.length >= userTag.length &&
           messageText.substr(0, userTag.length) === userTag;
};

var getOnlineHumansForChannel = function(channel) {
    if (!channel) return [];
	//return channel.members;
	
    return (channel.members || []) .map
	(
		function(id) 
		{ 
			return slack.users[id]; 
		}
	).filter
	(
		function(u) 
		{ 
			return !!u && !u.is_bot && u.presence === 'active'; 
		}
	);
		
};

var filterByUser = function (idToCheck)
{
	return function(element)
	{
		return element.id === idToCheck;
	}
};

var filterByChannel = function (idToCheck)
{
	return function(element)
	{
		return element.id === idToCheck;
	}
};

var filterByGroup = function (idToCheck)
{
	return function(element)
	{
		return element.id === idToCheck;
	}
};

bot.on('start', function()
{
	// more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        icon_emoji: ':cat:'
		};
    //bot.postMessageToUser('username', 'meow!', params);
    //bot.postMessageToChannel('general', 'meow!', params);
	
	//bot.postMessageToGroup('emorangers', 'like this', params);
	//bot.postMessageToGroup('emorangers', 'POINTS BOT ONLINE', params);
	
	var botUser = bot.getUser('pointsbot');
		
	botUser.then( function(data)
	{
		botUserID = data.id;
		console.log(makeMention(botUserID));
	});
	
	var userList = bot.getUsers();
	
	userList.then (function(data)
	{
		//console.log(data);
		users = data;
		console.log("asd");
		userArray = users['members'];
	});
	
	var channelList = bot.getChannels();
	
	channelList.then (function(data)
	{
		channels = data;
		channelArray = channels['channels'];
		//console.log(data);
	});
	
	var groupList = bot.getGroups();
	
	groupList.then (function (data)
	{
		groups = data;
		groupArray = groups['groups'];
	});
	
	
	
	
	
	
	
});




bot.on('open', function () 
{
	//console.log(bot.getChannels.length);
	/*
    var channels = Object.keys(SlackBot.channels)
        .map(function (k) { return SlackBot.channels[k]; })
        .filter(function (c) { return c.is_member; })
        .map(function (c) { return c.name; });

    var groups = Object.keys(SlackBot.groups)
        .map(function (k) { return SlackBot.groups[k]; })
        .filter(function (g) { return g.is_open && !g.is_archived; })
        .map(function (g) { return g.name; });

    console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);

    if (channels.length > 0) {
        console.log('You are in: ' + channels.join(', '));
    }
    else {
        console.log('You are not in any channels.');
    }

    if (groups.length > 0) {
       console.log('As well as: ' + groups.join(', '));
    }
	*/
});

bot.on('message', function(message) 
{
	var params = {
        icon_emoji: ':cat:'
	};
	// all ingoing events https://api.slack.com/rtm 
    //console.log(message);
	//bot.postMessageToGroup('emorangers', 'DICK TIME LOL :penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis:', params);
	var channelID = message.channel;
	
	
	
	//console.log(users['members']);
	
	
	
	//console.log(message);
	
	if(message.type === 'message' && isDirect(botUserID, message.text))
	{
		//console.log(bot.name);
		
		
		//bot.postMessageToGroup('emorangers', 'sup?', params);
		
		var messageArray = message.text.split(" ");
		
		messageLength = messageArray.length;
		
		var messageToSend = "";
		
		// change this shit to a regex
		
		if(messageArray[1] != 'give' && messageArray[1] != 'take')
		{
			bot.postMessageToGroup('emorangers', 'Wrong format!', params);
		}
		
		else
		{
			var possibleUser = stripMention(messageArray[2]);
			
			
			
			//console.log(users);
			
			//console.log(usersArray);
			
			var possibleUserFilter = userArray.filter(filterByUser(possibleUser));
			
			if(possibleUserFilter.length != 1)
			{
				bot.postMessageToGroup('emorangers', "That user doesn't exist!", params);
			}
			
			else
			{
				//console.log(possibleUserFilter);
				
				
				var userFromID = message.user;
				var userToID = possibleUserFilter[0].id;
				var userFromName = userArray.filter(filterByUser(userFromID))[0].name;
				var userToName = possibleUserFilter[0].name;
				
				
				
				if(userToID == userFromID)
				{
					bot.postMessageToGroup('emorangers', "You can't give/take points to/from yourself!", params);
				}
				
				else
				{
					if(messageArray[1] == 'give')
					{
						messageToSend += makeMention(userFromID) + ' gave a point to ' + makeMention(userToID)  + '!';
						//bot.postMessageToGroup('emorangers', makeMention(userFromID) + ' gave a point to ' + makeMention(userToID)  + '!', params);
						
					}
					
					if(messageArray[1] == 'take')
					{
						messageToSend += makeMention(userFromID) + ' took a point from ' + makeMention(userToID)  + '!'
						//bot.postMessageToGroup('emorangers', makeMention(userFromID) + ' took a point from ' + makeMention(userToID)  + '!', params);
					}
				
					if(messageLength == 3)
					{
						messageToSend += '\n' + 'Reason: No reason!';
						//bot.postMessageToGroup('emorangers', "Reason: No reason!", params);
					}
					
					else
					{
						var reasonMessage = "";
						
						for(i = 3;i<messageLength;i++)
						{
							reasonMessage = reasonMessage + " " + messageArray[i];
						}
						
						messageToSend += '\n' + 'Reason: ' + reasonMessage;
						
						//bot.postMessageToGroup('emorangers', "Reason: " + reasonMessage, params);
					
					}
					groupID = groupArray.filter(filterByGroup(message.channel));
					channelID = channelArray.filter(filterByChannel(message.channel));
					
					//console.log(channelID);
					//console.log(groupID);
					
					if(channelID.length > 0)
					{
						console.log(channelID[0].name);
						
						bot.postMessageToChannel(channelID[0].name, messageToSend, params);
					}
					
					if(groupID.length > 0)
					{
						console.log(groupID[0].name);
						
						bot.postMessageToGroup(groupID[0].name, messageToSend, params);
					}
					//console.log(message.channel);
				
					
				}
			}
		}
		
	}
});