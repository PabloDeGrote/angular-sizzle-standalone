(function (angular, sizzle, jQuery) {
    'use strict';

    var oldElement = '_element',
        newElement = 'element';

    // Check if angular is defined
    if( angular === undefined || angular === null ) {
        console.error('Whoooops, Angular was not found, load angular-sizzle-standalone after loading Angular.js and Sizzle.js');
        return;
    }

    // Check if jQuery is defined
    if( angular.isDefined(jQuery) ) {
        console.error('Whoooops, jQuery was found, you don\'t need jQuery in order to load Sizzle, Sizzle already ships within JQuery.');
        return;
    }

    // Check if Sizzle is defined
    if( !angular.isDefined(sizzle) ) {
        console.error('Whoooops, Sizzle was not found, load angular-sizzle-standalone after loading Angular.js and Sizzle.js');
        return;
    }

    // Copy 'angular.element' to 'angular._element'
    angular[oldElement] = angular[newElement];

    // Replace 'angular.element' and '$' with a new function
    window.$ = angular[newElement] = function( selector ) {

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
                    console.error('Sizzle selector not found, message: ', err.message);
                }

            }

        }

        // Everything failed, lets JQLite sort the rest out
        return angular[oldElement](selector);

    };

    // Loop through 'angular._element' and copy all objects to 'angular.element' and '$' (i.e. _data and data functions)
    for (var prop in angular[oldElement]) {
        if (angular[oldElement].hasOwnProperty(prop)) {
            window.$[prop] = angular[newElement][prop] = angular[oldElement][prop];
        }
    }

})( window.angular, window.Sizzle, window.jQuery );
