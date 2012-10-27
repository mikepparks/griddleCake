(function(griddleCake) {
	griddleCake.isSupported = false;

	var vendorList = ['','khtml','ms','o','moz','webkit'];
	griddleCake.vendorRoot = '';
	griddleCake.styleList = {
		'grid-cell' : false,
		'grid-column' : false,
		'grid-column-align' : false,
		'grid-columns' : false,
		'grid-column-sizing' : false,
		'grid-column-span' : false,
		'grid-flow' : false,
		'grid-row' : false,
		'grid-row-align' : false,
		'grid-rows' : false,
		'grid-row-sizing' : false,
		'grid-row-span' : false,
		'grid-template' : false,
	};

	function collapseStyle(styleName) {
		var styleChunk = styleName.split('-');
		styleChunk.forEach(function(e,i,a) {
			a[i] = e.substr(0,1).toUpperCase() + e.substr(1,e.length).toLowerCase();
		});

		return styleChunk.join('').toUpperCase();
	}

	griddleCake.init = function() {
		var divCheck = document.createElement('div');
		var divStyles = [];

		// get all style properties and set as uppercase
		for (var currStyle in divCheck.style) divStyles.push(currStyle.toUpperCase());

		var foundTrue = false;
		var i;
		for (i = 0; i < vendorList.length; ++i, griddleCake.vendorRoot = vendorList[i]) {
			foundTrue = false;
			griddleCake.isSupported = false;

			for (var styleName in griddleCake.styleList) {
				griddleCake.styleList[styleName] = false;

				var styleFullName = collapseStyle((griddleCake.vendorRoot ? '-' + griddleCake.vendorRoot + '-' : '') + styleName);

				// check if rule exists in list
				griddleCake.styleList[styleName] = (divStyles.indexOf(styleFullName) > -1);

				// a rule has been found so it has some sort of support, even if minimal
				if (griddleCake.styleList[styleName] == true) {
					foundTrue = true;
					griddleCake.isSupported = true;
				}
			}

			if (foundTrue) break;
		}

		// now that we've gotten the listed rules out of way, let's do a check on the "display" rule.
		divCheck.style['display'] = 'grid';
		griddleCake.styleList['display = grid'] = (divCheck.style['display'] == 'grid');

		divCheck.style['display'] = 'inline-grid';
		griddleCake.styleList['display = inline-grid'] = (divCheck.style['display'] == 'inline-grid');

		// obviously not supported at this point.
		if (!foundTrue) griddleCake.isSupported = false;

		var evt = document.createEvent('Event');
		evt.initEvent('onGriddleCakeInit', true, true);
		document.dispatchEvent(evt);
	}
})(window.griddleCake = (window.griddleCake || {}));