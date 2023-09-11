

import data from "./db.json" assert { type: 'json' };
console.log(data.notes);
data.notes.push({
    "id": 3,
    "name": "aad"
})
console.log(data.notes);

// fetch('./db.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json)).catch((e) => console.log(e))