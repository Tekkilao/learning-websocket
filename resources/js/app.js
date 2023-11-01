import "./bootstrap";

let user;
//Salva todos os players conectados
let users = [];

let initial_position = {
    x: 0,
    y: 0,
};

const channel = Echo.channel("game");

//Inseri ou atualiza o player
const insertUser = (data) => {
    const index = users.findIndex((e) => e.user.id === data.user.id);

    if (index >= 0) {
        users[index] = data;
    } else {
        users.push(data);
    }
};

channel.listen("UserMoved", (data) => {
    //Verifica se existe no array de usuário
    insertUser(data);

    updateStickmanPositions(users);
});

axios
    .get("/api/user-data")
    .then((response) => {
        const userData = response.data;
        //Adicionar o player atual ao carregar a página
        insertUser({ user: userData, x: 100, y: 200 });
        user = userData;
    })
    .catch((error) => {
        console.error("error gettin user", error);
    });

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

//Limpa o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Coloca todos os players nas devidas posições
function updateStickmanPositions(users) {
    clearCanvas();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < users.length; i++) {
        const userData = users[i];

        if (userData != null) {
            const { user, x, y } = userData;

            drawStickman(x, y, user);
        } else {
            console.log("user data null");
        }
    }
}

function drawStickman(x, y, user) {
    if (stickman && typeof x !== "undefined" && typeof y !== "undefined") {
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
        console.error("Posição inválida");
    }
}

//Função para mover
function move() {
    axios
        .post("/move-stickman", { x: stickman.x, y: stickman.y })
        .then(() => {})
        .catch((error) => {
            console.error("Erro ao se mover", error);
        });

    stickman.x = Math.min(canvas.width - 20, Math.max(20, stickman.x));
    stickman.y = Math.min(canvas.height - 90, Math.max(35, stickman.y));
    // Limpa o canvas
    clearCanvas();

    // atualiza posição atual
    insertUser({ user, x: stickman.x, y: stickman.y });
    updateStickmanPositions(users);
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    switch (key) {
        case "w":
            stickman.y -= stickman.speed;
            move();
            break;
        case "a":
            stickman.x -= stickman.speed;
            move();
            break;
        case "s":
            stickman.y += stickman.speed;
            move();
            break;
        case "d":
            stickman.x += stickman.speed;
            move();
            break;
    }
});
// Desenha o boneco inicialmente
// drawStickman();
