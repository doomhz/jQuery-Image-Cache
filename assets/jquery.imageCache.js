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
* for (v in localStorage) {delete localStorage[v]} - quick clear localStorage when developing
*/
;(function ($) {
	$.fn.imageCache = function (options) {
		this.config = {
			base64ImageEncoderPath: 'get_image.php?id=',
			canvasEncoder: true // Experimental
		};
		$.extend(this.config, options);
		
		// Check for canvas support
		this.config.canvasEncoder = typeof HTMLCanvasElement != undefined ? this.config.canvasEncoder : false;

		var self = this;
		
		var getBase64Image = function (img) {
			try {
				var canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;

				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				
				var imgType = img.src.match(/(jpg|jpeg|png)/);
				if (imgType.length) {
					imgType = imgType[0] == 'jpg' ? 'jpeg' : imgType[0];
				} else {
					throw 'Invalid image type for canvas encoder.';
				}console.log(imgType,canvas.toDataURL('image/' + imgType));

				return canvas.toDataURL('image/' + imgType);
			} catch (e) {
				console && console.log(e);
				return 'error';
			}
		}

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
							if (self.config.canvasEncoder) {
								localStorage[src] = getBase64Image(img);
							} else {
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
				}
			});
		});
		
		return this;
	}
})(jQuery);