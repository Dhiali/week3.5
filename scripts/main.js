//creating an array of objects

const arrPlants = [

    {"name": "Fikus Tree",
    "price": 350,
    "description": "Graceful and lush, this charming indoor plant boasts glossy, emerald-green leaves that effortlessly brighten any space.",
    "image": "plant1.png",
    "lightAmount" : "low",
    "addedDate":"2023-02-5",
    "onSale" : "true",
    
  },
    
  
  {
    "name": "White Sprite Succulent",
    "price": 200,
    "description": "Delicate and captivating, this rare succulent showcases a mesmerizing silver-white hue that gracefully adorns its petite, fleshy leaves.",
    "image": "plant2.png",
    "lightAmount" : "high",
    "addedDate":"2023-04-2",
    "onSale" : "false",
  },
  {
    "name": "Snake Plant",
    "price": 400,
    "description": "Boasting tall, sleek, and sword-like leaves, this botanical marvel adds a touch of modern flair to any setting.",
    "image": "plant3.png",
    "lightAmount" : "low",
    "addedDate":"2023-04-5",
    "onSale" : "true",
  },
  {
    "name": "Parlour Palm",
    "price": 350,
    "description": "With its lush, feather-like fronds and compact size, this indoor beauty makes a striking addition to any interior space.",
    "image": "plant4.png",
    "lightAmount" : "low",
    "addedDate":"2023-03-25",
    "onSale" : "false",
  },
  {
    "name": "Japanese Maple",
    "price": 1200,
    "description": "Known for its stunning foliage that transforms with the seasons, this ornamental tree captivates with its delicate, lacy leaves in vibrant shades of red, orange, or gold.",
    "image": "plant5.png",
    "lightAmount" : "bright",
    "addedDate":"2023-09-2",
    "onSale" : "true",
  }
    
];


const onSale = true;


const productsWithOnSale = arrPlants.map(arrPlants => {
    return { ...arrPlants, onSale: onSale };
  });

  
  console.log(productsWithOnSale);

let appliedFilter = "";
let appliedSort = "date added";


$(document).ready(function(){
//select the plants container and add html from our template 
    

//you have to call it only when ready/loaded
    filterSortPlants();
});



function loadPlants (plantsToShow) {

  console.log(plantsToShow);
$("#plantsContainer").empty();



    for (let i = 0; i < plantsToShow.length; i++) {
        const plant = plantsToShow[i];


        console.log(plant.name);

        $("#plantsContainer").append($("#plantCardTemplate").html());

        let currentChild = $("#plantsContainer").children().eq(i);

        $(currentChild).find(".card-img-top").attr('src','assets/' + arrPlants[i].image);

        $(currentChild).find("#nameText").text(arrPlants[i].name);

        $(currentChild).find("#priceText").text('R ' + arrPlants[i].price);

        $(currentChild).find("#descriptionText").text(arrPlants[i].description);

        $(currentChild).find("#descriptionText").hide();
        
        
    };
}



$("input[name='filterRadio']").click(function() {

  appliedFilter = $(this).attr('value');

  console.log(appliedFilter);
  filterSortPlants();
});

$("input[name='sortRadio']").click(function() {

  appliedSort = $(this).attr('value');

  console.log(appliedFilter);
});

function filterSortPlants (){

 let filteredSortedArrPlants = [];

if(appliedFilter){
  filteredSortedArrPlants = arrPlants.filter(arrPlants => arrPlants.lightAmount == appliedFilter);
}
else{
  filteredSortedArrPlants = arrPlants;
};


 if(appliedSort == "low to high"){
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a,b) => {
      return a.price - b.price;
    });
 }
 else if (appliedSort === "data added") {
  filteredSortedArrPlants = filteredSortedArrPlants.sort((a,b) => {
        let da = new Date(a.addedDate);
        let db = new Date(b.addedDate);

        return db-da;
  });
 }
 
 loadPlants(filteredSortedArrPlants);


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

