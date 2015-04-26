(function() {
	'use strict';

	function Widget() {
		window.addEventListener('message', onMessage);
	};

	function onMessage(event) {
		console.log('Got a response', event.data, 'from origin', event.origin);
		if ( event.origin ) {
			api[event.data.action](event, event.data.data);
		}
	}
	
	Widget.prototype.validate = function(event, data) {
		event.source.postMessage({action:'onWidgetValidate', data:{manifest:manifest, bundle:bundle}}, '*');
	}

	window.api = new Widget();

})();
