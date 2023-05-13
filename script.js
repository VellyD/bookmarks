const modalElement = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookMarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

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
