let xhr = new XMLHttpRequest();

let shoes = [];

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let xmlDoc = this.responseXML;

    let shoesXML = xmlDoc.getElementsByTagName("Shoe");

    for (let i = 0; i < shoesXML.length; i++) {
      let name =
        shoesXML[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
      let location =
        shoesXML[i].getElementsByTagName("Location")[0].firstChild.nodeValue;
      let price =
        shoesXML[i].getElementsByTagName("Price")[0].firstChild.nodeValue;
      let category =
        shoesXML[i].getElementsByTagName("Category")[0].firstChild.nodeValue;

      let shoe = createShoe(name, location, price, category);

      shoes.push(shoe);
    }
    displayShoes();
  }
};

xhr.open("GET", "products.xml", true);
xhr.send();

let container = document.querySelector(".products-container");
let search = document.querySelector("#search");
let sort = document.querySelector("#price");
let filter = document.querySelector("#category");

//display shoes
function displayShoes() {
  container.innerHTML = "";

  let searchTerm = search.value;
  searchTerm = searchTerm.toString().toLowerCase();

  let filterTerm = filter.value;

  shoes.map(function (shoe) {
    let shoeName = shoe.name.toLowerCase();

    //search
    if (shoeName.includes(searchTerm) || !searchTerm) {
      //filter
      if (filterTerm == shoe.category || filterTerm == "All") {
        let img = document.createElement("img");
        img.src = shoe.location;

        container.appendChild(img);
      }
    }
  });
}

//sort by price
function sortShoes() {
  let sortOrder = sort.value;

  switch (sortOrder) {
    case "Ascending":
      shoes.sort((a, b) => a.price - b.price);
      break;
    case "Descending":
      shoes.sort((a, b) => b.price - a.price);
      break;
  }

  displayShoes();
}

function createShoe(name, location, price, category) {
  let shoe = {
    name: name.toString(),
    location: location,
    price: parseInt(price),
    category: category,
  };

  return shoe;
}
