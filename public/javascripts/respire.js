(function($){
	var methods = {
	  init: function(options){
      options = $.extend({}, $.fn.respire.defaults, options);
       
      return this.each(function(){
          var self = $(this),
          		toggleLink, contents;

          toggleLink = self.find(options.toggleLink);
          contents = self.contents()
          	.filter(function(){ return this.className != options.toggleLink.slice(1); })
          	.text();

          self.data('respireData', {
              options:options
          });
           
          // Event Handlers
          toggleLink.click(functions.toggle);
          console.log(contents);
      });
	  }
	};

	var functions = {
		toggle: function(evt){
			var self = $(this);

			evt.preventDefault();
			self.toggleClass('inhale');

			if (self.hasClass('inhale')) {
				self.text('Show Less');
			} else {
				self.text('Show More');
			}
		}
	};

	$.fn.respire = function(method) {
	  // Method calling logic
	  if (methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	  } else if (typeof method === 'object' || ! method) {
	      return methods.init.apply(this, arguments);
	  } else {
	      $.error('Method ' +  method + ' does not exist');
	  }
	}

	$.fn.respire.defaults = {
		toggleLink: '.toggle' // The link used to toggle between 'Show More' and 'Show Less'
	};
})(jQuery);