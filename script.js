// Variables to keep track of the current step and form data
let currentStep = 1;
const totalSteps = 5;

// Sample subcategories for each category
const subcategories = {
  "Electronics": ["Mobiles", "Laptops", "Cameras"],
  "Clothing": ["Men", "Women", "Kids"],
  "Home Appliances": ["Kitchen", "Living Room", "Bedroom"]
};

// Function to navigate to the next step with validation
function nextStep() {
  // Check if all required fields in the current step are filled
  const currentStepElement = document.getElementById(`step-${currentStep}`);
  const requiredFields = currentStepElement.querySelectorAll('[required]');
  let allFieldsFilled = true;

  requiredFields.forEach(field => {
    if (!field.value) {
      allFieldsFilled = false;
      field.classList.add('is-invalid'); // Highlight the field if it's empty
    } else {
      field.classList.remove('is-invalid');
    }
  });

  if (allFieldsFilled && currentStep < totalSteps) {
    // Move to the next step if all required fields are filled
    currentStepElement.classList.remove('active');
    currentStep++;
    document.getElementById(`step-${currentStep}`).classList.add('active');
  }
}

// Function to navigate to the previous step
function prevStep() {
  if (currentStep > 1) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep--;
    document.getElementById(`step-${currentStep}`).classList.add('active');
  }
}

// Populate subcategories based on selected category
function populateSubcategories() {
  const category = document.getElementById("category").value;
  const subcategorySelect = document.getElementById("subcategory");
  subcategorySelect.innerHTML = '<option value="">Select a Subcategory</option>';

  if (category && subcategories[category]) {
    subcategories[category].forEach(sub => {
      const option = document.createElement("option");
      option.value = sub;
      option.textContent = sub;
      subcategorySelect.appendChild(option);
    });
  }
}

// Variant modal management
function openVariantModal() {
  const variantModal = new bootstrap.Modal(document.getElementById('variantModal'));
  variantModal.show();
}

// Handle variant type selection to show relevant input
function handleVariantTypeChange() {
  const variantType = document.getElementById("variantType").value;
  document.getElementById("sizeInput").style.display = variantType === "Size" ? "block" : "none";
  document.getElementById("colorInput").style.display = variantType === "Color" ? "block" : "none";
  document.getElementById("unitInput").style.display = variantType === "Unit" ? "block" : "none";
}

// Add variant details to the list
function addVariant() {
  const variantType = document.getElementById("variantType").value;
  let variantValue = "";

  if (variantType === "Size") {
    variantValue = document.getElementById("variantSize").value;
  } else if (variantType === "Color") {
    variantValue = document.getElementById("variantColor").value;
  } else if (variantType === "Unit") {
    const count = document.getElementById("variantUnitCount").value;
    const type = document.getElementById("variantUnitType").value;
    variantValue = `${count} ${type}`;
  }

  if (variantType && variantValue) {
    const variantList = document.getElementById("variantList");
    const variantItem = document.createElement("div");
    variantItem.classList.add("variant-item", "mb-2");
    variantItem.textContent = `${variantType}: ${variantValue}`;
    variantList.appendChild(variantItem);

    // Close the modal after adding
    const variantModal = bootstrap.Modal.getInstance(document.getElementById('variantModal'));
    variantModal.hide();
  }
}

// Update final price based on base price, discount, and shipping fee
function updateFinalPrice() {
  const basePrice = parseFloat(document.getElementById("basePrice").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const shippingFee = parseFloat(document.getElementById("shippingFee").value) || 0;

  const finalPrice = basePrice - (basePrice * discount / 100) + shippingFee;
  document.getElementById("finalPrice").value = finalPrice.toFixed(2);
}

document.getElementById("galleryImages").addEventListener("change", function () {
  const files = Array.from(this.files);
  const galleryPreview = document.getElementById("galleryPreview");
  galleryPreview.innerHTML = ""; // Clear previous previews

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      imgElement.classList.add("gallery-img", "me-2", "mb-2"); // Add some styling to images
      imgElement.style.width = "150px";
      imgElement.style.height = "150px";
      galleryPreview.appendChild(imgElement);
    };
    reader.readAsDataURL(file);
  });
});

document.getElementById("mainImage").addEventListener("change", function () {
  const file = this.files[0];
  const mainImagePreview = document.getElementById("mainImagePreview");
  mainImagePreview.innerHTML = ""; // Clear previous preview

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      imgElement.classList.add("main-img-preview"); // Add styling for preview image
      imgElement.style.width = "150px"; // Adjust size as needed
      imgElement.style.height = "150px";
      mainImagePreview.appendChild(imgElement);
    };
    reader.readAsDataURL(file);
  }
});

// Handle form submission, save data to local storage, and update table
document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Capture form data
  const productData = {
    productName: document.getElementById("productName").value,
    sku: document.getElementById("sku").value,
    brandName: document.getElementById("brandName").value,
    category: document.getElementById("category").value,
    subcategory: document.getElementById("subcategory").value,
    basePrice: document.getElementById("basePrice").value,
    finalPrice: document.getElementById("finalPrice").value,
    totalStock: document.getElementById("totalStock").value,
    galleryImages: Array.from(document.getElementById("galleryImages").files).map(file => URL.createObjectURL(file))
  };

  // Save to local storage
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(productData);
  localStorage.setItem("products", JSON.stringify(products));

  // Update the table
  updateProductTable();
  // Reset form
  document.getElementById("productForm").reset();
  currentStep = 1;
  document.querySelector(".step.active").classList.remove("active");
  document.getElementById("step-1").classList.add('active');
});

// Function to load products from local storage and display in table
function updateProductTable() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const tableBody = document.querySelector("#productTable tbody");
  tableBody.innerHTML = ""; // Clear previous data

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.productName}</td>
      <td>${product.sku}</td>
      <td>${product.category}</td>
      <td>${product.subcategory}</td>
      <td>${product.basePrice}</td>
      <td>${product.finalPrice}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit product function
function editProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[index];

  // Populate form fields with product data
  document.getElementById("productName").value = product.productName;
  document.getElementById("sku").value = product.sku;
  document.getElementById("brandName").value = product.brandName;
  document.getElementById("category").value = product.category;
  populateSubcategories(); // Load subcategories based on category
  document.getElementById("subcategory").value = product.subcategory;
  document.getElementById("basePrice").value = product.basePrice;
  document.getElementById("finalPrice").value = product.finalPrice;
  document.getElementById("totalStock").value = product.totalStock;

  // Remove product from list and save changes
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  updateProductTable();

  // Reset to first step for editing
  currentStep = 1;
  document.querySelector(".step.active").classList.remove("active");
  document.getElementById("step-1").classList.add("active");
}

// Delete product function
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  updateProductTable();
}

// Load table data on page load
document.addEventListener("DOMContentLoaded", updateProductTable);
