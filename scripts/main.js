//creating an array of objects

const plants = [

    {"name": "Fikus Tree",
    "price": 350,
    "description": "Graceful and lush, this charming indoor plant boasts glossy, emerald-green leaves that effortlessly brighten any space.",
    "image": "plant1.png",
    "lightAmount" : "low",
    "addedDate":"2023-02-5",
  },
    
  
  {
    "name": "White Sprite Succulent",
    "price": 200,
    "description": "Delicate and captivating, this rare succulent showcases a mesmerizing silver-white hue that gracefully adorns its petite, fleshy leaves.",
    "image": "plant2.png",
    "lightAmount" : "high",
    "addedDate":"2023-04-2",

  },
  {
    "name": "Snake Plant",
    "price": 400,
    "description": "Boasting tall, sleek, and sword-like leaves, this botanical marvel adds a touch of modern flair to any setting.",
    "image": "plant3.png",
    "lightAmount" : "low",
    "addedDate":"2023-04-5"

  },
  {
    "name": "Parlour Palm",
    "price": 350,
    "description": "With its lush, feather-like fronds and compact size, this indoor beauty makes a striking addition to any interior space.",
    "image": "plant4.png",
    "lightAmount" : "low",
    "addedDate":"2023-03-25",

  },
  {
    "name": "Japanese Maple",
    "price": 1200,
    "description": "Known for its stunning foliage that transforms with the seasons, this ornamental tree captivates with its delicate, lacy leaves in vibrant shades of red, orange, or gold.",
    "image": "plant5.png",
    "lightAmount" : "high",
    "addedDate":"2023-09-2",

  }
    
];


let appliedFilter = "";
let appliedSort = "date added";


$(document).ready(function(){
//select the plants container and add html from our template 
    

//you have to call it only when ready/loaded
    loadPlants(plants);
});


function loadPlants (plantsToShow) {
    for (let i = 0; i < plantsToShow.length; i++) {
        console.log(plantsToShow[i]);

        $("#plantsContainer").append($("#plantCardTemplate").html());

        let currentChild = $("#plantsContainer").children().eq(i+1);

        $(currentChild).find(".card-img-top").attr('src','assets/' + plants[i].image);

        $(currentChild).find("#nameText").text(plants[i].name);

        $(currentChild).find("#priceText").text('R ' + plants[i].price);

        $(currentChild).find("#descriptionText").text(plants[i].description);

        $(currentChild).find("#descriptionText").hide();
        
        
    }
}




$("#plantsContainer").on('click', '.card', function(){

  // Toggle the price & description text
  $(this).find("#priceText").toggle();
  $(this).find("#descriptionText").toggle();

  // Resize the image to fit the additional content
  $(this).find(".card-img-top").toggleClass("small");

});



$(document).ready(function() {
  // Binds the click event to the "Remove" button
  $('.remove-btn').on('click', function() {
    
    var row = $(this).parent().parent(); // cross two levels up to the parent <tr>

    // Remove the row from the table
    row.remove();
  });
});

