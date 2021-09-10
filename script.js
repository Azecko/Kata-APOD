function getapod(date) {
  $.get(
    `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`,
    function (data) {
      $(".result").html(
        `<h1 class="apod-title">${data.title}</h1><p class="apod-date">${data.date}</p><a href=${data.hdurl} target="_blank"><img src=${data.url} class="apod-image"></img></a><p class="apod-description">${data.explanation}</p>`
      );
    }
  );
}

function manageclick() {
  var apoddate = $(".apod-date").text();

  let currentdate = new Date(apoddate);
  currentdate.setDate(currentdate.getDate() - 1);

  let daybefore = currentdate.toISOString().slice(0, 10);
  console.log(daybefore);

  getapod(daybefore);
}

$(document).ready(function () {
  let date = new Date().toISOString().slice(0, 10);
  getapod(date);

  $(".left-arrow").click(function () {
    manageclick();
  });

  $(".right-arrow").css("opacity", "0.1");
  $(".left-arrow").css("cursor", "pointer");

  //console.log(body)
});
