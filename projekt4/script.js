const brawlers = {
    SHELLY: {
        name: 'Shelly',
        emoji: '🐢',
        type: 'Танк',
        health: 800,
        damage: 80,
        super_damage: 250,
        color: '#ffd93d',
        image: 'https://foni.papik.pro/uploads/posts/2024-09/thumbs/foni-papik-pro-61or-p-kartinki-shelli-bravo-stars-na-prozrachnom-1.png'
    },
    COLT: {
        name: 'Colt',
        emoji: '🤠',
        type: 'Снайпер',
        health: 600,
        damage: 120,
        super_damage: 300,
        color: '#00ff00',
        image: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fcolt-is-one-of-the-coolest-brawlers-fight-me-v0-62mvvampydsa1.png%3Fauto%3Dwebp%26s%3D9e53b360c97d8205d69fe962d34ced6bf7b08cb4'
    },
    NITA: {
        name: 'Nita',
        emoji: '🐻',
        type: 'Танк',
        health: 900,
        damage: 90,
        super_damage: 280,
        color: '#ff6b6b',
        image: 'https://www.gamehelper.top/wp-content/uploads/2020/06/nita-brawl-stars-guide.jpg'
    },
    BULL: {
        name: 'Bull',
        emoji: '🐂',
        type: 'Тірекс',
        health: 1000,
        damage: 100,
        super_damage: 350,
        color: '#8B4513',
        image: 'https://www.gamehelper.top/wp-content/uploads/2020/06/bull-brawl-stars-guide.jpg'
    },
    JESSIE: {
        name: 'Jessie',
        emoji: '👧',
        type: 'Підтримка',
        health: 700,
        damage: 85,
        super_damage: 240,
        color: '#667eea',
        image: 'https://www.gamehelper.top/wp-content/uploads/2020/06/jessie-brawl-stars-guide.jpg'
    }
};


class Brawler {
    constructor(key, data) {
        this.key = key;
        this.name = data.name;
        this.emoji = data.emoji;
        this.type = data.type;
        this.maxHealth = data.health;
        this.health = data.health;
        this.damage = data.damage;
        this.superDamage = data.super_damage;
        this.superCharge = 0;
        this.superMaxCharge = 100;
        this.color = data.color;
        this.image = data.image;
    }

    attack(opponent) {
        const variance = Math.random() * 20 - 10; // -10 до +10
        let damage = this.damage + variance;
        damage = Math.max(5, Math.round(damage));
        
        opponent.health -= damage;
        opponent.health = Math.max(0, opponent.health);
        this.superCharge += 25;
        
        if (this.superCharge > this.superMaxCharge) {
            this.superCharge = this.superMaxCharge;
        }

        return damage;
    }

    useSuper(opponent) {
        if (this.superCharge >= this.superMaxCharge) {
            const variance = Math.random() * 30 - 15;
            let damage = this.superDamage + variance;
            damage = Math.round(damage);
            
            opponent.health -= damage;
            opponent.health = Math.max(0, opponent.health);
            this.superCharge = 0;
            
            return damage;
        }
        return null;
    }

    heal() {
        const healAmount = 50;
        const oldHealth = this.health;
        this.health = Math.min(this.health + healAmount, this.maxHealth);
        return this.health - oldHealth;
    }

    isAlive() {
        return this.health > 0;
    }

    canUseSuper() {
        return this.superCharge >= this.superMaxCharge;
    }
}

class BrawlStarsGame {
    constructor() {
        this.player = null;
        this.enemy = null;
        this.turn = 0;
        this.gameOver = false;
        this.battleLog = [];
    }

    selectBrawler(key) {
        this.player = new Brawler(key, brawlers[key]);
        const enemyKeys = Object.keys(brawlers);
        const randomEnemy = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        this.enemy = new Brawler(randomEnemy, brawlers[randomEnemy]);
        
        this.showBattleScreen();
        this.updateUI();
    }

    playerAttack() {
        if (this.gameOver) return;

        const damage = this.player.attack(this.enemy);
        this.addLog(`${this.player.name} атакував! Урон: ${Math.round(damage)}!`, 'attack-message');

        setTimeout(() => this.enemyTurn(), 1000);
    }

    playerUseSuper() {
        if (this.gameOver || !this.player.canUseSuper()) return;

        const damage = this.player.useSuper(this.enemy);
        this.addLog(`${this.player.name} використав СУПЕР! Урон: ${Math.round(damage)}!!!`, 'super-message');
        
        setTimeout(() => this.enemyTurn(), 1000);
    }

    playerHeal() {
        if (this.gameOver) return;

        const healed = this.player.heal();
        this.addLog(`${this.player.name} вилікував себе на ${Math.round(healed)} HP!`, 'heal-message');
        
        setTimeout(() => this.enemyTurn(), 1000);
    }

    enemyTurn() {
        if (!this.enemy.isAlive()) {
            this.endGame(true);
            return;
        }

        const random = Math.random();
        
        if (this.enemy.canUseSuper() && random > 0.6) {
            const damage = this.enemy.useSuper(this.player);
            this.addLog(`${this.enemy.name} використав СУПЕР! Урон: ${Math.round(damage)}!!!`, 'super-message');
        } else if (this.player.health < this.player.maxHealth * 0.3 && random > 0.5) {
            const healed = this.enemy.heal();
            this.addLog(`${this.enemy.name} вилікував себе на ${Math.round(healed)} HP!`, 'heal-message');
        } else {
            const damage = this.enemy.attack(this.player);
            this.addLog(`${this.enemy.name} атакував! Урон: ${Math.round(damage)}!`, 'attack-message');
        }

        if (!this.player.isAlive()) {
            this.endGame(false);
        } else {
            this.updateUI();
        }
    }

