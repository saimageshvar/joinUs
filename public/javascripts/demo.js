/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}
			else {
				self.options.onCheck();
				self.timeline.replay();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

	// grid items:
	var items = [].slice.call(document.querySelectorAll('ol.grid > .grid__item'));

	function init() {
		

		/* Icon 10 */
		var el10 = document.querySelector('div.icobutton'), el10span = el10.querySelector('span.fa-heart');
		var opacityCurve10 = mojs.easing.path('M1,0 C1,0 26,100 51,100 C76,100 101,0 101,0');
		var translationCurve10 = mojs.easing.path('M0,100 C0,0 50,0 50,0 L50,100 L50,200 C50,200 50,100 100,100');
		var colorCurve10 = mojs.easing.path('M0,100 L50,100 L50,0 L100,0');
		new Animocon(el10span, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: 			el10,
					radius: 			{80:130},
					degree: 			90,
					angle: 				135,
					count: 				6,
					children: {
						shape: 				'line',
						fill: 				'#fff',
						scale: 				1,
						radius: 			{30:0},
						opacity: 			0.6,
						duration: 		600,
						stroke: 			'#e82c61',
						strokeWidth: 	{1:2},
						easing: 			mojs.easing.bezier(0.1, 1, 0.3, 1)
					}
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 400,
					easing: mojs.easing.ease.out,
					onUpdate: function(progress) {
						var opacityProgress = opacityCurve10(progress);
						el10span.style.opacity = opacityProgress;
						
						var translationProgress = translationCurve10(progress);
						el10span.style.WebkitTransform = el10span.style.transform = 'translate3d(0,' + -150 * translationProgress + '%,0)';
						
						var colorProgress = colorCurve10(progress);
						el10.style.color = colorProgress ? '#e82c61' : '#fff';
					}
				})
			],
			
			onUnCheck : function() {
				el10.style.color = '#fff';

			}
		});
		/* Icon 10 */


		
		
	}
	
	init();

})(window);