(function() {
	document.addEventListener('onGriddleCakeInit', function () {
		var vendorPrefix = document.createElement('div');
		vendorPrefix.setAttribute('id', 'vendorPrefix');
		document.body.appendChild(vendorPrefix);

		var supportedValues = document.createElement('div');
		supportedValues.setAttribute('id','supportedValues');
		document.body.appendChild(supportedValues);

		var vendorRoot = ((griddleCake.isSupported) ? (griddleCake.vendorRoot != '' ? griddleCake.vendorRoot : 'Generic') : 'Unsupported');

		document.getElementById('vendorPrefix').innerHTML = "<div>" + vendorRoot + "</div>";
		
		var styleRuleDisplay = document.getElementById('supportedValues');

		for (var currStyleRule in griddleCake.styleList) {
			var currStyleRuleObj = document.createElement('div');
			currStyleRuleObj.setAttribute('data-supported', griddleCake.styleList[currStyleRule]);
			currStyleRuleObj.innerHTML = currStyleRule + ": <span>" + griddleCake.styleList[currStyleRule] + "</span>";
			styleRuleDisplay.appendChild(currStyleRuleObj);
		}

		console.log('init');
	});
})();