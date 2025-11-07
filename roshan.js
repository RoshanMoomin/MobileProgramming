
function toggleContainer1() {
  const text = document.getElementById("toggleText1");
  const button = event.target;

}

function showSum() {
  let roshan = 5;
  let marasini = 6;
  const sum = roshan + marasini;
  const result = document.getElementById("sumResult");
  result.textContent = `The sum of ${roshan} + ${marasini} is ${sum}.`;
}
