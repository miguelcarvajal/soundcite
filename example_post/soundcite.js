$(document).ready(function () {
		SC.initialize({
			client_id: "5ba7fd66044a60db41a97cb9d924996a",
			redirect_uri: "http://localhost:9292/soundcite",
		});
		SC.stream(id, function(sound) {
			sound.load({
				onload: function() {
					$('.soundcite').css({'border' : '1px solid rgba(0,0,0,.5)', 'border-radius' : '10px', 'padding' : '0 5px 0 5px', 'display' : 'inline-block', 'cursor' : 'pointer'});
				}
			});
			$('.soundcite').click(function () {
				var clicked = $(this);
				var start = clicked.attr('data-start');
				var end = clicked.attr('data-end');
				sound.setPosition(start);
				sound.onPosition(end, function() {
					sound.pause();
				})
				sound.play({
					whileplaying: function() {
						var totalTime = end - start;
						var position = sound.position;
						var relative_position = position - start;
						var percentage = (relative_position / totalTime) * 100
						clicked.css({'background' : '-webkit-linear-gradient(left, white, #ccc ' + percentage + '%, white)'});
					}
				});
			});

		});
	});