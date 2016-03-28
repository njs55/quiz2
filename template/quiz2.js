(function(){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	var mouseover = $('.mouse-over');
	var click     = $('.click');
	var sub       = $('.submit');
   var time      = $('.timeout');

	mouseover.mouseover( function() {
		$this = $(this);
		$(this).html('Scrooge McDuck!');
		//$(this).height($(this).height() + 50);
	});

	click.click(function() {
		$(this).text('Peace Out!')
		$(this).fadeOut(1500);
		return false;
	});

	sub.submit( function(e) {
      console.log("submit");
		e.preventDefault();
		if ($(this).find('input[type="text"]').val() !== '') {
			$(this).find('input').each(function() {
				$(this).fadeOut("slow");
			});
			$(this).append("<h2>Congratulations! You've entered some text!</h2>");
		}
	});

	time.ready( function() {
		setTimeout(function(){
         console.log("timeout");
			$(this).fadeIn("slow");
		}, 1000);
      
	});

})();

/**
 * calls $.get()
 * no params
 * no return
 */
function get(){
   var topic = jQuery('#select-id');
   $.get({
      url: "http://www.mattbowytz.com/simple_api.json",
      data: {
         "data": "quizData"
      },
      success: function(data) {
         console.log("data: " + data);
         items = data.data;
         console.log("items: " + items);
         if (items.constructor === Object){
            //merge both programming and interest Objects
            items = $.merge(data.data.interests, data.data.programming);
            //console.log("items2: " + items);
         }
            
      }
   });
}