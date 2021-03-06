(function( $ ) {

    $.fn.slider = function(options) {
        var $this = this;
        if (window.matchMedia('(max-width: 767px)').matches && window.matchMedia('(min-width: 435px)').matches) {
            var s_width = 400;
            var s_height = 430;
        } else if (window.matchMedia('(min-width:768px)').matches) {
            var s_width = 800;
            var s_height = 500;
        } else if (window.matchMedia('(max-width:435px)').matches) {
            var s_width = 320;
            var s_height = 360;
        }
        var settings = {
            // Dimensions
            'width'         :   s_width,
            'height'        :   s_height,
            // Settings
            'wait'          :   4000,
            'fade'          :   750,
            'direction'     :   'left',
            'showControls'  :   true,
            'showProgress'  :   true,
            'hoverPause'    :   true,
            'autoplay'      :   true,
            'randomize'     :   false,
            // Callbacks
            'slidebefore'   :   function() {},
            'slideafter'    :   function() {},
            'rewind'        :   function() {}
        };

        var _timer = false;
        var _last = false;
        var _this = false;

        var _cycle = function() {
            clearTimeout(_timer);

            _last = _this;

            if (settings.direction == 'right') {
                _this = _this.prev('.jquery-slider-element');
            } else {
                _this = _this.next('.jquery-slider-element');
            }

            if (!_this.length) {
                _rewind();
            }

            _draw();

            if (!$this.hasClass('jquery-slider-paused') && settings.autoplay) {
                _timer = setTimeout(_cycle, settings.wait);
            }
        };

        var _rewind = function() {
            if (settings.direction == 'right') {
                _this = $this.children('.jquery-slider-element').last();
            } else {
                _this = $this.children('.jquery-slider-element').first();
            }
            settings.rewind(_this, $this);
        };

        var _draw = function() {
            $this.addClass('jquery-slider-sliding');
            if (settings.showProgress) {
                $this.find('.jquery-slider-page').removeClass('jquery-slider-page-current');
                $this.find('.jquery-slider-page:eq(' + (_this.nextAll('.jquery-slider-element').length) + ')').addClass('jquery-slider-page-current');
            }
            settings.slidebefore(_this, $this);

            if (settings.direction == 'right') {
                _this.show().css('left', -settings.width);
            } else {
                _this.show().css('left', settings.width);
            }

            _this.stop(true, true).animate({
                'left'      :   (settings.direction == 'right' ? '+=' : '-=') + settings.width + 'px'
            }, {
                'duration'  :   settings.fade,
                'complete'  :   function() {
                    settings.slideafter(_this, $this);
                    $this.removeClass('jquery-slider-sliding');
                }
            });
            if (_last) {
                _last.stop(true, true).animate({
                    'left'      :   (settings.direction == 'right' ? '+=' : '-=') + settings.width + 'px'
                }, {
                    'duration'  :   settings.fade
                });
            }
        };

        var _next = function() {
            if ($this.hasClass('jquery-slider-sliding')) return;
            var direction = settings.direction;
            $this.addClass('jquery-slider-paused');
            settings.direction = 'left';
            _cycle();
            settings.direction = direction;
        };

        var _prev = function() {
            if ($this.hasClass('jquery-slider-sliding')) return;
            var direction = settings.direction;
            $this.addClass('jquery-slider-paused');
            settings.direction = 'right';
            _cycle();
            settings.direction = direction;
        };

        var _init = function() {
            if (options) {
                $.extend( settings, options );
            }
            if (settings.hoverPause) {
                $this.bind({
                    'mouseenter': function() {
                        $this.addClass('jquery-slider-paused');
                        clearTimeout(_timer);
                    },
                    'mouseleave': function() {
                        $this.removeClass('jquery-slider-paused');
                        if (settings.autoplay) {
                            _timer = setTimeout(_cycle, settings.wait);
                        }
                    }
                });
            }

            var positionEls = $('<span class="jquery-slider-pages"></span>');
            $this.addClass('jquery-slider').width(settings.width).height(settings.height);
            $this.children().each(function() {
                var $tmp = $(this);
                _this = $(this).addClass('jquery-slider-element');
                positionEls.prepend($('<span class="jquery-slider-page"></span>').bind('click', function() {
                    if ($this.hasClass('jquery-slider-sliding')) return;
                    if (_this.get(0) == $tmp.get(0)) return;
                    _last = _this;
                    _this = $tmp;
                    _draw();
                }));
            });

            if (settings.showProgress) {
                $this.append(positionEls);
            }

            if (settings.showControls) {
                var controlPrev = $('<span class="jquery-slider-control jquery-slider-control-prev"><img src="./images/catting-arrow-reverse.svg"></span>').bind('click', function() {_prev();});
                var controlNext = $('<span class="jquery-slider-control jquery-slider-control-next"><img src="./images/catting-arrow.svg"></span>').bind('click', function() {_next();});
                $this.append(controlPrev);
                $this.append(controlNext);
            }

            if (settings.randomize) {
               _this = $this.children('.jquery-slider-element').eq(parseInt($this.children('.jquery-slider-element').length * Math.random()));
            }

            _cycle();
        };

        _init();
    };

})( jQuery );
