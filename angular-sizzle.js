(function (angular, sizzle) {
	'use strict';
	
	var orginal = '_element',
		sizzle = 'element';
	
	if(angular && sizzle) {
	
		angular[orginal] = angular.element;
		angular[sizzle] = function ( selector ) {

			if ( selector instanceof angular[orginal] ) {
				return selector;
			}

			var tmp;
			if ( typeof selector === 'string' ) {

				try {
					tmp = Sizzle(selector);

					if( tmp.length === 0 ) {
						tmp = selector;
					}

				} catch(err) {

					if( angular.isDefined(ct.debug) ) {
						console.error(err.message);
					}
					tmp = selector;

				}

			}

			return angular[orginal](tmp);

		};
	
	} else {
		console.error('Angular-sizzle-standalone: Angular.js or Sizzle.js has not been defined');
	}
	
})(angular, Sizzle);