document.addEventListener("DOMContentLoaded", () => {
  function renderPage() {
    const BODY = document.querySelector("body");

    const HEADER = `
      <header>
        <div class="container">
          <a href="../index.html" class="logo">#Funmilola@50!</a>
          <nav>
            <ul>
              <li><a href="../index.html">Home</a></li>
              <li><a href="../pages/celebrant.html">The Celebrant</a></li>
              <li><a href="../pages/gallery.html">Gallery</a></li>
              <li><a href="../pages/guestbook.html">GuestBook</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    const MAIN = `
    <main>
      <section id="gallery">
        <div class="container">
          <h2>Gallery - Video Greetings</h2>
          
          <div class="gallery-grid gallery-1">
            <video controls poster="../images/thmbnail1.png">
            <source src="../videos/video1.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail2.png">
            <source src="../videos/video2.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail3.png">
            <source src="../videos/video3.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail4.png">
            <source src="../videos/video4.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail5.png">
            <source src="../videos/video5.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail6.png">
            <source src="../videos/video6.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail7.png">
            <source src="../videos/video6.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <video controls poster="../images/thmbnail8.png">
            <source src="../videos/video6.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          </div>
        </div>
      </section>
    </main>
  `;

    const FOOTER = `
      <footer>
        <div class="container">
          <div id="countdown-container" class="animated-container active">
            <p style="line-height: 1.5">Countdown to the big day: <br/> <span id="countdown"></span></p>
          </div>
          <div id="date" class="animated-container">
            <p>Date: 17th August, 2024</p>
          </div>
          <div id="venue" class="animated-container">
            <p>Venue: 7, Kayode Oni Animashaun Street, off Emmanuel Onoji crescent, Olokonla Bus stop(beside Readington school opposite Total petrol station)</p>
          </div>
          <div id="color-of-the-day" class="animated-container">
            <p>Time: 10am</p>
          </div>
        </div>
      </footer>
    `;

    BODY.innerHTML = HEADER + MAIN + FOOTER;

    initializeCountdown()
    cycleAnimatedContainers()
    highlightCurrentPage()
  }

  function initializeCountdown() {
    const countdownElement = document.getElementById("countdown");
    const eventDate = new Date("August 17, 2024 10:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = eventDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${days}days ${hours}hrs ${minutes}mins ${seconds}secs`;

      if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "The event has started!";
      }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  function cycleAnimatedContainers() {
    const containers = document.querySelectorAll('.animated-container');
    let currentIndex = 0;

    function showNextContainer() {
      containers[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % containers.length;
      containers[currentIndex].classList.add('active');
    }

    setInterval(showNextContainer, 7000); // Change every 7 seconds
  }

  function highlightCurrentPage() {
    const links = document.querySelectorAll("nav ul li a");
    const currentURL = window.location.href;

    links.forEach(link => {
      if (link.href === currentURL) {
        link.classList.add("active");
      }
    });
  }
  renderPage();
});