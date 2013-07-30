(function($){
	var methods = {
	  init: function(options){
      options = $.extend({}, $.fn.respire.defaults, options);
       
      return this.each(function(){
          var self = $(this),
          		toggleBtn, textNode, fullContents, truncatedContents;

          toggleBtn = self.find(options.toggleBtn);
          fullContents = self.contents().filter(function(){ 
          	if (this.className === undefined) {
          		return true;
          	}
          	return this.className.indexOf(options.toggleBtn.slice(1)) == -1; 
          });
          truncatedContents = functions.truncate(fullContents.text(), options.truncateLength);
          console.dir(fullContents.context)

          self.data('respireData', {
              options: options,
              fullContents: fullContents,
              truncatedContents: truncatedContents
          });
           
          // Event Handlers
          toggleBtn.on('textUpdate', functions.replaceText.bind(self));
          toggleBtn.click(functions.toggle);
      });
	  }
	};

	var functions = {
		replaceText: function(){
			var data = this.data('respireData'),
					toggleBtn = this.find(data.options.toggleBtn),
					newContent;

			this.contents().filter(function(){
				if (this.className === undefined) {
          return true;
        }
        return this.className.indexOf(data.options.toggleBtn.slice(1)) == -1; 
			}).remove();

			if (toggleBtn.hasClass('inhale')) {
				newContent = data.fullContents;
			} else {
				newContent = data.truncatedContents;
			}
			
			this.prepend(newContent);
		},

		toggle: function(evt){
			var self = $(this);

			evt.preventDefault();
			self.toggleClass('inhale');

			if (self.hasClass('inhale')) {
				self.text('Show Less');
			} else {
				self.text('Show More');
			}

			self.trigger('textUpdate');
		}, 

		truncate: function(str, maxLength){
      if (str.length > maxLength){
        str = str.substring(0, maxLength + 1); 
        str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
        str = str + '...';
      }
      return str;
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
		toggleBtn: '.toggle', 		// The link used to toggle between 'Show More' and 'Show Less'
		truncateLength: 150 			// No. of characters to truncate text
	};
})(jQuery);