
function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  function myBtn(){
     if(confirm("Do you want to ask")){
          Ok: window.open("https://mail.google.com/mail/u/0/#inbox?compose=new")
        }    
     }
  
 
     var element = document.getElementById("watchme");
     element.addEventListener("animationstart", listener, false);
     element.addEventListener("animationend", listener, false);
     element.addEventListener("animationiteration", listener, false);
     
     element.className = "slidein";
     function listener(event) {
       var l = document.createElement("li");
       switch(event.type) {
         case "animationstart":
           l.innerHTML = "Started: elapsed time is " + event.elapsedTime;
           break;
         case "animationend":
           l.innerHTML = "Ended: elapsed time is " + event.elapsedTime;
           break;
         case "animationiteration":
           l.innerHTML = "New loop started at time " + event.elapsedTime;
           break;
       }
       document.getElementById("output").appendChild(l);
     }
     
 function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
     
    
 
var buttons = document.getElementById("myBtn_up");
    buttons.innerHTML = '<img src="/arrow-up.png" />';

var cart = [] ;  var Item = function(name,  price, count) {   this.name = name;    this.price = price;   this.count= count; }  function addItemToCart(count) {    for(var i in cart){       if(cart[i].count += count) {                return;       }     }    var item = new  Item(count);    cart.push(item); }    function lol() { addItemToCart(1); document.getElementById("wrap").innerHTML = cart[0].count;  }
