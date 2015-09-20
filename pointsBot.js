module.exports = function (req, res, next) 
{
  // default roll is 2d6
  var matches = false;
  var times = 2;
  var die = 6;
  var rolls = [];
  var total = 0;
  var botPayload = {};
  
  if (req.body.text) 
  {
    // parse roll type if specified
    if(matches)
	{
		die = 7;
    } 
	else 
	{
      // send error message back to user if input is bad
      return res.status(200).send('<number>d<sides>');
    }
  } 
  
  
	botPayload.text = req.body.user_name + ' says hi';
  
	botPayload.username = 'pointsbot';
	
	botPayload.channel = req.body.channel_id;
	
	botPayload.icon_emoji = ':jacob:';
	
	function send (payload, callback) 
	{
	  var path = process.env.INCOMING_WEBHOOK_PATH;
	  var uri = 'https://hooks.slack.com/services' + path;

	  request({
		uri: uri,
		method: 'POST',
		body: JSON.stringify(payload)
	  }, function (error, response, body) {
		if (error) {
		  return callback(error);
		}

		callback(null, response.statusCode, body);
		});
	}
	
	send(botPayload, function (error, status, body) 
	{
	  if (error) 
	  {
		return next(error);
	  } 
	  else if (status !== 200) 
	  {
		// inform user that our Incoming WebHook failed
		return next(new Error('Incoming WebHook: ' + status + ' ' + body));
	  } 
	  else 
	  {
		return res.status(200).end();
	  }
	});
						  



}