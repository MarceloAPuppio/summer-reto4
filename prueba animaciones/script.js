const c1 = document.getElementById("cuadrado1");
const btn = document.querySelector("#trY");
const btn2 = document.querySelector("#trX");
const btn3 = document.querySelector("#rotateZ");
const btn4 = document.querySelector("#rebotar");

btn.addEventListener("click", () => {
  c1.classList.toggle("translatey");
});
btn2.addEventListener("click", () => {
  c1.classList.toggle("translatex");
});
btn3.addEventListener("click", () => {
  c1.classList.toggle("rotateZ");
});
btn4.addEventListener("click", () => {
  c1.classList.toggle("rebotar");
});
