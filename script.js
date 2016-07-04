$(document).ready(function(){
	$('.timecontrol').on("click",function(){
		var classes = $(this).attr('class').split(' '), tempArr = [];
		for (var i=0;i<classes.length;i++) {
			if (classes[i] !== 'btn' && classes[i] !== 'btn-default' && classes[i] !== 'timecontrol') {
				tempArr.push(classes[i]);
			}
		}
		timeControl(tempArr[0],tempArr[1]);
	});
	
	function timeControl(op,el) {
		if ( $('.number').hasClass(el) ) {
			var currVal = parseInt($('.number.'+el).text());
			switch (op) {
				case "minus":
					if (currVal > 1) { currVal--; }
					break;
				case "plus":
					if (currVal < 300) { currVal++; }
					break;
			}
			
			$('.number.'+el).text(currVal);
			
			var newTime = $('.number.sl').text();
			Clock.update(newTime);
		}
	}
	
	$('.clock-control #play').on("click", function(){
		var hms = $('.number.hms').text(),
				sl = $('.number.sl').text(),
				bl = $('.number.bl').text();

		Clock.start(sl,bl,hms);
	});
	
	$('.clock-control #pause').on("click", function(){
		Clock.pause();
	});
	
	$('.clock-control #resume').on("click", function(){
		Clock.resume();
	});
	
	var currTime = 0, timer, minutes, seconds, round;
	var Clock = {
		update: function(timer){
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			
			$(".clock span").text(minutes + ":" + seconds);
		},
		start: function(d1,d2,hm) {
			clearInterval(this.interval);
			timer = d1, round = 1;
			this.interval = setInterval(function () {
				if (round < hm*2) { //run the clock
					
					Clock.update(timer);

					currTime = timer;
					if (--timer < 0) {
						if (round % 2 === 0) {
							timer = d1;	
						} else {
							timer = d2;
						}
						round++;
					}
				}
				else { //finished all sessions, reset
					clearInterval(this.interval);
					$('.clock-control .btn span').css('display','none');
					$('.clock-control .btn span#play').css('display','block');
				}
			}, 1000);
			$('.clock-control .btn span').css('display','none');
			$('.clock-control .btn span#pause').css('display','block');
		},
		pause: function() {
			clearInterval(this.interval);
			$('.clock-control .btn span').css('display','none');
			$('.clock-control .btn span#resume').css('display','block');
		},
		resume: function() {
			if (!this.interval) {
				this.start($('.number.sl').text(),$('.number.bl').text());
			} else {
				this.start(currTime,$('.number.bl').text());
			}
			$('.clock-control .btn span').css('display','none');
			$('.clock-control .btn span#pause').css('display','block');
		}
	}
});