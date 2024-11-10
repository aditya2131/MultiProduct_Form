README - Product Form Project

# Product Form Project

This project is a multi-step product form built with HTML, CSS, Bootstrap 5, and JavaScript. The form allows users to add detailed product information across multiple steps, preview main images, manage variants, and store the data in local storage. Users can view submitted products in a responsive table with options to edit and delete entries.

## Developer Information

*   **Name:** Aditya Mishra
*   **Location:** Prayagraj, India
*   **Email:** adityamishra.me@gmail.com
*   **GitHub:** [https://github.com/aditya2131](https://github.com/aditya2131)
*   **Portfolio:** [https://aditya-mishra-portfolio-five.vercel.app/](https://aditya-mishra-portfolio-five.vercel.app/)

## Project Structure

The project consists of the following key files:

*   `index.html` - The HTML file containing the form and table structure.
*   `style.css` - The CSS file with custom styling for the form and table.
*   `script.js` - The JavaScript file handling form navigation, data management, and local storage.

## Setup Instructions

1.  **Clone or Download the Repository**

```
git clone https://github.com/aditya2131/MultiProduct_Form.git
```

3.  **Open the Project in Your Code Editor**

Navigate to the folder where you cloned or downloaded the repository and open it in your preferred code editor (e.g., VS Code).

5.  **Open the `index.html` File in a Browser**

To view the form and start adding products, open `index.html` in a web browser.

## Code Explanation

### 1\. Multi-Step Form

The form is divided into multiple steps to collect product information in a structured way. Each step is wrapped in a `div` with unique IDs for easy navigation between steps.

#### HTML Code (Multi-Step Form)

```
<div id="step-1" class="step active">
    <!-- Step 1 content here -->
</div>

<div id="step-2" class="step">
    <!-- Step 2 content here -->
</div>
```

#### JavaScript Code for Navigation

JavaScript handles the "Next" and "Previous" buttons, ensuring required fields are validated before advancing to the next step.

```
function nextStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    if (allFieldsFilled) {
        currentStepElement.classList.remove('active');
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.add('active');
    }
}
```

### 2\. Local Storage

The data is saved to local storage when the form is submitted, making it available even after the page is refreshed.

```
// Save to local storage
let products = JSON.parse(localStorage.getItem("products")) || [];
products.push(productData);
localStorage.setItem("products", JSON.stringify(products));
```

### 3\. Image Preview

The form includes an image preview function for uploaded images, providing a better user experience.

```
function previewImage(event) {
    const mainImagePreview = document.getElementById("mainImagePreview");
    mainImagePreview.src = URL.createObjectURL(event.target.files[0]);
}
```

### 4\. Responsive Table for Displaying Products

The table displays submitted products, with options to edit or delete. The table uses Bootstrap classes for responsive design.

```
<table class="table table-bordered table-responsive" id="productTable">
    <thead>
        <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Base Price</th>
            <th>Final Price</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

## Contribution Guidelines

1.  **Fork the Repository**

Click on the "Fork" button at the top right corner of this repository to create your own copy.

3.  **Clone the Forked Repository**

```
git clone https://github.com/your-username/your-forked-repository.git
```

5.  **Create a New Branch**

```
git checkout -b feature-name
```

7.  **Make Your Changes**

Make your code changes, test them locally, and ensure they work as expected.

9.  **Commit Your Changes**

```
git add .
git commit -m "Add a brief description of your changes"
```

11.  **Push the Branch to GitHub**

```
git push origin feature-name
```

13.  **Submit a Pull Request**

Go to the original repository and click on "New Pull Request." Select your branch and submit your changes for review.

## License

This project is open-source and available under the MIT License.