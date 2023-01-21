let searchInput = document.querySelector("#searchBook");

// to = tanlab oluvchi
function to(name) {
  return document.querySelector(name);
}
// yy = yangi yaratish
function yy(name) {
  return document.createElement(name);
}

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}&startIndex=0&maxResults=6`
  )
    .then((res) => res.json())
    .then((data) => {
      to(".natijalar").textContent = data.totalItems;
      console.log(data);
      let books = data.items;
      let area = to(".card");
      area.innerHTML = `null`;
      console.log(searchInput.value);
      books.forEach((element) => {
        if (searchInput.value == null) {
          let nothingTxt = yy("h2");
          nothingTxt.style.fontWeight = "700";
          area.innerHTML = nothingTxt;
          area.remove("card");
        }
        let i = 0;
        let card = yy("div");
        card.classList.add("card");
        // console.log(card);
        let cardImgTop = yy("div");
        cardImgTop.classList.add("card-img-top");
        // console.log(cardImgTop);
        let cardBody = yy("div");
        cardBody.classList.add("card-body");
        // console.log(cardBody);
        let cardTitle = yy("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = element.volumeInfo.title;
        // console.log(cardTitle);
        let cardText = yy("p");
        cardText.textContent = element.volumeInfo.authors;
        cardText.classList.add("card-text");
        // console.log(cardText);

        let img = yy("img");
        img.setAttribute("src", element.volumeInfo.imageLinks.smallThumbnail);
        console.log(img);
        cardImgTop.append(img);
        card.append(cardImgTop);
        card.append(cardBody);
        cardBody.append(cardTitle, cardText);
        area.append(card);
        console.log(element.volumeInfo.title);
        console.log(element.volumeInfo.authors);
        console.log(element.volumeInfo.imageLinks.smallThumbnail);
      });
    });
});

{
  /* <div class="w-25 h-25">
<div class="card p-3">
  <img src="./images/bg.jpg" class="card-img-top" alt="..." />
  <div class="card-body">
    <div class="card-text lh-1">
      <p class="h6">Python</p>
      <p>David M. Beazley</p>
      <p>2009</p>
    </div>
    <div class="btns d-flex gap-3 mb-3">
      <button class="w-50 btn btn-warning fw-bold">Bookmark</button>
      <button
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        class="w-50 btn btn-light text-primary fw-bold"
      >
        More Info
      </button>
    </div>
    <button
      class="btn btn-light bg-secondary text-light fw-bold w-100"
    >
      Read
    </button>
  </div>
</div>
</div> */
}
