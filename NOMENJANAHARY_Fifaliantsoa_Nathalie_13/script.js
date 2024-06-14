let plats = [];
let culinary = "mainCourse";
let data = [];

/// Affiche les produits

async function displayMenu(plates) {
  const container = document.querySelector(".dishes");
  container.innerHTML = "";
  const plats = await plates;

  let purchased = [];

  if (localStorage.getItem("products")) {
    purchased = JSON.parse(localStorage.getItem("products"));
    count_purchased(purchased);
  }

  plats.forEach((plat) => {
    const div = document.createElement("div");
    div.classList.add("dish");

    const img = document.createElement("img");
    img.src = plat.img;

    const para = document.createElement("p");
    para.textContent = plat.nom;

    const price = document.createElement("h2");
    price.textContent = "$" + plat.price;

    const link = document.createElement("a");
    link.textContent = "Buy Now";
    link.style.cursor = "pointer";

    link.addEventListener("click", () => {
      addCart(plat);
    });

    div.appendChild(img);
    div.appendChild(para);
    div.appendChild(price);
    div.appendChild(link);

    container.appendChild(div);
  });
}

/// Ajouter un produit dans le pannier

function addCart(data) {
  let purchased = [];
  // console.log(localStorage.getItem("products"));

  if (localStorage.getItem("products")) {
    purchased = JSON.parse(localStorage.getItem("products"));
    console.log(purchased);

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
    localStorage.setItem("products", JSON.stringify(purchased));
    count_purchased(purchased);
  } else {
    purchased.push({ ...data, amont: 1 });
    // console.log(purchased);
  }
  localStorage.setItem("products", JSON.stringify(purchased));
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
  if (count === NaN) {
    purchased_number.textContent = "0";
  } else purchased_number.textContent = parseInt(count);
}

const container = document.querySelector(".container_products");
const resume = document.querySelector(".resume");
const code = document.querySelector(".code");
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
      nb.addEventListener("input", () => {
        element.amont = nb.value;
        price.textContent = "$" + (element.amont * element.price).toFixed(2);
        console.log(purchased);
        count_purchased(purchased);
        changerResume(purchased);
      });

      let del = document.createElement("div");
      del.classList.add("delete");
      del.addEventListener("click", () => {
        localStorage.setItem(
          "products",
          JSON.stringify(purchased.filter((item) => item.id !== element.id))
        );
        purchased = JSON.parse(localStorage.getItem("products"));
        console.log(purchased);
        count_purchased(purchased);
        changerResume(purchased);
        container.removeChild(div);
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

function changerResume(purchased) {
  const sub = document.querySelector(".span1");
  const tot = document.querySelector(".span3");
  let subTotal = 0;
  // console.log(purchased);
  purchased.forEach((product) => {
    subTotal += product.amont * product.price;
  });
  sub.textContent = "$" + subTotal.toFixed(2);

  tot.textContent = "$" + (4.89 + subTotal).toFixed(2);
}

/// pour afficher le resumé de l'achat

function Resume(purchased) {
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

const purchased_number = document.querySelector(".cart");
purchased_number.addEventListener("click", () => {
  let purchased = JSON.parse(localStorage.getItem("products"));
  console.log(purchased);
  const pannier = document.querySelector(".pannier");
  pannier.style.display = "block";
  showCart(purchased);
  const resu = Resume(purchased);
  const div = codey();
  // console.log(resu);
  containerPrincipal.appendChild(resu);
  containerPrincipal.appendChild(div);
});

/// Met en arrière plan le pannier

const cache = document.querySelector(".header img");
cache.addEventListener("click", () => {
  const pannier = document.querySelector(".pannier");
  const products = document.querySelector(".container_products");
  products.innerHTML = "";
  pannier.style.display = "none";
  resume.innerHTML = "";
  code.innerHTML = "";
});

/// Pour gérer le menu

var small_menu = document.querySelector(".toggle_menu");
var menu = document.querySelector(".menu");

small_menu.onclick = function () {
  small_menu.classList.toggle("active");
  menu.classList.toggle("responsive");
};

async function takeMenu() {
  const zvt = await fetch("./menu.json");
  return await zvt.json();
}

document.querySelectorAll(".content-menu .item").forEach((item) => {
  item.addEventListener("click", () => {
    // console.log(item.getAttribute("value"));
    culinary = item.getAttribute("value");
    displayMenu(data[culinary]);
  });
});

data = await takeMenu();
displayMenu(data[culinary]);

function codey() {

  // Create the .enter div
  const enterDiv = document.createElement("div");
  enterDiv.className = "enter";

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.placeholder = "Coupon (Limit 1)";
  enterDiv.appendChild(inputText);

  const inputSubmit = document.createElement("input");
  inputSubmit.type = "submit";
  inputSubmit.value = "APPLY";
  enterDiv.appendChild(inputSubmit);

  // Create the .apply div
  const applyDiv = document.createElement("div");
  applyDiv.className = "apply";

  const h4 = document.createElement("h4");
  h4.textContent = "Apply Code Here!";
  applyDiv.appendChild(h4);

  const span = document.createElement("span");
  span.textContent = "+";
  let app = 0;
  span.addEventListener("click", () => {
    if (app == 0) {
      enterDiv.style.display = "flex";
      span.textContent = "-";
      app = 1;
    } else {
      enterDiv.style.display = "none";
      app = 0;
      span.textContent = "+";
    }
  });
  applyDiv.appendChild(span);

  // Create the .action div
  const actionDiv = document.createElement("div");
  actionDiv.className = "action";

  const paypalDiv = document.createElement("div");
  paypalDiv.className = "paypal";
  paypalDiv.textContent = "Secure Payment";
  actionDiv.appendChild(paypalDiv);

  // Append all created elements to the container
  code.appendChild(applyDiv);
  code.appendChild(enterDiv);
  code.appendChild(actionDiv);

  return code;
}

const learn = document.querySelector("#learn");
const span = document.querySelector(".about .right span");
const hidden = document.querySelector(".hidden");

learn.addEventListener("click", () => {
  hidden.style.display = "block";
  span.style.display = "none";
  learn.style.display = "none";
});
