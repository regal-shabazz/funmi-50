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
              <li><a href="../pages/celebrant.html">The Celebrant</a></li>
             
              <li><a href="../pages/guestbook.html">GuestBook</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    const MAIN = `
      <main>
        <section id="celebrant">
          <div class="container">
            <h2>Meet the Celebrant</h2>
  
            <div class="paragraph para-one">
              <p>Abdulazeez Bushurat Funmilola Nee Gbajabiamila  was born on the 15th of August 1974 to the family of Imam T.O.S Gbajabiamila who hails from Apongbon, Lagos Island in Lagos state.</p>
              <div class="figure-container">
                <div class="figure">
                <img src="../images/funmi-family-4.jpg" id="with-dad"/>
              </div>
              <div class="figure">
                <img src="../images/funmi-family-5.jpg" id="with-mom"/>
              </div>
              </div>
            </div>

            <div class="paragraph para-two">
              <p>She started her early education at Zumural Islamiyyah primary school, Lagos Island and from there, she proceeded to Hope height school, Ebute Elefun, Sura, Lagos Island for her secondary education. She had her Ordinary National Diploma (OND) and Higher National Diploma (HND) in business administration and management at Federal Polytechnic Ede, Osun state, she did her Post Graduate Diploma (PGD) and Masters in public administration at National Open University (N.O.U.N) Lagos state.</p>

               <div class="figure-container">
                <div class="figure">
                <img src="../images/funmi-solo-wine-1.jpg" id="wine-solo-1"/>
              </div>
              </div>
            </div>

            <div class="paragraph para-three">
              <p>She was employed into civil service in November 1995 as a clerical officer on grade level 04 at Lagos Island Local Government, after some years she was put in charge of the Lagos Island community skill acquisition center at phase II Adeniji Adele.
              She was then posted out to Iru Victoria Island LCDA where she served as coordinator for the skill acquisition center, she also worked at Eti-Osa Local government for a year and she is currently serving as Head of department for Agric and social services in Eti-Osa East LCDA.
              </p>

               <div class="figure-container">
                <div class="figure">
                <img src="../images/funmi-solo-blue-2.jpg" id="solo-blue-2"/>
              </div>
              <div class="figure">
                <img src="../images/funmi-solo-yellow-2.jpg" id="solo-yellow-2"/>
              </div>
              </div>
            </div>


            <div class="paragraph para-four">
              <p>She has attended various trainings and acquired different certificates in fashion designing, hats making and bead making, all of which she engages herself with during her leisure time asides spending quality time with her family.
            </p>
              <div class="figure-container">
                <div class="figure">
                <img src="../images/funmi-family-2.jpg" id="family-2"/>
                 </div>      
              </div>
            </div>

            <div class="paragraph para-five">
              <p>She has been married for 25years to Mr. Saheed Abiodun Azeez and their union is blessed with 4 Wonderful children; AbdulSamad, Saadat, Sabirat and Shaffiyyah.</p>
                 <div class="figure-container">
                <div class="figure">
                <img src="../images/funmi-family-3.jpg" id="family-3"/>
              </div>
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
