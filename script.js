const right = document.querySelector(".right-button");
const left = document.querySelector(".left-button");
var products = getProducts();
var source = document.getElementById("render").innerHTML;
var template = Handlebars.compile(source);
let page = 1;
function getProducts(){
  fetch("../products.json")
  .then(response => response.json())
  .then(data => {
    if (page == 1) {
      let paginator = data.products.slice(0,8);
      var html = template({products:[...paginator]});
      document.querySelector("#output").innerHTML = html;
    }else{
      let paginator = data.products.slice(8,10);
      var html = template({products:[...paginator]});
      document.querySelector("#output").innerHTML = html;
    }
  })
  .catch(error => {
    console.error("Error al cargar el archivo JSON:", error);
  });
}

left.addEventListener('click', () => {
  page = 1;
  getProducts();
  left.classList.add('disabled');
  left.setAttribute('disabled');
  right.classList.remove('disabled');
  right.removeAttribute('disabled');
})

right.addEventListener('click', () => {
  page = 2;
  getProducts();
  right.classList.add('disabled');
  right.setAttribute('disabled');
  left.classList.remove('disabled');
  left.removeAttribute('disabled');
})
