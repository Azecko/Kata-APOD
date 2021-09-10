function getapod(date) {
  let APOD_API_KEY = localStorage.getItem('APOD_API_KEY') || 'DEMO_KEY'
  $.get(
    `https://api.nasa.gov/planetary/apod?api_key=${APOD_API_KEY}&date=${date}`,
    function (data) {

      $(document).prop("title", `APOD: ${data.title}`);
      let APODHTML = `<h1 class="apod-title">${data.title}</h1>
                    <p class="apod-date">${data.date}</p>`;

      if (data.media_type == "image") {
        APODHTML += `<a href=${data.hdurl} target="_blank">
            <img src=${data.url} class="apod-image">
        </a>`;
      } else if (data.media_type == "video") {
        APODHTML += `<div class="video-container">
          <iframe src=${data.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
      } else {
        console.error("Sorry, I can only show images and videos.");
      }

      APODHTML += `<p class="apod-description">${data.explanation}</p>`;
      APODHTML += `<p class="apod-copyright">copyright: ${ (data.copyright) ? data.copyright : 'NASA public domain' }</p>`

      $(".result").html(APODHTML);
    }
  )
  .fail(function() {
    let APOD_API_KEY = localStorage.getItem('APOD_API_KEY')

    $(".result").html(`NASA API KEY: <input id="APIKEYinput" type="text" placeholder="Please input your NASA API KEY here" value="${APOD_API_KEY ?? ''}" /><button id="setAPIKey">OK</button>`)

    $("#setAPIKey").click(function () {
      localStorage.setItem('APOD_API_KEY', $("#APIKEYinput").val());
      location.reload();
    })
  })
}

function manageclick() {
  var apoddate = $(".apod-date").text();

  let currentdate = new Date(apoddate);
  currentdate.setDate(currentdate.getDate() - 1);

  let daybefore = currentdate.toISOString().slice(0, 10);

  getapod(daybefore);
}

function managerightclick() {
  var apoddate = $(".apod-date").text();

  let currentdate = new Date(apoddate);
  currentdate.setDate(currentdate.getDate() + 1);

  let dayafter = currentdate.toISOString().slice(0, 10);

  getapod(dayafter);
}

$(document).ready(function () {
  let date = new Date().toISOString().slice(0, 10);
  getapod(date);

  $(".left-arrow").click(function () {
    manageclick();

    if ($(".right-arrow").css("opacity") == "0.1") {
      $(".right-arrow").css("opacity", "1");
      $(".right-arrow").css("cursor", "pointer");
    }
  });

  $(".right-arrow").css("opacity", "0.1");
  $(".left-arrow").css("cursor", "pointer");

  $(".right-arrow").click(function () {
    let apoddate = $(".apod-date").text();
    let currentdate = new Date(apoddate);

    if (date == currentdate.toISOString().slice(0, 10)) {
      $(".right-arrow").css("opacity", "0.1");
      $(".right-arrow").css("cursor", "default");
    } else {
      managerightclick();
      let olddate = new Date($(".apod-date").text());
      olddate.setDate(olddate.getDate() + 1);

      let newdate = olddate.toISOString().slice(0, 10);
      if (date == newdate) {
        $(".right-arrow").css("opacity", "0.1");
        $(".right-arrow").css("cursor", "default");
      } else {
        managerightclick();
      }
    }
  });

  //console.log(body)
});
