const imageUpload = document.getElementById("imageUpload");
const addImage = document.getElementById("addImage");
const confirmUpload = document.getElementById("confirmUpload");
const previewImage = document.getElementById("previewImage");
const gallery = document.getElementById("galleryContainer");
const uploadCard = document.getElementById("uploadCard");
const uploadBox = document.getElementById("uploadBox");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const downloadBtn = document.getElementById("downloadBtn");
const removeBtn = document.getElementById("removeBtn"); // Add this line

let images = [];
let previewData = "";
let currentIndex = 0;

// Load images from localStorage on page load
window.onload = function() {
  const saved = localStorage.getItem("galleryImages");
  if (saved) {
    images = JSON.parse(saved);
    renderGallery();
  }
};

// Save images to localStorage whenever updated
function saveImages() {
  localStorage.setItem("galleryImages", JSON.stringify(images));
}

// Allow both box and button to open file input
uploadBox.addEventListener("click", () => imageUpload.click());
addImage.addEventListener("click", () => imageUpload.click());

// Handle file input change
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    previewData = e.target.result;
    previewImage.innerHTML = `<img src="${previewData}" alt="preview" />`;
  };
  reader.readAsDataURL(file);
});

// Confirm upload
confirmUpload.addEventListener("click", function () {
  if (!previewData) {
    alert("Please select an image first.");
    return;
  }

  images.unshift(previewData);
  renderGallery();
  saveImages(); // Always save after updating images
  uploadCard.style.order = 1;

  previewData = "";
  previewImage.innerHTML = "";
  imageUpload.value = '';
});

// Render gallery images
function renderGallery() {
  gallery.innerHTML = "";
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => openLightbox(index);
    gallery.appendChild(img);
  });
}

// Lightbox
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex];
  downloadBtn.href = images[currentIndex]; // Set download link
  downloadBtn.download = "image.jpg";     // Set default filename
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function navigate(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  lightboxImg.src = images[currentIndex];
  downloadBtn.href = images[currentIndex];
  downloadBtn.download = "image.jpg";
}

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex];
  downloadBtn.href = images[currentIndex];
  downloadBtn.download = "image.jpg";
}

// Remove image handler
removeBtn.addEventListener("click", function () {
  if (images.length === 0) return;
  images.splice(currentIndex, 1); // Remove current image
  saveImages();                   // Save updated images
  renderGallery();                // Update gallery
  closeLightbox();                // Close lightbox
});