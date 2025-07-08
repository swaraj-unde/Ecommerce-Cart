document.addEventListener("DOMContentLoaded", () => {
  let shop_box = document.getElementById("added-products");
  let empty_box = document.getElementById("not-added");
  let add_box = document.getElementById("added");
  let tot = document.getElementById("total");
  let prod_box = document.querySelector(".products");
  let check = document.getElementById("check-button");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  showCart();

  check.addEventListener("click", () => {
    if (cart.length) {
      alert(`Thanks for Shopping! ${tot.innerText}`);
      cart = [];
      showCart();
    }
  });

  let products = [
    {
      name: "Product 1",
      price: 90.99,
      cnt: 1,
    },
    {
      name: "Product 2",
      price: 79.49,
      cnt: 1,
    },
    {
      name: "Product 3",
      price: 120.09,
      cnt: 1,
    },
  ];
  console.log(products);

  products.forEach((prod) => {
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
        <p class="name">${prod.name} - $${prod.price.toFixed(2)}</p>
        `;
    let btn = document.createElement("button");
    btn.classList.add("Add");
    btn.innerText = `Add to Cart`;

    btn.addEventListener("click", () => {
      let found = cart.find(
        (p) => p.name === prod.name && p.price === prod.price
      );
      if (found) {
        found.cnt += 1;
      } else {
        cart.push({ ...prod, cnt: 1 });
      }
      showCart();
    });

    item.appendChild(btn);
    prod_box.appendChild(item);
  });

  function showCart() {
    shop_box.innerHTML = ``;
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length) {
      empty_box.classList.add("hidden");
      add_box.classList.remove("hidden");
      let total = 0;
      cart.forEach((prod) => {
        total += prod.price * prod.cnt;
        let item = document.createElement("div");
        item.classList.add("added-item");
        item.innerHTML = `
               <p class="added-product">${prod.name} x ${prod.cnt} - $${(
          prod.price * prod.cnt
        ).toFixed(2)}</p>
              `;
        let btn = document.createElement("button");
        btn.classList.add("remove-button");
        btn.innerText = `Remove Product`;

        btn.addEventListener("click", () => {
          let ind = cart.findIndex(
            (p) => p.name === prod.name && p.price === prod.price
          );
          if (ind !== -1) {
            if (cart[ind].cnt > 1) {
              cart[ind].cnt -= 1;
            } else {
              cart.splice(ind, 1);
            }
          }
          showCart();
        });
        item.appendChild(btn);
        shop_box.appendChild(item);
      });
      tot.innerText = `Total - $${total.toFixed(2)}`;
    } else {
      empty_box.classList.remove("hidden");
      add_box.classList.add("hidden");
    }
  }
});
