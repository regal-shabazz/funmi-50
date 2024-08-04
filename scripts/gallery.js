document.addEventListener("DOMContentLoaded", () => {
  function renderPage() {
    const BODY = document.querySelector("body");

    const HEADER = `
      <header>
        <div class="container">
          <a href="./index.html" class="logo">#Funmilola@50!</a>
          <nav>
            <ul>
              <li><a href="../index.html">Home</a></li>
              <li><a href="./celebrant.html">The Celebrant</a></li>
              <li><a href="./gallery.html">Gallery</a></li>
              <li><a href="./guestbook.html">GuestBook</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    const MAIN = `
      <main>
        <section id="gallery">
          <div class="container">
            <h2>Gallery</h2>

            <h3>Mrs. Abdulazeez Funmilola at 49</h3>
            
            <div class="gallery-grid gallery-1">
              <img src="./images/image1.jpg" alt="Image 1">
              <img src="./images/image2.jpg" alt="Image 2">
              <img src="./images/image3.jpg" alt="Image 3">
              <img src="./images/image4.jpg" alt="Image 4">
              <img src="./images/image5.jpg" alt="Image 5">
              <img src="./images/image6.jpg" alt="Image 6">
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


  renderPage();
});