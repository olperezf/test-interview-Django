// función que se ejecuta cuando el DOM haya cargado todos los nodos
document.addEventListener("DOMContentLoaded", function(){
  
  let availability = 8;
  let schedule = []
  let selected_schedule = document.getElementById("selected_schedule");
  let ability = document.getElementById("availability");
  let divs = document.getElementsByTagName("div");
  let rectangles = document.getElementsByClassName("rectangle");
  let clear = document.getElementById("clear");
  
  const removeClassAvailable = function(div) {
      div.classList.remove("available");
      availability += 1;
     //ciclo que busca todos los no disponible y los remueve
      for(let div of divs){
          if (div.classList.contains("not_available")){
            removeClassNotAvailable(div); 
          }
      }
      schedule = schedule.filter(item => item !== div.innerText)
      selected_schedule.textContent = schedule.join(' <--> ')
      ability.textContent = availability;
  }

  const removeClassNotAvailable = function(div){
    div.classList.remove("not_available");
    availability += 1;  
  }

  const addClass = function(div){
    availability -= 1;
    if (availability >= 0){
          schedule.push(div.innerText)
          selected_schedule.textContent = schedule.join(' <-> ')
          ability.textContent = availability;
          div.classList.add("available");
      }
      else
          div.classList.add("not_available");
  }

  const main = function(){
    for (let rectangle of rectangles) {
      rectangle.addEventListener('click', (function() {

      let div = document.getElementById(this.id);
      if (div.classList.contains('available')){
         removeClassAvailable(div);
      }
      else{
          if (div.classList.contains('not_available')){
            removeClassNotAvailable(div);
          }
          else{
            addClass(div);
          }  
      }
      
     }))
   }
  }

  clear.addEventListener('click', (function() {
    availability = 8;
    schedule = [];
    for(let div of divs){
      div.classList.remove("not_available");
      div.classList.remove("available");
    }
    selected_schedule.textContent = schedule;
    ability.textContent = availability;
  }));

  main();

});


