var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductDescription = document.getElementById("ProductDescription");
var ProductImage = document.getElementById("ProductImage");
var Data = document.getElementById("Data");
var Search = document.getElementById("Search");
var list = [];
var editIndex = -1;

if (localStorage.getItem("test")) {
  list = JSON.parse(localStorage.getItem("test"));
  display(list);
} else {
  list = [];
}

function getproducts() {
  if (
    ProductName.value === "" ||
    ProductPrice.value === "" ||
    ProductDescription.value === "" ||
    ProductImage.value === ""
  ) {
    window.alert("Please insert all data");
    return;
  }

  var Products = {
    name: ProductName.value,
    Price: ProductPrice.value,
    Description: ProductDescription.value,
    Image: `imgs/${ProductImage.files[0].name}`,
  };

  if (editIndex === -1) {
    list.push(Products);
  } else {
    list[editIndex] = Products;
    editIndex = -1;
  }

  localStorage.setItem("test", JSON.stringify(list));
  display(list);
  clear();
}

function display(arr) {
  var cartona = ``;
  for (var i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-lg-4">
        <div class="card position-relative w-75 mt-5 shadow-lg rounded-3 overflow-hidden">
          <img src="${arr[i].Image}" class="card-img-top" alt="Product Image" />
          <div class="card-body p-3">
            <h1 class="text-center mb-3 text-primary">${arr[i].name}</h1>
            <p class="text-center mb-4 text-muted">${arr[i].Description}</p>
            <button class="btn btn-danger w-100 mb-3" onclick="Delete(${i})">Delete</button>
            <button class="btn btn-warning w-100 mb-3" onclick="editProduct(${i})">Edit</button>
            <div class="position-absolute top-0 end-0 rounded-start bg-success text-white fw-bold py-1 px-2">
              ${arr[i].Price}$
            </div>
          </div>
        </div>
      </div>`;
  }
  Data.innerHTML = cartona;
}

function Delete(i) {
  list.splice(i, 1);
  localStorage.setItem("test", JSON.stringify(list));
  display(list);
}

function editProduct(i) {
  editIndex = i;
  ProductName.value = list[i].name;
  ProductPrice.value = list[i].Price;
  ProductDescription.value = list[i].Description;
  ProductImage.value = list[i].Image;
}

function clear() {
  ProductName.value = "";
  ProductPrice.value = "";
  ProductDescription.value = "";
  ProductImage.value = "";
}

function Searchinput() {
  var searcharray = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].name.toLowerCase().includes(Search.value.toLowerCase())) {
      searcharray.push(list[i]);
    }
  }
  display(searcharray);
}
