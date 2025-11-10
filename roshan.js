
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
$(document).ready(function() {
  let addVisible = false;
  let subVisible = false;
  let mulVisible = false;
  let divVisible = false;
  let msgVisible = false;

  $("#addBtn").click(function() {
    if (!addVisible) {
      $("#addOutput").text("23 + 2 = " + (23 + 2)).show();
      addVisible = true;
    } else {
      $("#addOutput").hide();
      addVisible = false;
    }
  });

  $("#subBtn").click(function() {
    if (!subVisible) {
      $("#subOutput").text("23 - 2 = " + (23 - 2)).show();
      subVisible = true;
    } else {
      $("#subOutput").hide();
      subVisible = false;
    }
  });

  $("#mulBtn").click(function() {
    if (!mulVisible) {
      $("#mulOutput").text("7 × 3 = " + (7 * 3)).show();
      mulVisible = true;
    } else {
      $("#mulOutput").hide();
      mulVisible = false;
    }
  });

  $("#divBtn").click(function() {
    if (!divVisible) {
      $("#divOutput").text("20 ÷ 4 = " + (20 / 4)).show();
      divVisible = true;
    } else {
      $("#divOutput").hide();
      divVisible = false;
    }
  });

  $("#msgBtn").click(function() {
    if (!msgVisible) {
      $("#msgOutput").text("Roshan loves to travel and learn.").show();
      msgVisible = true;
    } else {
      $("#msgOutput").hide();
      msgVisible = false;
    }
  });
});