    endGame(playerWon) {
        this.gameOver = true;
        setTimeout(() => {
            this.showResultScreen(playerWon);
        }, 500);
    }

    addLog(message, className = '') {
        this.battleLog.push({ message, className });
        const logContent = document.getElementById('battleLog');
        const messageEl = document.createElement('div');
        messageEl.className = `log-message ${className}`;
        messageEl.textContent = message;
        logContent.appendChild(messageEl);
        logContent.scrollTop = logContent.scrollHeight;
    }

    updateUI() {

        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerAvatar').textContent = this.player.emoji;
        const playerHealthPercent = (this.player.health / this.player.maxHealth) * 100;
        document.getElementById('playerHealth').style.width = playerHealthPercent + '%';
        document.getElementById('playerHealthText').textContent = `HP: ${Math.round(this.player.health)}/${this.player.maxHealth}`;
        
        const playerSuperPercent = (this.player.superCharge / this.player.superMaxCharge) * 100;
        document.getElementById('playerSuper').style.width = playerSuperPercent + '%';
        document.getElementById('playerSuperText').textContent = `Super: ${Math.round(this.player.superCharge)}/${this.player.superMaxCharge}`;
        
        document.getElementById('superBtn').disabled = !this.player.canUseSuper();


        document.getElementById('enemyName').textContent = this.enemy.name;
        document.getElementById('enemyAvatar').textContent = this.enemy.emoji;
        const enemyHealthPercent = (this.enemy.health / this.enemy.maxHealth) * 100;
        document.getElementById('enemyHealth').style.width = enemyHealthPercent + '%';
        document.getElementById('enemyHealthText').textContent = `HP: ${Math.round(this.enemy.health)}/${this.enemy.maxHealth}`;
        
        const enemySuperPercent = (this.enemy.superCharge / this.enemy.superMaxCharge) * 100;
        document.getElementById('enemySuper').style.width = enemySuperPercent + '%';
        document.getElementById('enemySuperText').textContent = `Super: ${Math.round(this.enemy.superCharge)}/${this.enemy.superMaxCharge}`;
    }

    showBattleScreen() {
        document.getElementById('selection-screen').classList.remove('active');
        document.getElementById('result-screen').classList.remove('active');
        document.getElementById('battle-screen').classList.add('active');
        document.getElementById('battleLog').innerHTML = '';
        this.battleLog = [];
        this.addLog(`🎮 ${this.player.name} vs ${this.enemy.name} - БИТВА ПОЧАЛАСЬ!`);
    }

    showResultScreen(playerWon) {
        document.getElementById('battle-screen').classList.remove('active');
        document.getElementById('result-screen').classList.add('active');

        if (playerWon) {
            document.getElementById('resultTitle').textContent = '🎉 ПЕРЕМОГА! 🎉';
            document.getElementById('resultMessage').textContent = `${this.player.name} переміг ${this.enemy.name}!`;
            document.getElementById('resultTitle').style.color = '#ffd93d';
        } else {
            document.getElementById('resultTitle').textContent = '💀 ПОРАЗКА! 💀';
            document.getElementById('resultMessage').textContent = `${this.enemy.name} переміг ${this.player.name}!`;
            document.getElementById('resultTitle').style.color = '#ff6b6b';
        }
    }

    restart() {
        this.player = null;
        this.enemy = null;
        this.gameOver = false;
        document.getElementById('selection-screen').classList.add('active');
        document.getElementById('result-screen').classList.remove('active');
    }
}

const game = new BrawlStarsGame();

function initBrawlers() {
    const grid = document.getElementById('brawlersGrid');
    grid.innerHTML = '';
    
    Object.entries(brawlers).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'brawler-card';
        card.innerHTML = `
            <div class="brawler-emoji">${data.emoji}</div>
            <div class="brawler-name">${data.name}</div>
            <div class="brawler-type">${data.type}</div>
            <div class="brawler-stats">
                <div>❤️ ${data.health}</div>
                <div>⚔️ ${data.damage}</div>
                <div>⭐ ${data.super_damage}</div>
            </div>
        `;
        card.addEventListener('click', () => game.selectBrawler(key));
        grid.appendChild(card);
    });
}

function initGallery() {
    const gallery = document.getElementById('galleryContainer');
    gallery.innerHTML = '';
    
    Object.entries(brawlers).forEach(([key, data]) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${data.image}" alt="${data.name}" class="gallery-image">
            <div class="gallery-name">${data.name}</div>
            <span class="gallery-type">${data.type}</span>
            <div class="gallery-stats">
                <div class="stat-row">
                    <span class="stat-label">❤️ HP:</span>
                    <span class="stat-value">${data.health}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">⚔️ Урон:</span>
                    <span class="stat-value">${data.damage}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">⭐ Супер:</span>
                    <span class="stat-value">${data.super_damage}</span>
                </div>
            </div>
        `;
        gallery.appendChild(item);
    });
}

document.getElementById('attackBtn').addEventListener('click', () => game.playerAttack());
document.getElementById('superBtn').addEventListener('click', () => game.playerUseSuper());
document.getElementById('healBtn').addEventListener('click', () => game.playerHeal());
document.getElementById('backBtn').addEventListener('click', () => {
    game.restart();
});
document.getElementById('restartBtn').addEventListener('click', () => {
    game.restart();
});

initBrawlers();
initGallery();