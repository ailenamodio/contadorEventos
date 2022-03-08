let events = [];
let array =[];
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const buttonAdd = document.querySelector('#bAdd');
const eventContainer = document.querySelector('#eventContainer');

const json = load();

try {
  array = JSON.parse(json);

} catch (error) {
  array=[];
}

events= array?[...array]: [];

renderEvents();


document.querySelector("form").addEventListener("submit", e=>{
  e.preventDefault();
  addEvent();
});

buttonAdd.addEventListener("click", (e)=>{
  e.preventDefault();
  addEvent();
});

function addEvent(){
  if (eventName.value === "" || eventDate.value === "") {
    return;
  }

  if (dateDiff(eventDate.value) < 0) {
    return;
  }

  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };

    events.unshift(newEvent); //agrega el elemento al principio del arreglo 

    save(JSON.stringify(events));
    
    eventName.value="";

    renderEvents();
}


function dateDiff(d){
 const date1 = new Date(d);
 const date2= new Date();
 const difference = date1.getTime()- date2.getTime();
 const days = Math.ceil(difference / (1000 * 3600 * 24));
 return days;   
}

function renderEvents(){
    const eventsHTML = events.map(event => {
        return `<div class="task">
            <div class="days"><span class="days-number">${dateDiff(event.date)}
            </span><span class="days-text">días</span></div>
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions">
            <button class="bDelete" data-id="${event.id}">Eliminar</button>
            </div>
            </div>`
  });
  eventContainer.innerHTML=eventsHTML.join("");
  document.querySelectorAll('.bDelete').forEach(button =>{
    button.addEventListener('click', e=>{
      const id = button.getAttribute('data-id');
      events = events.filter(event => event.id != id);
      save(JSON.stringify(events))
      renderEvents();
    });
  });
}

function save(data){
  localStorage.setItem('items', data);
}

function load(){
  return localStorage.getItem('items');
}