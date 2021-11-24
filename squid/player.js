/*
 * @Author: your name
 * @Date: 2021-11-24 09:25:32
 * @LastEditTime: 2021-11-24 09:31:24
 * @LastEditors: Please set LastEditors
  * @FilePath: /squid/player.js
 */

DEAD_PLAYERS = 0;
SAFE_PLAYERS = 0;
class Player {
  constructor(scene, name = "Player", radius = 0.25, posY = 0, color = 0xffffff) {
    const geometry = new THREE.SphereGeometry(radius, 100, 100);
    const material = new THREE.MeshBasicMaterial({ color });
    const player = new THREE.Mesh(geometry, material);
    scene.add(player);
    player.position.x = start_position - 0.4;
    player.position.z = 1;
    player.position.y = posY;
    this.player = player;
    this.playerInfo = {
      positionX: start_position - 0.4,
      velocity: 0,
      name,
      isDead: false,
    };
  }

  run() {
    if (this.playerInfo.isDead) return;
    this.playerInfo.velocity = 0.03;
  }

  stop() {
    gsap.to(this.playerInfo, { duration: 0.1, velocity: 0 });
  }

  check() {
    if (this.playerInfo.isDead) return;
    if (!dallFacingBack && this.playerInfo.velocity > 0) {
      text.innerText = this.playerInfo.name + " lost!!!";
      this.playerInfo.isDead = true;
      this.stop();
      DEAD_PLAYERS++;
      loseMusic.play();
      if (DEAD_PLAYERS == players.length) {
        text.innerText = "Everyone lost!!!";
        gameStatus = "ended";
      }
      if (DEAD_PLAYERS + SAFE_PLAYERS == players.length) {
        gameStatus = "ended";
      }
    }
    if (this.playerInfo.positionX < end_position + 0.7) {
      text.innerText = this.playerInfo.name + " is safe!!!";
      this.playerInfo.isDead = true;
      this.stop();
      SAFE_PLAYERS++;
      m.winMusic.play();
      if (SAFE_PLAYERS == players.length) {
        text.innerText = "Everyone is safe!!!";
        gameStatus = "ended";
      }
      if (DEAD_PLAYERS + SAFE_PLAYERS == players.length) {
        gameStatus = "ended";
      }
    }
  }

  update() {
    this.check();
    this.playerInfo.positionX -= this.playerInfo.velocity;
    this.player.position.x = this.playerInfo.positionX;
  }
}
