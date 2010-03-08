//
// OS X Pref Pane style transitions

(function(context, $) {
  
    function SexyTabs($actuator, $container, options) {
        
        this.$actuator      = $actuator;
        this.$container     = $container;
        this.busy           = 0;
        this.curr           = 0;
        
        this.options = $.extend({
          onclick: function() {},
          mode: 'tabs'
        }, options || {});
        
        this.$container.find('> *').wrap($('<div/>').css({padding: 0, margin: 0, border: 'none', overflow: 'hidden'}));
        this.$boxes = $container.find('> *');
        this.length = this.$boxes.length;
        
        this.$boxes.attr('sexy-original-height', function() { return $(this).height(); });
        this.$boxes.filter(':gt(0)').hide();
        
        var self = this;
        this.$actuator.click(function() {
            if (self.busy > 0) return;
            
            switch (self.options.mode) {
                case 'tabs':
                    var moveTo = self.$actuator.index(this);
                    if (moveTo == self.curr) return false; 
                    self.curr = moveTo;
                    break;
                case 'cycle':
                    self.curr++;
                    if (self.curr >= self.length) self.curr = 0;
                    break;
            }
            
            self.toggle(self.$boxes.filter(':visible'), self.$boxes.eq(self.curr));
            self.options.onclick.call(self, self.curr, this);
            
            return false;
        });
    
    };
    
    SexyTabs.prototype = {
        toggle: function($active, $target) {
            $target.css({
                width: $active.width(),
                height: $active.height(),
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'block'
            });

            var targetHeight = parseInt($target.attr('sexy-original-height'), 10);
            var self = this;

            self.busy = 2;
            $active.animate({height: targetHeight, opacity: 0}, function() { self.busy-- });
            $target.animate({height: targetHeight, opacity: 1}, function() {
                $target.css({width: 'auto', height: 'auto', position: 'relative'});
                $active.css({display: 'none', opacity: 1, height: 'auto'});
                self.busy--; 
            });
        }
    };
  
    context.SexyTabs = SexyTabs;
    
})(this, jQuery);