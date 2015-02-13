#Angular + Sizzle = Standalone v0.1.2
> Sizzle for Angular: Standalone, no module, Sizzle selectors straight out of the box in combination with JQLite

##Why?
We want to use a powerfull DOM selector without including jQuery. Sizzle is made by jQuery team and is used within jQuery. 
There is nothing wrong with jQuery, however since Angular has it's own AJAX and animation modules it is completly unnessecary to inlcude jQuery with ton of features you will and ~should~ never use.

##How to use
Download the latest Sizzle and include it after loading Angular and before loading this library.

    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/sizzle/dist/sizzle.js"></script>
    <script src="bower_components/angular-sizzle-standalone/angular-sizzle.js"></script>
    
Now you can use `$('selector')` or better `angular.element('selector')`.

##How it works
This script will save the orginal code of angular to `_element` and writes a new `element` function. If this script is unable to find a selector it will fallback to jQLite. Also any functions attached to the orignal `element` function will be copied to the new function so that any other scripts will not break.

##Debug
Add `Sizzle.debug = true;` after loading Sizzle.js to see (suppressed) warnings of selectors not found by Sizzle.

##Difference with [herschel666/angular-sizzle](https://github.com/herschel666/angular-sizzle)
Beside that this scripts respects any 3rd-party function attached to `angular.element` it also works without the need to define it as module. Just include the javascript file after angular.js and go!
