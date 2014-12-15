(function (angular, sizzle) {
	'use strict';

	var oldElement = '_element',
		newElement = 'element';

	if(angular && sizzle) {

		// Copy 'angular.element' to 'angular._element'
		angular[oldElement] = angular[newElement];

		// Replace 'angular.element' with a new function
		angular[newElement] = function( selector ) {

			// The passed element is already an instance of 'angular._element'
			if ( selector instanceof angular[oldElement] ) {
				return selector;
			}

			// Ok, let's try the selector with Sizzle
			if ( typeof selector === 'string' ) {

				try {
					// Sizzle it
					var tmp = Sizzle(selector);

					// Sizzle found something, pass it on to JQLite
					if( tmp.length > 0 ) {
						return angular[oldElement](tmp);
					}

				} catch(err) {

					// Log a message, define Sizzle.debug after loading Sizzle.js
					if( angular.isDefined(Sizzle.debug) ) {
						console.error("Sizzle selector not found, message: ", err.message);
					}

				}

			}

			// Everything failed, lets JQLite sort the rest out
			return angular[oldElement](selector);

		};

		// Loop through 'angular._element' and copy all objects to 'angular.element' (i.e. _data and data functions)
		for (var prop in angular[oldElement]) {
			if (angular[oldElement].hasOwnProperty(prop)) {
				angular[newElement][prop] = angular[oldElement][prop];
			}
		}


	} else {
		console.error('angular-sizzle-standalone: Angular.js or Sizzle.js has not been defined');
	}

})(angular, Sizzle);
