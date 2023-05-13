const modalElement = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookMarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookMarks = [];

// Show modal and focus on first Input // And close the modal
function showModal() {
  modalElement.classList.add("show-modal");
  websiteName.focus();
}

function closeModal() {
  modalElement.classList.remove("show-modal");
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) =>
  e.target === modalElement
    ? modalElement.classList.remove("show-modal")
    : false
);

// Form validation
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert("Please provide values for both fields!");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("Please provide a valid URL address.");
    return false;
  }

  return true;
}

// Build Bookmarks
function buildBookmarks() {
  // Remove prev bookmarks
  bookmarksContainer.textContent = "";

  bookMarks.forEach((bookmark) => {
    const { name, url } = bookmark;

    const item = document.createElement("div");
    item.classList.add("item");

    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);

    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");

    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");

    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    // Append into the container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);

    bookmarksContainer.appendChild(item);
  });
}
// Fetch bookmarks from localStorage
function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookMarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookMarks = [
      {
        name: "Google DE",
        url: "https://google.de",
      },
    ];

    localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
  }

  buildBookmarks();
}

// Delete bookmark
function deleteBookmark(url) {
  bookMarks.forEach((b, i) => {
    if (b.url === url) {
      bookMarks.splice(i, 1);
    }
  });

  //   Update bookmarks in LocalStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
  fetchBookmarks();
}

// Handle form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;
  if (!urlValue.includes("http://") && !urlValue.includes("https://")) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookMarks.push(bookmark);

  localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
  fetchBookmarks();
  bookMarkForm.reset();
  websiteName.focus();
}

bookMarkForm.addEventListener("submit", storeBookmark);

// Onload fetch bookmarks
fetchBookmarks();
