var SlackBot = require('slackbots');

// create a bot 
var bot = new SlackBot({
    token: 'xoxb-11024339157-d0D55lrBzmFZDbczLaF08Nqo', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'PointsBot'
});

var makeMention = function(userId) {
    return '<@' + userId + '>';
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

bot.on('start', function()
{
	// more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        icon_emoji: ':penis:'
		};
    //bot.postMessageToUser('username', 'meow!', params);
    //bot.postMessageToChannel('general', 'meow!', params);
	
	//bot.postMessageToGroup('emorangers', 'like this', params);
	bot.postMessageToGroup('emorangers', ':penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis:', params);
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
        icon_emoji: ':penis:'
	};
	// all ingoing events https://api.slack.com/rtm 
    console.log(message);
	//bot.postMessageToGroup('emorangers', 'DICK TIME LOL :penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis::penis:', params);
	var channelList = bot.getChannels();
	
	channelList.then( function(data)
	{
		
		console.log(data);
	});
	
	if(message.type === 'message' && isDirect(bot.name, message.text) == true)
	{
		
	}
	/*
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var user = slack.getUserByID(message.user);

    if (message.type === 'message' && isDirect(slack.self.id, message.text)) 
	{
        var trimmedMessage = message.text.substr(makeMention(slack.self.id).length+1).trim();
		
		var messageArray = trimmedMessage.split(" ");
        
        var onlineUsers = getOnlineHumansForChannel(channel)
            .filter(function(u) { return u.id != user.id; })
            .map(function(u) { return makeMention(u.id); });
			
		if(messageArray.length > 3)
		{
			bot.postMessageToUser(user, 'nope', params);
		}
		
		
		else
		{
			//channel.send(onlineUsers.join(', ') + '\r\n' + user.real_name + ' said' + trimmedMessage);
			channel.send(messageArray.join(', '));
			
		}
        
        
    }
	*/
});