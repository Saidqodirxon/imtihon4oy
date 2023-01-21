const search = document.getElementById("search");
const CardBook = document.getElementById("card_book");
// to = tanlab oluvchi
function to(name) {
  return document.querySelector(name);
}
// yy = yangi yaratish
function yy(name) {
  return document.createElement(name);
}
var booksArray = [];
var modal = [];

search.addEventListener("input", (e) => {
  e.preventDefault();
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${search.value}&startIndex=0&maxResults=8`
  )
    .then((res) => res.json())
    .then((data) => {
      booksArray = data.items;
      modal = data.items;
      to(".len_").textContent = ` ${data.items.length} `;
      to(".price").textContent = ` ${data.totalItems} `;
      viewResults(data.items);
    });
  console.log("booksArray" + booksArray);
});
const viewResults = (arr) => {
  let area = to(".card_book");
  area.innerHTML = `book not found`;
  let output = "";
  let i = 0;
  arr.forEach(
    (itm) =>
      (output += `
        <div  class="col-3 mb-3">
        <div  class="card card_book card_w p-3">
        <div class="imgs_">
        <img
          src="${itm.volumeInfo.imageLinks.thumbnail}"
          class="img-fluid"
          alt="Error..."
        />
      </div>
      <div class="content__">
        <span class="title_" id="title_">${itm.volumeInfo.title.substr(
          0,
          20
        )}...</span>
        <span class="author_">${
          itm.volumeInfo.authors == undefined
            ? "authors not found"
            : itm.volumeInfo.authors[0]
        }</span>
        <span class="year_">${itm.volumeInfo.publishedDate}</span>
        <div
          class="d-flex mt-2 align-items-center justify-content-between"
        >
          <button class="btn btn-warning"
          onclick="addBokmark(${i++})"
          >Bookmark</button>
          <button
            class="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            onclick='openBookMarksInfo(${JSON.stringify(itm)})'
          >
            More Info
          </button>
        </div>
        <a href=${itm.volumeInfo.previewLink} class="btn btn-secondary">Read</a>
      </div>
      </div>
      </div>
`)
  );
  CardBook.innerHTML = output;
};

const bookmarks = [];
const AllCard = document.getElementById("all_cards");

function addBokmark(id) {
  console.log(id);
  bookmarks.push({ ...booksArray[id] });
  displayBookMarks(a);
}
function deleteBook(id) {
  bookmarks.filter((ff) => ff.id == id);
  bookmarks.splice(0, 1);
  displayBookMarks(a);
}
function displayBookMarks(a) {
  const AllCard = document.getElementById("all_cards");
  let j = 0;
  if (bookmarks.length === 0) {
    AllCard.innerHTML = "<strong>Empty...</strong>";
  } else {
    AllCard.innerHTML = bookmarks
      .map((item) => {
        return `   
            <div   class="card__">
            <div  class="one">
              <span class="title_">${item.volumeInfo.title.substr(
                0,
                20
              )}...</span>
              <span class="body_">${
                item.volumeInfo.authors == undefined
                  ? "authors not found"
                  : item.volumeInfo.authors
              }</span>
            </div>
            <div class="two">
              <img
                src="./images/book-open.svg"
                onclick='openBookMarksInfo(${JSON.stringify(item)})'
                data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
                class="open_"
                alt="Error..."
              />
              <img src="./images/delete.svg" onclick='deleteBook(${j++})' class="delete_" alt="Error..." />
            </div>
          </div>
            `;
      })
      .join("");
  }
}
var a = [];
const mHeader = document.getElementById("offcanvas-header");
const mHeader2 = document.getElementById("foter_modal");
const mBody = document.getElementById("offcanvas-body");
function openBookMarksInfo(id) {
  // modal.unshift(itm)
  console.log(id);
  mBody.innerHTML = `
  <div class="book_malumot">
  <div class="img_">
    <img
      src="${id.volumeInfo.imageLinks.thumbnail}"
      class="img-fluid"
      alt="Error..."
    />
  </div>
  <p class="body_">
    ${id.searchInfo.textSnippet}
  </p>
  <div class="author_btn_">
    <div class="df mb-3">
      <span>Author : </span> 
     ${
       id.volumeInfo.authors == undefined
         ? "authors not found"
         : `  <div class="btns__"> <a href="#" class="btn__">${id.volumeInfo.authors}</a> </div>`
     } 
     
     
    </div>
    <div class="df mb-3">
      <span> Published : </span>
      <div class="btns__">
        <a href="#" class="btn__">${id.volumeInfo.publishedDate} </a>
      </div>
    </div>
    <div class="df mb-3">
      <span> Publishers:</span>
      <div class="btns__">
        <a href="#" class="btn__"> ${
          id.volumeInfo.publishers == undefined
            ? "not found"
            : id.volumeInfo.publishers
        }</a>
      </div>
    </div>
    <div class="df mb-3">
      <span>Categories: </span>
      <div class="btns__">
        <a href="#" class="btn__">${
          id.volumeInfo.categories == undefined
            ? "not found"
            : id.volumeInfo.categories
        }  </a>
      </div>
    </div>
    <div class="df mb-3">
      <span> Pages Count:</span>
      <div class="btns__">
        <a href="#" class="btn__">346 </a>
      </div>
    </div>
  </div>
</div>
    `;
  mHeader.innerHTML = `
    <h5 class="offcanvas-title" id="offcanvasRightLabel">${id.volumeInfo.title}</h5>
    <button
    type="button"
    class="btn-close"
    data-bs-dismiss="offcanvas"
    aria-label="Close"
  ></button>
    `;
  mHeader2.innerHTML = `
  <div
  class="offcanvas-header w-100"
  style="display: flex; justify-content: end"
>
<a href="${id.volumeInfo.previewLink}"  class="btn btn-secondary">Read</a>
</div>
  `;
}
