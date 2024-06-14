let plats = [];
let purchased = [];

/// Affiche les produits

// function displayMenu(plats) {
//   const container = document.querySelector(".dishes");

//   // console.log(plats);

//   plats.forEach((plat) => {
//     const div = document.createElement("div");
//     div.classList.add("dish");

//     const img = document.createElement("img");
//     img.src = plat.img;

//     const para = document.createElement("p");
//     para.textContent = plat.nom;

//     const price = document.createElement("h2");
//     price.textContent = "$" + plat.price;

//     const link = document.createElement("a");
//     link.textContent = "Buy Now";
//     link.style.cursor = "pointer";

//     link.addEventListener("click", () => {
//       addCart(purchased, plat);
//     });

//     div.appendChild(img);
//     div.appendChild(para);
//     div.appendChild(price);
//     div.appendChild(link);

//     container.appendChild(div);
//   });
// }

/// Ajouter un produit dans le pannier

function addCart(purchased, data) {
  const check = purchased.find((item) => item.id === data.id);
  if (check) {
    purchased.map((item) => {
      if (item.id === data.id) {
        // console.log(item.amont++);
        return { ...item, amont: item.amont++ };
      } else return item;
    });
  } else {
    purchased.push({ ...data, amont: 1 });
  }
  count_purchased(purchased);
}

/// manova ny isan' ny zvt ajouter au pannier
function count_purchased(purchased) {
  const purchased_number = document.querySelector(".cart span");

  let count = 0;
  purchased.forEach((element) => {
    count += parseInt(element.amont);
  });
  // console.log(count);
  purchased_number.textContent = parseInt(count);
}

const container = document.querySelector(".container_products");
const resume = document.querySelector(".resume");
const containerPrincipal = document.querySelector(".basket");

/// Construit l'affichage des produits

function showCart(purchased) {
  console.log(purchased.length);
  if (purchased.length !== 0) {
    const h2 = document.createElement("h2");
    h2.textContent = "My Products";
    container.appendChild(h2);
    purchased.forEach((element) => {
      container.style.overflow = "scrol";
      let div = document.createElement("div");
      div.classList.add("product");
      let img = document.createElement("img");
      img.src = element.img;
      img.classList.add("img");

      let name = document.createElement("h3");
      name.textContent = element.nom;

      let price = document.createElement("h3");
      price.textContent = "$" + (element.amont * element.price).toFixed(2);

      let nb = document.createElement("input");
      nb.setAttribute("type", "number");
      nb.setAttribute("min", "1");
      nb.setAttribute("value", element.amont);
      nb.addEventListener("change", () => {
        element.amont = nb.value;
        price.textContent = "$" + (element.amont * element.price).toFixed(2);
        count_purchased(purchased);
        changerResume();
      });

      let del = document.createElement("div");
      del.classList.add("delete");
      del.addEventListener("click", () => {
        const update = purchased.filter(item => item.id !== element.id)
        count_purchased(purchased);
        changerResume();
        container.removeChild(div)
      });

      div.appendChild(img);
      div.appendChild(name);
      div.appendChild(nb);
      div.appendChild(price);
      div.appendChild(del);
      container.appendChild(div);
    });
  } else {
    const p = document.createElement("p");
    resume.innerHTML = "";
    p.textContent = "You haven't bought anything yet :( !";
    p.style.margin = "3vh";
    p.style.fontSize = "15px";
    resume.innerHTML = "";
    container.appendChild = p;
  }
}

/// changer le resumé

function changerResume() {
  const sub = document.querySelector(".span1");
  const tot = document.querySelector(".span3");
  let subTotal = 0;
  purchased.forEach((product) => {
    subTotal += product.amont * product.price;
  });
  sub.textContent = "$" + subTotal.toFixed(2);

  tot.textContent = "$" + (4.89 + subTotal).toFixed(2);
}

/// pour afficher le resumé de l'achat

function Resume() {
  let tab_resume = ["Subtotal", "Livraison", "Total"];

  const flex1 = document.createElement("div");
  flex1.classList.add("flex");

  const h21 = document.createElement("h2");
  h21.textContent = tab_resume[0];

  let subTotal = 0;
  const span1 = document.createElement("span");
  span1.classList.add("span1");
  purchased.forEach((product) => {
    subTotal += product.amont * product.price;
  });
  span1.textContent = "$" + subTotal.toFixed(2);

  flex1.appendChild(h21);
  flex1.appendChild(span1);

  const flex2 = document.createElement("div");
  flex2.classList.add("flex");

  const h22 = document.createElement("h2");
  h22.textContent = tab_resume[1];

  let livraison = 4.89;
  const span2 = document.createElement("span");
  span2.classList.add("span2");

  span2.textContent = "$" + livraison.toFixed(2);

  flex2.appendChild(h22);
  flex2.appendChild(span2);

  const flex3 = document.createElement("div");
  flex3.classList.add("flex");

  const h23 = document.createElement("h2");
  h23.textContent = tab_resume[2];

  let total = subTotal + livraison;
  const span3 = document.createElement("span");
  span3.classList.add("span3");
  span3.textContent = "$" + total.toFixed(2);

  flex3.appendChild(h23);
  flex3.appendChild(span3);

  resume.appendChild(flex1);
  resume.appendChild(flex2);
  resume.appendChild(flex3);

  return resume;
}

/// affiche le pannier

// const purchased_number = document.querySelector(".cart");
// purchased_number.addEventListener("click", () => {
//   const pannier = document.querySelector(".pannier");
//   pannier.style.display = "block";
//   showCart(purchased);
//   const resu = Resume();
//   // console.log(resu);
//   containerPrincipal.appendChild(resu);
// });

/// Met en arrière plan le pannier

// const cache = document.querySelector(".header img");
// cache.addEventListener("click", () => {
//   const pannier = document.querySelector(".pannier");
//   const products = document.querySelector(".container_products");
//   products.innerHTML = "";
//   pannier.style.display = "none";
//   resume.innerHTML = "";
// });

/// Pour gérer le menu

var small_menu = document.querySelector(".toggle_menu");
var menu = document.querySelector(".menu");

small_menu.onclick = function () {
  small_menu.classList.toggle("active");
  menu.classList.toggle("responsive");
};

// async function takeMenu() {
//   const zvt = await fetch("./menu.json");
//   return await zvt.json();
// }

// takeMenu().then((data) => displayMenu(data["beverage"]));

// caroussel

let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = index;
    }
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(${-slideIndex * 100}%)`;
}

const prev = document.querySelector(".prev-btn")
prev.addEventListener("click", ()=>{
  nextSlide()
})

const next = document.querySelector(".next-btn")
next.addEventListener("click", ()=>{
  prevSlide()
})

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

showSlide(slideIndex);

// Auto-slide functionality
setInterval(() => {
    nextSlide();
}, 3000); // Change slide every 3 seconds

const learn = document.querySelector("#learn")
const span = document.querySelector(".about .right span")
const hidden = document.querySelector(".hidden")

learn.addEventListener("click",() => {
  hidden.style.display = "block"
  span.style.display = "none" 
  learn.style.display = "none"
})
