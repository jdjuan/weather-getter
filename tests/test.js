casper.test.begin('Test Starting...', 3, function suite(test) {
	casper.options.viewportSize = {width: 1024, height: 768};
	casper.start('http://juandavidherrera.com/weatherProject/', function() {
		this.wait(1000, function() {
			this.capture("testImages/step1.png");
			test.assertVisible('div.sweet-alert', "Alert popped up to allow the user to enter PostCode");
			this.evaluate(function(inputText) {
				document.querySelector('input').value = inputText;
			}, 'EC1A');
			test.assertEval(function() {
				return document.querySelector('input').value === "EC1A";
			}, "PostCode entered in the input field");
		});
		this.wait(1000, function() {
			this.capture("testImages/step2.png");
			this.click('button.confirm');
		});
		casper.waitForSelectorTextChange('#city', function() {
			this.capture("testImages/step3.png");
			test.assertEval(function() {
				return __utils__.findOne('#city').textContent === "Barbican,GB";
			}, "Website displayed correct weather information for EC1A");
		});	
	});
	casper.run(function() {
		test.done();
	});
});

