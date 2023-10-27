import './bootstrap';

const canvas = document.getElementById("stickmanCanvas");
const ctx = canvas.getContext("2d");

const stickman = {
    x: 100,
    y: 100,
    speed: 4,
};

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
    stickman.x = Math.min(canvas.width - 20, Math.max(20, stickman.x));
    stickman.y = Math.min(canvas.height -90, Math.max(35, stickman.y));
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redesenha o boneco
    drawStickman();
});

function drawStickman() {
    ctx.beginPath()
    ctx.font = "12px serif";
    ctx.fillText("Name Name", stickman.x -25, stickman.y - 50);
    ctx.closePath();


      // Barra de HP (retângulo vermelho)
      const maxHP = 100; // Valor máximo de HP
      const currentHP = 75; // Valor atual de HP (ajuste conforme necessário)
  
      const hpBarWidth = 40;
      const hpBarHeight = 5;
      const hpBarX = stickman.x - hpBarWidth / 2;
      const hpBarY = stickman.y - 45;
  
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
    ctx.arc(stickman.x, stickman.y - 15, 20, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Corpo
    ctx.beginPath();
    ctx.moveTo(stickman.x, stickman.y);
    ctx.lineTo(stickman.x, stickman.y + 60);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    // Braços
    ctx.beginPath();
    ctx.moveTo(stickman.x, stickman.y + 10);
    ctx.lineTo(stickman.x - 20, stickman.y + 30);

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(stickman.x, stickman.y + 10);
    ctx.lineTo(stickman.x + 20, stickman.y + 30);

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    // Pernas
    ctx.beginPath();
    ctx.moveTo(stickman.x, stickman.y + 60);
    ctx.lineTo(stickman.x - 10, stickman.y + 90);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(stickman.x, stickman.y + 60);
    ctx.lineTo(stickman.x + 10, stickman.y + 90);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    
}

// Desenha o boneco inicialmente
drawStickman();