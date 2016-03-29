(function(){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

   items = null;
	var mouseover = $('.mouse-over');
	var click     = $('.click');
	var sub       = $('.submit');
   var time      = $('.timeout');
   var getTitle  = jQuery('#get-id');
   var main      = jQuery('#main');
   var sec       = jQuery('#secondary');
   
   
   if(document.cookie.length > 0){
      get();
      main.hide();
      sec.show();      
      updateDisplay(document.cookie);
   }
   else{
      sec.hide();
   }
   
   //console.log(document.cookie);

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
         //console.log("timeout");
			$(this).fadeIn("slow");
		}, 1000);
      
	});

   
   getTitle.on('click', function() {
      get();      
      //hide main div
      main.hide();
      //show secondary div
      sec.show();
   });
   
   
})();

function sectionTwo(){ 
   makeNewButton("change-id","Change It!",changeIt);
}

function changeIt(){
   var string = randomString(items);
   updateDisplay(string);
   if (document.getElementById("keep-id") == null){
      makeNewButton("keep-id","Keep It!",keepIt);
   }
}

function keepIt(){
   document.cookie = document.getElementById("display").textContent;
}

function makeNewButton(id,name,prop){
   var elem = document.createElement('input');
   elem.setAttribute('type', 'button');
   elem.setAttribute('id', id);
   elem.setAttribute('value', name);
   elem.setAttribute('class',"button-style");
   if (elem.addEventListener) {
      elem.addEventListener('click',prop, false); 
   }
   else if (elem.attachEvent) {
      alert('Old IE Being Used');
      elem.attachEvent('onclick',prop);
   }
   var sec = document.getElementById("buttons");
   sec.appendChild(elem);
}

function randomString(){
   return items[Math.floor(Math.random() * items.length)];
}

function updateDisplay(string){
   var display = document.getElementById("display");
   display.innerHTML = "<h1>" + string + "</h1>";
}

function get() {
   $.get({
      url: "http://www.mattbowytz.com/simple_api.json",
      data: {
         "data": "quizData"
      },
      success: function(data) {
         items = data.data;
         sectionTwo();
      }
   });
}
