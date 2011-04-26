/**
* jQuery Image Cache
*
* Load images from browser local storage
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.2
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: http://dumitruglavan.com/jquery-image-cache-plugin-cache-images-in-browsers-local-storage/
* Official jQuery plugin page: http://plugins.jquery.com/project/jquery-image-cache
* Find source on GitHub: https://github.com/doomhz/jQuery-Image-Cache
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
				var $img = $(img);
				var src = $img.attr('src') || $img.attr('data-src');
				if (localStorage) {
					var localSrc = localStorage[src];
					if (localSrc && /^data:image/.test(localSrc)) {
						$img.attr('src', localSrc);
					} else {
						$img.attr('src', src);
						if (localStorage[src] !== 'pending') {
							localStorage[src] = 'pending';
							$.ajax({
								url: self.config.base64ImageEncoderPath + src,
								success: function (data) {
									localStorage[src] = data;
								},
								error: function () {
									localStorage[src] = 'error';
								}
							});
						}
					}
				}
			});
		});
		
		return this;
	}
})(jQuery);