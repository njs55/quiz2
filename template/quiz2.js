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
   
   //check if a cookie has been set
   //show/hide different divs based on if cookie is set
   if(document.cookie.length > 0){
      get();
      main.hide();
      sec.show();      
      updateDisplay(document.cookie);
   }
   else{
      sec.hide();
   }
   
   //mouseover
   mouseover.mouseover( function() {
      $this = $(this);
      $(this).html('Scrooge McDuck!');
      //$(this).height($(this).height() + 50);
      $(this).height();
   });
   
   //click on text and change to "peace out" then fades out
   click.click(function() {
      $(this).text('Peace Out!')
      $(this).fadeOut(1500);
      return false;
   });
   
   //if you enter something in box it desplays congrats
   //then we fade out the submit button and text field
   sub.submit( function(e) {
      e.preventDefault();
      if ($(this).find('input[type="text"]').val() !== '') {
         $(this).find('input').each(function() {
            $(this).fadeOut("slow");
         });
         $(this).append("<h2>Congratulations! You've entered some text!</h2>");
      }
   });
   
   //the word "timeout" is delayed when printed to console but not screen
   //time.hide();
   time.ready( function() {
      setTimeout(function(){
         $(".timeout").fadeIn("slow");
      }, 1000);
      
   });
   
   //when the Get Title button is clicked we hide the main div and show secondary div
   //also call get() which makes an ajax request
   getTitle.on('click', function() {
      get();      
      main.hide();
      sec.show();
   });   
})();

/**makes the ajax call
*sets the array items
*calls sectiontwo() on success
*/
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

/**The start of section 2
*it creates the Change it button
*/
function sectionTwo(){ 
   makeNewButton("change-id","Change It!",changeIt);
}

/**picks a random string from the items array
*calls updateDisplay()
*checks if Keep It button exists, if not it creates it
*/
function changeIt(){
   var string = randomString(items);
   updateDisplay(string);
   if (document.getElementById("keep-id") == null){
      makeNewButton("keep-id","Keep It!",keepIt);
   }
}

/**sets cookie by saving the word being displayed
*/
function keepIt(){
   document.cookie = document.getElementById("display").textContent;
}

/**makes a new button
*param1 = desired ID
*param2 = desired Name/value
*param3 = desired function you want it to execute
*/
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

/**gets random string from array
*/
function randomString(){
   return items[Math.floor(Math.random() * items.length)];
}

/**updates display
*param: string to be displayed
*/
function updateDisplay(string){
   var display = document.getElementById("display");
   display.innerHTML = "<h1>" + string + "</h1>";
}