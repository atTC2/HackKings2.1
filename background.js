


chrome.runtime.onMessage.addListener(function(request) {

	Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

	var pusher = new Pusher('9d3ca23fe4e0cd26c73c', {
		encrypted: true,
    authEndpoint: 'http://realtime-browsing.tomclarke.xyz/index.php'
  });

	channel = pusher.subscribe("private-" + request.token);
	
	if(request.from == "host"){
		alert("from the host");
	    channel.bind('client-user_joined', function(data) {
		  channel.trigger("client-website_link", { website: website });
		});
	} else {
		channel.trigger("client-user_joined", { yo: "man" });

		channel.bind('client-website_link', function(data) {
		  	alert("got the link back");
		});
	}


});
