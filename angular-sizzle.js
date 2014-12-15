(function (angular, sizzle) {
	'use strict';

	var oldElement = '_element',
		newElement = 'element';

	if(angular && sizzle) {

		// Replace 'angular._element' with 'angular.element'
		angular[oldElement] = angular[newElement];

		// Replace 'angular.element' with a new function
		angular[newElement] = function( selector ) {

			// The passed element is already an instance of angular._element.
			if ( selector instanceof angular[oldElement] ) {
				return selector;
			}

			// Ok, let's try the selector with Sizzle
			if ( typeof selector === 'string' ) {

				try {
					var tmp = Sizzle(selector);

					if( tmp.length > 0 ) {
						// Sizzle found something, pass it on to JQLite
						return angular[oldElement](tmp);
					}

				} catch(err) {

					if( angular.isDefined(Sizzle.debug) ) {
						console.error("Sizzle selector not found, message: ", err.message);
					}

				}

			}

			// Ok, everything failed, lets JQLite sort the rest out.
			return angular[oldElement](selector);

		};

		// Loop through 'angular._element' and copy all objects to 'angular.element' (i.e. _data and data function)
		for (var prop in angular[oldElement]) {
			if (angular[oldElement].hasOwnProperty(prop)) {
				angular[newElement][prop] = angular[oldElement][prop];
			}
		}


	} else {
		console.error('Angular-sizzle-standalone: Angular.js or Sizzle.js has not been defined');
	}

})(angular, Sizzle);
