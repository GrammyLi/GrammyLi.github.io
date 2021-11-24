const addRenderer = () => {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
};

const addLight = (scene) => {
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  directionalLight.position.set(0, 1, 1);
};

const addLoader = () => {
  loader = new THREE.GLTFLoader();
  // 模型文件路径
  const sceneGltfUrl = "./model/scene.gltf";
  loader.load(sceneGltfUrl, function (gltf) {
    // 场景中添加模型文件
    scene.add(gltf.scene);
    // 玩偶
    doll = gltf.scene;
    gltf.scene.position.set(0, -1, 0);
    // 设置整体场景的比例
    gltf.scene.scale.set(0.4, 0.4, 0.4);
    startBtn.innerText = "start";
  });
};

const lookBackward = () => {
  gsap.to(doll.rotation, { duration: 0.45, y: -3.15 });
  setTimeout(() => (dallFacingBack = true), 150);
};

const lookForward = () => {
  gsap.to(doll.rotation, { duration: 0.45, y: 0 });
  setTimeout(() => (dallFacingBack = false), 450);
};

const createCube = (size, posX, rotY = 0, color = 0xfbc851) => {
  const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(posX, 0, 0);
  cube.rotation.y = rotY;
  scene.add(cube);
  return cube;
};

const addCubes = () => {
  createCube(
    { w: start_position * 2 + 0.21, h: 1.5, d: 1 },
    0,
    0,
    0xe5a716
  ).position.z = -1;
  createCube({ w: 0.2, h: 1.5, d: 1 }, start_position, -0.4);
  createCube({ w: 0.2, h: 1.5, d: 1 }, end_position, 0.4);
};

const addPlayers = () => {
  const player1 = new Player(scene, "Player 1", 0.25, 0.3, 0xd1ffc6);
  const player2 = new Player(scene, "Player 2", 0.25, -0.3, 0xffcfd2);

  players = [
    {
      player: player1,
      key: "ArrowUp",
      name: "Player 1",
    },
    {
      player: player2,
      key: "w",
      name: "Player 2",
    },
  ];
};

async function init() {
  await delay(500);
  text.innerText = "Starting in 3";
  await delay(500);
  text.innerText = "Starting in 2";
  await delay(500);
  text.innerText = "Starting in 1";
  lookBackward();
  await delay(500);
  text.innerText = "Gooo!!!";
  m.bgMusic.play();
  start();
}

function start() {
  const TIME_LIMIT = 15;
  gameStatus = "started";
  const progressBar = createCube({ w: 8, h: 0.1, d: 1 }, 0, 0, 0xebaa12);
  progressBar.position.y = 3.35;
  gsap.to(progressBar.scale, { duration: TIME_LIMIT, x: 0, ease: "none" });
  setTimeout(() => {
    if (gameStatus != "ended") {
      text.innerText = "Time Out!!!";
      m.loseMusic.play();
      gameStatus = "ended";
    }
  }, TIME_LIMIT * 1000);
  startDall();
}

async function startDall() {
  lookBackward();
  await delay(Math.random() * 1500 + 1500);
  lookForward();
  await delay(Math.random() * 750 + 750);
  startDall();
}

function animate() {
  renderer.render(scene, camera);
  players.map((player) => player.player.update());
  if (gameStatus == "ended") return;
  requestAnimationFrame(animate);
}

const bindEventKey = () => {
  addEventListener("keydown", function (e) {
    if (gameStatus != "started") {
      return;
    }
    let p = players.find((player) => player.key == e.key);
    if (p) {
      p.player.run();
    }
  });
  addEventListener("keyup", function (e) {
    let p = players.find((player) => player.key == e.key);
    if (p) {
      p.player.stop();
    }
  });
};

const bindEventClick = () => {
  bindEvent(e(".start-btn"), "click", () => {
    if (startBtn.innerText == "START") {
      init();
      e(".modal").style.display = "none";
    }
  });
};

const bindEventResize = () => {
  bindEvent(
    window,
    "resize",
    () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    },
    false
  );
};

// 初始化鱿鱼游戏
const initSquidGame = () => {
  // 游戏状态：loading | started | ended
  gameStatus = "loading";
  // 创建场景
  scene = new THREE.Scene();
  // 创建相机，设置相机的位置
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  // 创建场景渲染
  addRenderer();
  // 灯光效果
  addLight(scene);

  camera.position.z = 5;
  renderer.setClearColor(0xb7c3f3, 1);

  // 添加gltf
  addLoader();

  // 位置
  start_position = 6;
  end_position = -start_position;

  text = document.querySelector(".text");
  //
  addCubes();

  dallFacingBack = true;
  startBtn = document.querySelector(".start-btn");
  addPlayers();
};

const bindEvents = () => {
  bindEventKey();
  bindEventClick();
  bindEventResize();
};

const __main = () => {
  initSquidGame();
  animate();
  bindEvents();
};

__main();
