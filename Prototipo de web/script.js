// Cuando el documento cargue, mostramos los comentarios guardados
document.addEventListener('DOMContentLoaded', () => {
    displayComments();
});

const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evitamos que la página se recargue

    // Obtenemos los valores de los inputs
    const userName = document.getElementById('userName').value;
    const userComment = document.getElementById('userComment').value;

    // Creamos un objeto para el nuevo comentario
    const newComment = {
        name: userName,
        text: userComment,
        date: new Date().toLocaleDateString()
    };

    // Traemos los comentarios guardados previamente (o un arreglo vacío si no hay)
    let comments = JSON.parse(localStorage.getItem('ecoScanComments')) || [];
    
    // Agregamos el nuevo comentario al inicio del arreglo
    comments.unshift(newComment);

    // Guardamos nuevamente en el localStorage
    localStorage.setItem('ecoScanComments', JSON.stringify(comments));

    // Limpiamos el formulario
    commentForm.reset();

    // Volvemos a mostrar la lista actualizada
    displayComments();
});

function displayComments() {
    const container = document.getElementById('comments-container');
    container.innerHTML = ''; // Limpiamos el contenedor

    // Traemos los comentarios del localStorage
    let comments = JSON.parse(localStorage.getItem('ecoScanComments')) || [];

    if(comments.length === 0) {
        container.innerHTML = '<p style="color:#777;">Aún no hay comentarios. ¡Sé el primero en opinar!</p>';
        return;
    }

    // Dibujamos cada comentario en la pantalla
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-box');
        
        commentDiv.innerHTML = `
            <h4>${comment.name} <span style="font-size:0.8em; color:#888; font-weight:normal;">- ${comment.date}</span></h4>
            <p>${comment.text}</p>
        `;
        
        container.appendChild(commentDiv);
    });
}