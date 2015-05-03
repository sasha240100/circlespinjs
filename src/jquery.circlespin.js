/*!
 * jQuery Circlespin Plugin v.1.0
 * created [2015-05-03 12:56 AM]
 * TODO: Documentation
 *
 * Copyright 2015, siteprogcom@gmail.com or alexbuzin88@gmail.com
 * http://www.sitepro.ga/
 */

(function($) {
    $.fn.circlespin = function(options) {
		
        var obj = $(this);
		
		obj.parent().prepend(obj.clone().css({'visibility':'hidden', 'position':'absolute'}).attr('id','spincopy'));

        var settings = $.extend({
            width: obj.parent().find('#spincopy').width(),
            height: obj.parent().find('#spincopy').height(),
            left: obj.parent().find('#spincopy').offset().left - $(document).scrollLeft(),
            top: obj.parent().find('#spincopy').offset().top - $(document).scrollTop(),
            preangle: 0,
			autoupdate: false
        }, options);

        var isdrag = false;
        var startpos = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
        var clientpos, rotated = 0,
            mmx, mmy, waspos, plugin = this,
            roter = 0;
			
		this.updateSettings = function(options) {
			settings = $.extend({
				width: settings.width,
				height: settings.height,
				left: settings.left,
				top: settings.top,
				preangle: settings.preangle
        	}, options);
			
			return this.each(function() {
                return this;
            });
		}
		
		if(settings.autoupdate) {
			$(window).on('resize scroll spinning orientationchange scrollstop',function() {
				plugin.updateSettings({
					width: obj.parent().find('#spincopy').width(),
					height: obj.parent().find('#spincopy').height(),
					left: obj.parent().find('#spincopy').offset().left - $(document).scrollLeft(),
					top: obj.parent().find('#spincopy').offset().top - $(document).scrollTop(),
					preangle: settings.preangle,
					autoupdate: true
				});
				console.log(settings);
			});
		}
		
        this.startposUpdate = function(evt) {
            if (isdrag) {
                var startposk = {
                    left: false,
                    right: false,
                    top: false,
                    bottom: false
                };
                if (evt.clientX >= settings.left && evt.clientX < settings.left + settings.width * 0.5) {
                    startposk.left = true;
                }

                if (evt.clientX <= settings.left + settings.width && evt.clientX > settings.left + settings.width * 0.5) {
                    startposk.right = true;
                }


                if (evt.clientY >= settings.top && evt.clientY < settings.top + settings.height * 0.5) {
                    startposk.top = true;
                }

                if (evt.clientY <= settings.top + settings.height && evt.clientY > settings.top + settings.height * 0.5) {
                    startposk.bottom = true;
                }
            }
            return startposk;
        }

        this.getDegrees = function getRotationDegrees(object) {
            var matrix = object.css("-webkit-transform") ||
                object.css("-moz-transform") ||
                object.css("-ms-transform") ||
                object.css("-o-transform") ||
                object.css("transform");
            if (matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            } else {
                var angle = 0;
            }

            if (angle < 0) angle += 360;
            return angle;
        }

        this.setAngle = function(num) {
            $(obj).css({
                transform: 'rotate(' + num + 'deg)'
            });
            return this.each(function() {
                return this;
            });
        }

        this.getResult = function(min, max) {
            return min + roter / 360 * (max - min);
        }

        this.getAngle = function() {
            return plugin.getDegrees(obj)
        }
		



        $(this).on('mousedown vmousedown', function(evt) {
			plugin.each(function() {
                    $(this).trigger('spinstart', this)
            });
            isdrag = true;
            startpos = {
                left: false,
                right: false,
                top: false,
                bottom: false
            };
            clientpos = {
                x: evt.clientX,
                y: evt.clientY,
            }
            waspos = {
                x: evt.clientX,
                y: evt.clientY,
            }

            startpos = plugin.startposUpdate(evt);

            $(obj).css({
                'cursor': '-webkit-grabbing'
            });
        });
        $(document).on('mouseup vmouseup', function(evt) {
			if(isdrag) {
				plugin.each(function() {
                    $(this).trigger('spinend', this)
                });
			}
            isdrag = false;
            $(obj).css({
                'cursor': '-webkit-grab'
            });
            startpos = plugin.startposUpdate(evt);
        });

        $(document).on('mousemove vmousemove', function(evt) {

            if (isdrag) {
                plugin.each(function() {
                    $(this).trigger('spinning', this)
                });

                var vec1 = {
                    x: 0,
                    y: 0
                }
                var vec2 = {
                    x: 0,
                    y: 0
                }
                var vec3 = {
                    x: 0,
                    y: 0
                }

                vec1.x = waspos.x - settings.left - settings.width * 0.5;
                vec1.y = waspos.y - settings.top - settings.height * 0.5;

                vec2.x = evt.clientX - settings.left - settings.width * 0.5;
                vec2.y = evt.clientY - settings.top - settings.height * 0.5;

                vec3.x = evt.clientX - waspos.x;
                vec3.y = evt.clientY - waspos.y;

                vec1.long = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
                vec2.long = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
                var time = true;
                startpos = plugin.startposUpdate(evt);
                if (startpos.left == true && startpos.top == true) {
                    if ((waspos.y / evt.clientY) * evt.clientX >= waspos.x) {
                        time = true;
                    } else if ((waspos.y / evt.clientY) * evt.clientX < waspos.x) {
                        time = false;
                    }
                } else if (startpos.top == true && startpos.right == true) {
                    if ((evt.clientY / waspos.y) * evt.clientX <= waspos.x) {
                        time = false;
                    } else if ((evt.clientY / waspos.y) * evt.clientX > waspos.x) {
                        time = true;
                    }
                } else if (startpos.right == true && startpos.bottom == true) {
                    if ((waspos.y / evt.clientY) * evt.clientX <= waspos.x) {
                        time = true;
                    } else if ((waspos.y / evt.clientY) * evt.clientX > waspos.x) {
                        time = false;
                    }
                } else if (startpos.left == true && startpos.bottom == true) {
                    if ((evt.clientY / waspos.y) * evt.clientX <= waspos.x) {
                        time = true;
                    } else if ((evt.clientY / waspos.y) * evt.clientX > waspos.x) {
                        time = false;
                    }
                }

                var cosdif = (vec1.x * vec2.x + vec1.y * vec2.y) / (vec1.long * vec2.long);
                var dif = (1 - cosdif) * 360;
                if (!time) {
                    dif = -dif;
                }
                roter += dif * 2;
                var result = roter + settings.preangle;
                while (roter > 360) {
                    roter -= 360;
                }

                while (roter < 0) {
                    roter += 360;
                }

                $(obj).css({
                    transform: 'rotate(' + result + 'deg)'
                });

                waspos = {
                    x: evt.clientX,
                    y: evt.clientY,
                }

            }
        });

        return this.each(function() {
            return this;
        });

    }
})($);