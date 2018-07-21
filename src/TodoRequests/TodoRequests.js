

const BASE_URL = "/api/todo";

export function getTodos(filterId) {
    return fetch(`${BASE_URL}${filterId ? `/?filterId=${filterId}` : ''}`).then(response => {
        if (response.ok) {
            return response.json();
        }
    })
}

export function addTodo(name) {
    return fetch(BASE_URL, {
        method : 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ name : name })
    })
}

export function updateTodo(id, todo) {
    return fetch(`${BASE_URL}/${id}`, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(todo)
    });
}

export function deleteTodo(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method : 'DELETE',
    });
}

export function getActiveCount() {
    return fetch(`${BASE_URL}/active`);
}