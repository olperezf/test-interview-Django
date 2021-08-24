// función que se ejecuta cuando el DOM haya cargado todos los nodos
document.addEventListener("DOMContentLoaded", function(){
  
  let availability = 8;
  let schedule = [];
  let selected_schedule = document.getElementById("selected_schedule");
  let ability = document.getElementById("availability");
  let divs = document.getElementsByTagName("div");
  let rectangles = document.getElementsByClassName("rectangle");
  let clear = document.getElementById("clear");
  

  const orderScheduleAddInHtml = () => {
      schedule.sort((a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b));
      selected_schedule.textContent = schedule.join(' <-> ');
      ability.textContent = availability;
  };
  
  const removeClassAvailable = (div) => {
      div.classList.remove("available");
      availability += 1;
     //ciclo que busca todos los no disponible y los remueve
      for(let div of divs){
          if (div.classList.contains("not_available")){
            removeClassNotAvailable(div); 
          }
      }
      schedule = schedule.filter(item => item !== div.innerText);
      orderScheduleAddInHtml();
  };

  const removeClassNotAvailable = (div) => {
    div.classList.remove("not_available");
    availability += 1;  
  };

  const addClass = (div) => {
    availability -= 1;
    if (availability >= 0){
          schedule.push(div.innerText)
          orderScheduleAddInHtml();
          div.classList.add("available");
      }
      else
          div.classList.add("not_available");
  };


  const main = () => {
    for (let rectangle of rectangles) {
      rectangle.addEventListener('click', (function() {

      let div = document.getElementById(this.id);
      let cls = div.classList;  
      
      switch (true) {
        case cls.contains('available'):
          removeClassAvailable(div);
          break;
        case cls.contains('not_available'):
          removeClassNotAvailable(div);
          break;
        default:
          addClass(div);
      }

     }))
   }
  };

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


