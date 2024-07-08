document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});

const fetchPosts = () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        // const listItem = document.createElement('li');
        // listItem.textContent = `Title: ${post.title}`;
        // postList.appendChild(listItem);
        console.log(post.image)
        const divsItems = document.createElement('DIV');
        const images = document.createElement("IMG");
        const buy = document.createElement("button")
        buy.innerText = "Buy"
        images.src = `${post.image}`;

        divsItems.appendChild(images);
        divsItems.append(post.price);
        divsItems.appendChild(buy)
        const $flexBox = document.getElementById('flex-shop');
        console.log(images)
        $flexBox.appendChild(divsItems);
    

       
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};