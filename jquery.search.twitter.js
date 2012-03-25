/* Search Twitter
 * A jQuery plugin for running searches on Twitter
 *
 * @author Gabriele Romanato <http://blog.gabrieleromanato.com/>
 * @version 1.0
 * @requires jQuery 1.5+
 *
 * Usage: $(element).searchTwitter({term: 'search term'})
 *
 * 
 */
   

(function($) {

	$.fn.searchTwitter = function(options) {
	
		var that = this;
		
		var settings = {
		
			term: ''
		
		};
		
		options = $.extend(settings, options);
		
		var Search = new function() {
		
			var url = 'http://search.twitter.com/search.json?callback=?&q=' + options.term;
			var html = '';
			
	
		// PrettyDate by John Resig. 
	
		var prettyDate = function(time) {
		
		var date = new Date((time || "").replace(/-/g,"/").replace(/TZ/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);
				
		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return;
		var v = day_diff == 0 && (
				diff < 60 && "now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "yesterday" ||
			day_diff < 7 && day_diff + " days ago" ||
			day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
		if (!v)
			window.console && console.log(time);
		return v ? v : '';
		}
		
		var formatTweet = function(text) {
		
			var tweet = '';
			
			tweet = text.replace(/(http:\/\/\S+)/g, '<a href="$1">$1</a>');
			tweet = tweet.replace(/\@(\w+)/g, '<a href="http://twitter.com/$1">@$1</a>');
			
			return tweet;
		
		};

			
		  this.run = function() {
			
				
			
				$.getJSON(url, function(data) {
				
				
					$.each(data.results, function(i, item) {
					
						
						
						html += '<div class="tweet">';
						html += '<div class="from">' + '<a href="http://www.twitter.com/'+ item.from_user +'/status/'+ item.id_str +'">' 
		  						+ item.from_user + '</a></div>';
						html += '<p>' + formatTweet(item.text) + '<small>' + prettyDate(item.created_at) + '</small></p>';
						html += '</div>';
		  			
						
					
					});
					
					$(html).appendTo(that);
				

				});
				
			
			};
		
		
		}();
		
	
	  return that.each(function() {
	  
	  	Search.run();
	  		  
	  
	  });
	
	
	};



})(jQuery);