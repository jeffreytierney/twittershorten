(function() {
  window.BITLY={
    user: "twittershorten",
    key: "R_bcfdce1ff4c58e5f6426cc312e2c0899",
    checkKey: function() {
      var scr = jQuery("#bitly_twitter_shorten_script");
      if(scr.length) {
        var str = scr.attr("src");
        if(str.indexOf("?") > -1) {
          str = str.substring(str.indexOf("?")+1);
          var pairs = str.split("&"), params = {};
          var i = pairs.length;
          while (i) {
            var pair = pairs[--i].split("=");
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
          if(params["user"] && params["key"]) {
            BITLY.user = params["user"];
            BITLY.key = params["key"];
          }
        }
      }
    },
    shortenLink: function(link, callback) {
      jQuery.getJSON("http://api.bit.ly/v3/shorten?longUrl="+encodeURIComponent(link)+"&login="+BITLY.user+"&apiKey="+BITLY.key+"&callback=?", callback);
    },
    shorten: function() {
      jQuery("textarea").each(function(i, val) { if($(val).val() != "") BITLY.shortenAllLinks($(val)); });
    },
    shortenAllLinks: function(textarea) {
      var text = textarea.val() + " ";
      var re = new RegExp("(http[s]*\:\/\/[^ ]+)", "gi");
      var links = text.match(re);
      if(links && links.length) {
        for(var i=0, len = links.length; i<len; i++) {
          var _link = links[i];
          (function(link) {
            BITLY.shortenLink(link, function(data) {
              if(data && data.data && !data.errorCode) {
                if(data.data.long_url == link && data.data.url) {
                  textarea.val(textarea.val().replace(link, data.data.url));
                }
              }
            });
          })(_link);
        }
      }

      return this;
    }
  }
  BITLY.checkKey();
  BITLY.shorten();
})();