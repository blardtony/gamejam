import { Application, Sprite } from 'pixi.js'

const app = new Application({
	// autoResize: true,
	autoDensity: true,
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	backgroundColor: 0x6495ed
});

app.renderer.resize(window.innerWidth, window.innerHeight);

const clampy: Sprite = Sprite.from("clampy.png");
clampy.scale.set(0.5);
clampy.anchor.set(0.5);
clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

app.stage.addChild(clampy);