(function ($) {
    var methods = {
        init: function (options) {
            var self = this;

            options = $.extend({
                // Default vertical position
                defaultVertical : 'start',
                // Default horizontal position
                defaultHorizontal : 'start'
            }, options);

            return this.each(function () {
                var $this = $(this)
                    .data('goverlay', {
                        vertical : options.defaultVertical,
                        horizontal : options.defaultHorizontal
                    });

                var overlay = $('<div></div>')
                    .addClass('g-modal-background')
                    .on('click', function (evt) {
                        if ($(evt.target).hasClass('g-modal-background')) {
                            methods.close.call(self);
                        }
                    });

                var container = $('<div></div>')
                    .addClass('g-overlay')
                    .css('position', 'absolute')
                    .append($this)
                    .appendTo(overlay);
            });
        },

        open: function (target, vertical, horizontal) {
            var $this = $(this);
            var data = $this.data('goverlay');

            vertical = vertical || data.vertical;
            horizontal = horizontal || data.horizontal;

            $this.parents('.g-modal-background').appendTo($('body'));

            var container = $this.parents('.g-overlay');
            var $target = $(target);
            var offset = $target.offset();
            container
                .css('top', (offset.top + $target.outerHeight()) + 'px')
                .css('left', offset.left + 'px');

            return this;
        },

        close: function () {
            var $this = $(this);
            $this.parents('.g-modal-background').detach();
            return this;
        }
    };

    /**
     * Block to create an overlay
     */
    $.fn.gOverlay = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.myPlugin');
        }
    }

}(jQuery));