(function() {
  window.BITLY={
    shortenLink: function(link, callback) {
      var bitlyuser = "twittershorten";
      var bitlykey = "R_bcfdce1ff4c58e5f6426cc312e2c0899";
      var _this = this;
      jQuery.getJSON("http://api.bit.ly/v3/shorten?longUrl="+encodeURIComponent(link)+"&login="+bitlyuser+"&apiKey="+bitlykey+"&callback=?", callback);
    },
    shorten: function() {
      jQuery("textarea").each(function(i, val) { if($(val).val() != "") BITLY.shortenAllLinks($(val)); });
    },
    shortenAllLinks: function(textarea) {
      var text = textarea.val() + " ";
      var re = new RegExp("(http[s]*\:\/\/[^ ]+)", "gi");
      var links = text.match(re);
      if(links && links.length) {
        var _this = this;
        for(var i=0, len = links.length; i<len; i++) {
          var _link = links[i];
          (function(link, _this) {
            _this.shortenLink(link, function(data) {
              if(data && data.data && !data.errorCode) {
                if(data.data.long_url == link && data.data.url) {
                  textarea.val(textarea.val().replace(link, data.data.url));
                }
              }
            });
          })(_link, _this);
        }
      }

      return this;
    }
  }
  window.BITLY.shorten();
})();