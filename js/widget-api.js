(function() {
	'use strict';

	function Widget() {
		window.addEventListener('message', onMessage);
	};

	function _declareReady() {
		var payload = {
			action: 'onWidgetLoad',
			data:  'something great'			
		};

		parent.postMessage(payload, "http://localhost:3000");
	}

	function _initializeAPI() {
		
	}

	function onMessage(event) {
		console.log('Got a response', event.data, 'from origin', event.origin);
		if (event.origin === 'http://localhost:3000') {
			api[event.data.action](event, event.data.data);
		}
	}
	
	Widget.prototype.validate = function(event, data) {
		event.source.postMessage({action:'onWidgetValidate', data:{manifest:manifest, bundle:bundle}}, '*');
	}

	window.api = new Widget();
	

})();