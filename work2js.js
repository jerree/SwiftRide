// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  var dateInput = document.getElementById("pickup-date");

  // Get today’s date in YYYY-MM-DD format
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
  var dd = String(today.getDate()).padStart(2, '0');

  var formattedToday = yyyy + '-' + mm + '-' + dd;

  // Set the minimum selectable date to today
  dateInput.setAttribute("min", formattedToday);
});

window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");

  setTimeout(function () {
    preloader.classList.add("hide-loader");
  }, 1200);
});

function revealOnScroll() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 30;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("show");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

var heroSlides = [
  {
    image: 'audi (2).jpg',
    title: 'Book Your Ride Instantly',
  },
  {
    image: 'audi (3).jpg',
    title: 'Move Around Kaduna With Ease',
  }
];

heroSlides.forEach(function (slide) {
  var img = new Image();
  img.src = slide.image;
});

function changeHero(index) {
  var title = document.getElementById("heroTitle");
  var dots = document.querySelectorAll(".hero-dot");
  var backgrounds = document.querySelectorAll(".hero-bg");

  backgrounds.forEach(function (bg) {
    bg.classList.remove("active");
  });

  backgrounds[index].classList.add("active");

  title.textContent = heroSlides[index].title;
  title.style.animation = "none";

  setTimeout(function () {
    title.style.animation = "slideText 0.8s ease";
  }, 30);

  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });

  dots[index].classList.add("active");
}

var menuIcon = document.getElementById("menuIcon");
var navMenu = document.getElementById("navMenu");

menuIcon.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  var locationSelect = document.getElementById("location");
  var destinationSelect = document.getElementById("destination");
  var form = document.getElementById("rideForm");
  var errorMessage = document.getElementById("error");

  var rideOptionsModal = document.getElementById("rideOptionsModal");
  var rideOptionsList = document.getElementById("rideOptionsList");
  var closeRideOptions = document.getElementById("closeRideOptions");

  function updateDestinationOptions() {
    for (var i = 0; i < destinationSelect.options.length; i++) {
      destinationSelect.options[i].disabled = false;
    }

    if (locationSelect.value) {
      for (var j = 0; j < destinationSelect.options.length; j++) {
        var option = destinationSelect.options[j];

        if (option.value === locationSelect.value && option.value !== "") {
          option.disabled = true;
        }
      }
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (locationSelect.value === destinationSelect.value) {
      errorMessage.textContent = "Pickup and destination cannot be the same!";
      return;
    }

    errorMessage.textContent = "";
    searchRide();
  });

  locationSelect.addEventListener("change", updateDestinationOptions);
  updateDestinationOptions();

  function searchRide() {
    rideOptionsList.innerHTML = "";

    var transports = [
      {
        name: "City Bus",
        icon: "fa-bus",
        price: "500 NGN",
        time: "15 mins",
        status: "Available"
      },
      {
        name: "Taxi Ride",
        icon: "fa-taxi",
        price: "1500 NGN",
        time: "8 mins",
        status: "Available"
      },
      {
        name: "Tricycle Ride",
        icon: "fa-car-side",
        price: "700 NGN",
        time: "10 mins",
        status: "Available"
      },
      {
        name: "Bike Ride",
        icon: "fa-motorcycle",
        price: "400 NGN",
        time: "5 mins",
        status: "Fastest"
      }
    ];

    for (var k = 0; k < transports.length; k++) {
      var transport = transports[k];

      var card = document.createElement("div");
      card.className = "card";

      card.innerHTML =
        "<div class='card-top'>" +
        "<div class='ride-icon'><i class='fas " + transport.icon + "'></i></div>" +
        "<span class='ride-status'>" + transport.status + "</span>" +
        "</div>" +
        "<h3>" + transport.name + "</h3>" +
        "<div class='ride-info'>" +
        "<p><i class='fas fa-money-bill-wave'></i> " + transport.price + "</p>" +
        "<p><i class='fas fa-clock'></i> " + transport.time + "</p>" +
        "</div>" +
        "<button class='book-btn' onclick='bookRide(\"" + transport.name + "\", \"" + transport.price + "\", \"" + transport.time + "\")'>Book Ride</button>";

      rideOptionsList.appendChild(card);
    }

    rideOptionsModal.style.display = "flex";
  }

  closeRideOptions.onclick = function () {
    rideOptionsModal.style.display = "none";
  };
});

var countersStarted = false;

function startCounters() {
  var statsSection = document.querySelector(".stats-section");

  if (!statsSection) return;

  var sectionTop = statsSection.getBoundingClientRect().top;
  var windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100 && countersStarted === false) {
    countersStarted = true;

    var counters = document.querySelectorAll(".counter");

    counters.forEach(function (counter) {
      var target = Number(counter.getAttribute("data-target"));
      var suffix = counter.getAttribute("data-suffix") || "";
      var count = 0;
      var speed = target / 80;

      function updateCounter() {
        count += speed;

        if (count < target) {
          counter.textContent = Math.floor(count) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
			counter.textContent = target + suffix;
			counter.classList.add("counter-finished");
        }
      }

      updateCounter();
    });
  }
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

function bookRide(name, price, time) {
  var location = document.getElementById("location").value;
  var destination = document.getElementById("destination").value;

  var modal = document.getElementById("bookingModal");
  var bookingDetails = document.getElementById("bookingDetails");

  bookingDetails.innerHTML =
    "<strong>" + name + "</strong><br>" +
    location + " to " + destination + "<br>" +
    "Price: " + price + "<br>" +
    "Arrival Time: " + time;

  modal.style.display = "flex";
}

document.getElementById("closeModal").onclick = function () {
  document.getElementById("bookingModal").style.display = "none";
};

document.getElementById("confirmBtn").onclick = function () {
  document.getElementById("bookingModal").style.display = "none";
};

function openDriverModal() {
  document.getElementById("driverModal").style.display = "flex";
}

document.getElementById("closeDriverModal").onclick = function () {
  document.getElementById("driverModal").style.display = "none";
};

var backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

var sections = document.querySelectorAll("section[id], footer[id]");
var navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  var currentSection = "home";
  var scrollPosition = window.scrollY + 180;

  sections.forEach(function (section) {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.getAttribute("id");
    }
  });

  /* Force Contact when user is near bottom */
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
    currentSection = "contact";
  }

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

var navPill = document.querySelector(".nav-pill");

function moveNavPill() {
  var activeLink = document.querySelector(".nav-link.active");

  if (!activeLink || !navPill) return;

  navPill.style.width = activeLink.offsetWidth + "px";
  navPill.style.left = activeLink.offsetLeft + "px";
}

window.addEventListener("load", moveNavPill);
window.addEventListener("scroll", moveNavPill);
window.addEventListener("resize", moveNavPill);

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    setTimeout(moveNavPill, 300);
  });
});