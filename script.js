document.addEventListener('DOMContentLoaded', () => {
    const endpoint = "https://crudcrud.com/api/c87c89264c6446c6bdd0a388d6d17382/products";

    // Function to add a new product
    async function addProduct() {
        const productName = document.getElementById('productName').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;
        const description = document.getElementById('description').value;

        const product = {
            productName,
            price,
            quantity,
            description
        };

        try {
            const response = await axios.post(endpoint, product);

            if (response.status === 201) {
                alert('Product added successfully!');
                fetchProducts();  // Refresh the product list
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to fetch and display products
    async function fetchProducts() {
        try {
            const response = await axios.get(endpoint);
            const products = response.data;

            const productList = document.getElementById('productList');
            productList.innerHTML = '';  // Clear the list

            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.productName} - $${product.price} - ${product.quantity} pcs - ${product.description}`;
                
                // Add Buy buttons
                const buyOneButton = document.createElement('button');
                buyOneButton.textContent = 'Buy One';
                buyOneButton.onclick = () => updateQuantity(product, 1);

                const buyTwoButton = document.createElement('button');
                buyTwoButton.textContent = 'Buy Two';
                buyTwoButton.onclick = () => updateQuantity(product, 2);

                const buyThreeButton = document.createElement('button');
                buyThreeButton.textContent = 'Buy Three';
                buyThreeButton.onclick = () => updateQuantity(product, 3);

                li.appendChild(buyOneButton);
                li.appendChild(buyTwoButton);
                li.appendChild(buyThreeButton);
                
                productList.appendChild(li);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to update product quantity
    async function updateQuantity(product, amount) {
        if (product.quantity < amount) {
            alert('Insufficient quantity!');
            return;
        }

        const updatedProduct = {
            productName: product.productName,
            price: product.price,
            quantity: product.quantity - amount,
            description: product.description
        };

        try {
            const response = await axios.put(`${endpoint}/${product._id}`, updatedProduct);

            if (response.status === 200) {
                alert('Product quantity updated successfully!');
                fetchProducts();  // Refresh the product list
            } else {
                alert('Failed to update product quantity.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Attach the addProduct function to the global scope to be accessible from the HTML button click
    window.addProduct = addProduct;

    // Fetch products on page load
    fetchProducts();
});
