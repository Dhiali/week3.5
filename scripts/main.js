const tripsEl = document.querySelector(".trips");
const cartTicketsEl = document.querySelector(".cart-tickets");
const subtotalEl = document.querySelector(".subtotal");
const totalTicketsInCartEl = document.querySelector(".total-tickets-in-cart");


function renderTrips() {
  trips.forEach((trip) => {
    tripsEl.innerHTML += `
            <div class="ticket">
                <div class="ticket-container">
                    <div class="ticket-img">
                        <img src="${trip.imgSrc}" alt="${trip.name}">
                    </div>
                    <div class="desc">
                        <h4>${trip.name}</h4>
                        <h5><small>R</small>${trip.price}</h5>
                        <p>
                            ${trip.description}
                        </p>
                    </div>
                    
                    <div class="add-to-cart" onclick="addToCart(${trip.id})">
                        <img src="assets/shopping-bag-svgrepo-com (1).svg" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderTrips();




let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) { 
  
  if (cart.some((ticket) => ticket.id === id)) {
    changeNumberOfUnits("plus", id);
  } else { 
    const ticket = trips.find((trip) => trip.id === id);

    cart.push({
      ...ticket,
      numberOfUnits: 1,
    
    });
  }

  updateCart();
}






function updateCart() {
  renderCartTickets();
  renderSubtotal();

 
  localStorage.setItem("CART", JSON.stringify(cart))
}


function renderSubtotal() {
  let totalPrice = 0,
    totalTickets = 0;

  cart.forEach((ticket) => {
    totalPrice += ticket.price * ticket.numberOfUnits;
    totalTickets += ticket.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalTickets} tickets): R${totalPrice.toFixed(2)}`;
  totalTicketsInCartEl.innerHTML = totalTickets;
}




function renderCartTickets() {
  cartTicketsEl.innerHTML = ""; 
  cart.forEach((ticket) => {
    cartTicketsEl.innerHTML += `
        <div class="cart-ticket">
            <div class="ticket-info" onclick="removeTicketFromCart(${ticket.id})">
                <img src="${ticket.imgSrc}" alt="${ticket.name}">
                <h4>${ticket.name}</h4>
            </div>
            <div class="unit-price">
                <small>R</small>${ticket.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${ticket.id})">-</div>
                <div class="number">${ticket.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${ticket.id})">+</div>           
            </div>
        </div>
      `;
  });
}




function removeTicketFromCart(id) {
  cart = cart.filter((ticket) => ticket.id !== id);

  updateCart();
}




function changeNumberOfUnits(action, id) {
  cart = cart.map((ticket) => {
    let numberOfUnits = ticket.numberOfUnits;

    if (ticket.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < ticket.instock) {
        numberOfUnits++;
      }
    };

    return {
      ...ticket,
      numberOfUnits,
    };
  });

  updateCart();
}




function showAllTrips() {
  renderTrips(); 
}

document.getElementById("filterAllButton").addEventListener("click", showAllTrips);


function filterBy5DaysOrLess() {
  const filteredTrips = trips.filter((trip) => {
   
    const days = parseInt(trip.name.match(/\d+/)[0]);

    
    return days <= 5;
  });

 
  renderTrips(filteredTrips);
}


document.getElementById("filterButton").addEventListener("click", filterBy5DaysOrLess);





function filterMoreThan5Days() {
  const filteredTrips = trips.filter((trip) => {
   
    const days = parseInt(trip.name.match(/\d+/)[0]);

   
    return days > 5;
  });

  
  renderTrips(filteredTrips);
}


document.getElementById("filterMoreThan5DaysButton").addEventListener("click", filterMoreThan5Days);



function filterOneLocation() {
  const filteredTrips = trips.filter((trip) => {
    
    const descriptionWords = trip.description.split(' ');
    return descriptionWords.length === 1;
  });


  renderTrips(filteredTrips);
}


document.getElementById("filterOneLocationButton").addEventListener("click", filterOneLocation);


function filterCheapestTrips() {
  
  const sortedTrips = trips.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  
  const cheapestTrips = sortedTrips.slice(0, 5);

  
  renderTrips(cheapestTrips);
}


document.getElementById("filterCheapestTripsButton").addEventListener("click", filterCheapestTrips);



function filterMultipleLocations() {
  const filteredTrips = trips.filter((trip) => {
    const descriptionWords = trip.description.split(' ');
    return descriptionWords.length > 1;
  });

  
  renderTrips(filteredTrips);
}


document.getElementById("filterMultipleLocationsButton").addEventListener("click", filterMultipleLocations);


function filterReturnToPort() {
  const returnToPortTrips = trips.filter((trip) => {
    return trip.description.toLowerCase().includes("return to port");
  });


  renderTrips(returnToPortTrips);
}


document.getElementById("filterReturnToPortButton").addEventListener("click", filterReturnToPort);



function renderTrips(tripsToRender) {
  const tripsContainer = document.querySelector(".trips");
  tripsContainer.innerHTML = ""; 


  const tripsToDisplay = tripsToRender || trips;

  tripsToDisplay.forEach((trip) => {
    

    tripsEl.innerHTML += `
    <div class="ticket">
        <div class="ticket-container">
            <div class="ticket-img">
                <img src="${trip.imgSrc}" alt="${trip.name}">
            </div>
            <div class="desc">
                <h4>${trip.name}</h4>
                <h5><small>R</small>${trip.price}</h5>
                <p>
                    ${trip.description}
                </p>
            </div>
            
            <div class="add-to-cart" onclick="addToCart(${trip.id})">
                <img src="assets/shopping-bag-svgrepo-com (1).svg" alt="add to cart">
            </div>
        </div>
    </div>
`;




    
  });
}


renderTrips();


const successMessage = document.getElementById("success-message");
const checkoutButton = document.querySelector(".checkout");


checkoutButton.addEventListener("click", function() {
 successMessage.style.display = "block"; 
  setTimeout(function() {
    successMessage.style.display = "none"; 
  }, 3000); 
});

