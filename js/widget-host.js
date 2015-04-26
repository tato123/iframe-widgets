(function() {

	function WidgetHost() {
		window.addEventListener('message', onMessage);
	};


	function onMessage(event) {
		console.log('Got a response', event.data, 'from origin', event.origin);
		if (event.origin === 'http://localhost:3000') {			
			widget[event.data.action](event, event.data.data);
		}
	}

	WidgetHost.prototype.onWidgetLoad = function(event)
	{
		console.log('iframe is ready, waiting for validation', event.id);
		event.contentWindow.postMessage({action:'validate'}, '*');
	}

	WidgetHost.prototype.onWidgetValidate = function(event, data)
	{

		console.log('Iframe received response', event.source.frameElement.id, data);
		if ( !data.manifest ) {
			console.log('Rejecting widget it is invalid', event.source.frameElement.id);
			var string = "#"+event.source.frameElement.id;			
			$(string).parent().remove();
		}
	}

	// Allow declarative widget types that can be auto loaded, we will check
	// to see if they are iframe widgets
	$(function() {
		$('iframe').each(function(){

			$(this)[0].onload = function(){
				var type = $(this).data('type');
				if ( type=== 'widget' ) {
					widget.onWidgetLoad(this);	
				}			
			};
		})
	});


	window.widget = new WidgetHost();

})();