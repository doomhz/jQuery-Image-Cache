/**
* jQuery Image Cache
*
* Load images from browser local storage
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.0
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: https://github.com/doomhz/jQuery-Image-Cache
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
;(function ($) {
	$.fn.imageCache = function (options) {
		this.config = {
			base64ImageEncoderPath: 'get_image.php?id='
		};
		$.extend(this.config, options);

		var self = this;
		var $self = $(this);

		$(document).ready(function () {
			$(self).each(function (i, img) {
				var src = $(img).attr('src');
				if (localStorage) {
					var localSrc = localStorage[src];
					if (localSrc) {
						$(img).attr('src', localSrc);
					} else {
						$.get(self.config.base64ImageEncoderPath + src, function (data) {
							localStorage[src] = data;
							$(img).attr('src', data);
						});
					}
				}
			});
		});
		
		return this;
	}
})(jQuery);