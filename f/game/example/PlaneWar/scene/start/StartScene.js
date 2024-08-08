class StartScene extends Scene {
  constructor() {
    super();
    this.setup();
    this.setupInputs();
  }

  setup() {
    // 创建图像元素
    const skyImage = new GameImage("sky");
    const playerImage = new GameImage("player");
    playerImage.x = 125;
    playerImage.y = 350;

    // 创建标签元素
    const labels = [
      {
        text: "PlaneWar",
        x: 105,
        y: 150,
        font: "40px sans-serif",
        color: "#ffffff",
      },
      {
        text: "Press K to start",
        x: 85,
        y: 230,
        font: "28px sans-serif",
        color: "#ffffff",
      },
      {
        text: "W/S/A/D for direction",
        x: 87,
        y: 270,
        font: "20px sans-serif",
        color: "#ffffff",
      },
      {
        text: "f for fire",
        x: 144,
        y: 300,
        font: "20px sans-serif",
        color: "#ffffff",
      },
    ];

    // 添加图像和标签到场景中
    this.addElement(skyImage);
    this.addElement(playerImage);
    labels.forEach((labelConfig) => {
      const label = new GameLabel(
        labelConfig.text,
        labelConfig.x,
        labelConfig.y,
        labelConfig.font,
        labelConfig.color
      );
      this.addElement(label);
    });
  }

  setupInputs() {
    // 注册按键动作
    game.registerAction("k", () => {
      const scene = new MainScene();
      game.replaceScene(scene);
    });
  }
}
