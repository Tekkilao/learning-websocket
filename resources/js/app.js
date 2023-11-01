import './bootstrap';

let user;
let users = {};

let initial_position = {
    x: 0,
    y: 0
}

const channel = Echo.channel('game');

channel.listen('UserMoved', (data) => {
            users[data.user.id] = data.position;
            // console.log("meteçao de loko", data.position)
            console.log("gatiau", data)
            // console.log('teste1')
            updateStickmanPositions(data)
        })


axios.get('/api/user-data')
    .then(response => {
        const userData = response.data;

        return user = userData;
    })
    .catch(error => {
        console.error('error gettin user', error)
    })



// axios.get('/api/user-data')
//     .then(response => {
//         const user = response.data;
        
//         Echo.channel('game')
//         .listen('.UserMoved', (event) => {
//             users[event.user.id] = event.position;
//             console.log('teste2')
//             updateStickmanPositions(users)
//         })
        
//     })
//     .catch(error => {
//         console.error('Error while getting user data', error);
//     })

const canvas = document.getElementById("stickmanCanvas");
const ctx = canvas.getContext("2d");

const stickman = {
    x: 100,
    y: 100,
    speed: 4,
};


function updateStickmanPositions(users) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('users', users)

    Object.values(users).forEach(userData => {
        if (userData != null) {
        const {id, x, y} = userData;
        console.log('oq é id', id);
        console.log('oq é x', x)
        console.log('oq é y', y);

        drawStickman(x, y, user)
        }
        else {
            console.log("user data null")
        }
    })
}


function drawStickman(x, y, user) {
    if (stickman && typeof x !== 'undefined' && typeof y !== 'undefined') {
        ctx.beginPath();
        ctx.font = "12px serif";
        ctx.fillText(user.user, x - 25, y - 50);

        // Barra de HP (retângulo vermelho)
        const maxHP = 100; // Valor máximo de HP
        const currentHP = user.currentHP; // Valor atual de HP (ajuste conforme necessário)
    
        const hpBarWidth = 40;
        const hpBarHeight = 5;
        const hpBarX = x - hpBarWidth / 2;
        const hpBarY = y - 45;
    
        // Desenhe o contorno da barra de HP
        ctx.strokeStyle = "black";
        ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
    
        // Preencha a barra de HP com a cor (por exemplo, vermelho para HP)
        const hpBarColor = "red";
        const hpBarFillWidth = (currentHP / maxHP) * hpBarWidth;
        ctx.fillStyle = hpBarColor;
        ctx.fillRect(hpBarX, hpBarY, hpBarFillWidth, hpBarHeight);

    // Cabeça
    ctx.beginPath();
    ctx.arc(x, y - 15, 20, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Corpo
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 60);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    // Braços
    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x - 20, y + 30);

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 10);
    ctx.lineTo(x + 20, y + 30);

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    // Pernas
    ctx.beginPath();
    ctx.moveTo(x, y + 60);
    ctx.lineTo(x - 10, y + 90);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y + 60);
    ctx.lineTo(x + 10, y + 90);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
} else {
    console.error('Posição inválida');
}
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    switch (key) {
        case "w":
            stickman.y -= stickman.speed;
            break;
        case "a":
            stickman.x -= stickman.speed;
            break;
        case "s":
            stickman.y += stickman.speed;
            break;
        case "d":
            stickman.x += stickman.speed;
            break;
    }

    axios.post('/move-stickman', {x: stickman.x, y: stickman.y})
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Erro ao se mover', error);
        })




    stickman.x = Math.min(canvas.width - 20, Math.max(20, stickman.x));
    stickman.y = Math.min(canvas.height -90, Math.max(35, stickman.y));
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redesenha o boneco
    drawStickman(stickman.x, stickman.y, user);
});


// Desenha o boneco inicialmente
// drawStickman();