document.addEventListener("DOMContentLoaded", function() {
    const foodCategories = {
        biryani: 81,
        burger: 87,
        'butter-chicken': 22,
        dessert: 36,
        dosa: 83,
        idly: 77,
        pasta: 34,
        pizza: 95,
        rice: 35,
        samosa: 22
    };

    const foodCategoriesList = document.getElementById('foodCategories');
    const foodImageGrid = document.getElementById('foodImageGrid');
    const selectedCategoryTitle = document.getElementById('selectedCategory');

    // Function to fetch a random image for a given category
    function fetchRandomFoodImage(category) {
        return new Promise((resolve, reject) => {
            const url = `https://foodish-api.com/api/images/${category}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data.image);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    // Function to display random images for a food category
    function displayRandomFoodImages(category) {
        fetchRandomFoodImage(category)
            .then(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Random Food Image';

                const card = document.createElement('div');
                card.classList.add('card');
                card.appendChild(img);

                foodImageGrid.appendChild(card);
            })
            .catch(error => {
                console.error('Error fetching random food image:', error);
            });
    }

    // Function to clear previously displayed images
    function clearFoodImages() {
        foodImageGrid.innerHTML = '';
    }

    // Function to add food categories to the list
    function addFoodCategories() {
        for (const category in foodCategories) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = category;
            link.href = '#'; // Set href to '#' to prevent page reload
            link.addEventListener('click', function(event) {
                event.preventDefault();
                clearFoodImages();
                displayRandomFoodImages(category);
                selectedCategoryTitle.textContent = `Selected Category: ${category}`;
            });
            listItem.appendChild(link);
            foodCategoriesList.appendChild(listItem);
        }
    }

    // Function to display a random food image on initial page load
    function displayRandomFoodImageOnLoad() {
        const categories = Object.keys(foodCategories);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        displayRandomFoodImages(randomCategory);
        selectedCategoryTitle.textContent = `Selected Category: ${randomCategory}`;
    }

    // Initialize by adding food categories to the list and displaying a random image on load
    addFoodCategories();
    displayRandomFoodImageOnLoad();

    // Event listener to display a random food image when clicking anywhere on the page (outside of food categories)
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#foodCategories')) {
            clearFoodImages();
            displayRandomFoodImageOnLoad();
            selectedCategoryTitle.textContent = `Selected Category: Random`;
        }
    });
});
