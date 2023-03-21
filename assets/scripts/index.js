console.log("Hello from the JavaScript console!")
const app = new PIXI.Application();

const resize = () => {
    /* Resizing the canvas to the size of the window. */
    app.renderer.resize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", () => {
    /* Resizing the canvas to the size of the window. */
    resize();
})
/* Setting the position of the canvas to absolute. */
app.renderer.view.style.position = 'absolute';
/* Adding the canvas to the body of the HTML document. */
document.body.appendChild(app.view);
resize();