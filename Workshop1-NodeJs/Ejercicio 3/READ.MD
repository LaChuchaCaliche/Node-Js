document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts();
});
Este fragmento de codigo obtiene el elemento "fetch posts" que es un boton que inicia una funcion llamada "fetchPosts" una vez se le da click

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
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
Este fragmento de codigo es una funcion flecha, almacenada en la constante fetchPosts, lo primero que hace es hacer la petición fetch
si la respuesta es negativa osea esta false, arrojara el error 'network response was not ok' y el estatus en texto del response
de lo contrario devolvera la respuesta en forma de json. Dicha respuesta es recibida como "posts" en el siguiente then y ejecuta la funcion displayPosts, por ultimo encontramos el .catch que recoge los posibles errores y los muestra con la funcion displayError


const displayPosts = (posts) => {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${post.title}`;
        postList.appendChild(listItem);
    });
};
funcion displayposts, primero obtiene el elemento post-list del html por id
luego inserta un espacio vacio dentro luego inicia una funcion con el argumento posts que tambien es introducido en la promesa como el
response del json, luego por cada elemento en el json crea un elemento li y al interior de postList agrega el text content de post especificamente la seccion title, por ultimo lo agrega como child de listItem 

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
aca se define una constante y obtiene el div por id error-message e ingresa el error  como error. error.message 