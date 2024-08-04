import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
    import {
      getFirestore,
      collection,
      addDoc,
      query,
      orderBy,
      onSnapshot,
      serverTimestamp,
      getDocs,
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyA-TgbTfmHyaFReCkaFRG-toOnhSITWDcg",
      authDomain: "abdulazeez-funmilola-birthday.firebaseapp.com",
      projectId: "abdulazeez-funmilola-birthday",
      storageBucket: "abdulazeez-funmilola-birthday.appspot.com",
      messagingSenderId: "994191687897",
      appId: "1:994191687897:web:31bcdfe63dc7ff7cdebec8",
      measurementId: "G-XR9LHWEGRF",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    document.addEventListener("DOMContentLoaded", () => {
      function transitionSplashScreenToHomepage() {
        const BODY = document.querySelector("body");

        const HEADER = `
          <header>
            <div class="container">
              <a href="./index.html" class="logo">#Funmilola@50!</a>
              <nav>
                <ul>
                  <li><a class="active" href="./index.html">Home</a></li>
                  <li><a href="./pages/celebrant.html">The Celebrant</a></li>
                  
                  <li><a href="./pages/guestbook.html">GuestBook</a></li>
                </ul>
              </nav>
            </div>
          </header>
        `;

        const MAIN = `
          <main>
            <section id="hero">
              <div class="container">
                <div id="hero-text-content">
                  <h3 class="golden-1">Golden Jubilee!</h3>
                  <h3 class="golden-2">Golden Jubilee!</h3>
                  <h3 class="golden-3">Golden Jubilee!</h3>
                </div>
                <div id="hero-images">
                  <img src="./images/funmi-solo-blue-3-removebg-preview.png" id="hero-image">  
                </div>
              </div>
              <img src="./images/Wave (4).svg" id="bg-wave"> 
            </section>

            <section id="wish-gift"> 
              <div class="container"> 
                <h2>Mrs. Abdulazeez Bushurat Funmilola  is  50!</h2>

                <div id="wishes-section">
                   <div id="well-wishes">
                     <h2>Well Wishers</h2>

                    <div id="wishes-card">
                      <p id="wish"></p>
                      <br>
                      <span id="wisher-info" style="font-weight: bold"></span>
                    </div>
                  </div>

                  <div id="guestbook-card">
                    <h3>Wish her a Happy Birthday</h3>
            
                    <form id="wish-form">
                      <div class="form-group">
                        <input type="text" id="wisher-first-name" name="wisher-first-name" placeholder="Enter your first name" required>
                        <input type="text" id="wisher-last-name" name="wisher-last-name" placeholder="Enter your last name" required>
                        <input type="text" id="more-wisher-info" name="more-wisher-info" placeholder="Enter additional details to help the celebrant recognize you" required> 
                      </div>
                      <div class="form-group">
                        <textarea id="wish-message" name="wish-message" rows="4" placeholder="Enter birthday message" required></textarea>
                      </div>
                      <button type="submit">Submit</button>
                    </form>

                    <div id="gifting-deets">
                     <span>For gifting: <br> 0009205420 - Access bank <br> Abdulazeez Bushurat Funmilola</span>
                    </div>
                  </div>
                </div>
              </div>

              <img src="./images/Wave (7).svg" id="bg-wave-2"/>
            </section>

            <section id="about">
              <div class="container">
                <h2>About the Celebrant</h2>

                <div  class="about-deet deet-one">
                  <p style="margin-bottom: 20px">Meet Abdulazeez Bushurat Funmilola, a dedicated public servant with over 25 years of experience in Lagos State's civil service. Born on August 15, 1974, she hails from Apongbon, Lagos Island.</p>

                  <div id="deet-one-image">
                    <img src="./images/funmi-solo-yellow-1.jpg"/>
                  </div>

                  <p>With a strong educational background in Business Administration and Public Administration, she has held various roles, including Head of Department for Agric and Social Services in Eti-Osa East LCDA. A skilled entrepreneur and family woman, she enjoys fashion designing, hat making, and bead making in her leisure time. Happily married for 25 years with four wonderful children.</p>
                </div>
                
                <p style="font-style: ita;ic">More about the Celebrant, <a href="./pages/celebrant.html" style="text-decoration: underline">click here</span></a></p>
              </div>
            </section>

            <section id="courtesy">
              <div class="container">
                <h3>
                  This website is a gift with  love from the Department of Agric and friends in Eti-Osa East LCDA, Lagos State Government
                </h3>

                <div id="lcda-logo">
                  <img src="./images/lcda east logo.png" id="eti-osa"/>
                  <img src="./images/lagos gov logo.png" id="lagos-gov"/>
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

        const wishForm = document.getElementById("wish-form");
        wishForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          const firstName = document.getElementById("wisher-first-name").value;
          const lastName = document.getElementById("wisher-last-name").value;
          const moreInfo = document.getElementById("more-wisher-info").value;
          const message = document.getElementById("wish-message").value;

          try {
            await addDoc(collection(db, "birthday-wishes"), {
              firstName: firstName,
              lastName: lastName,
              moreInfo: moreInfo,
              message: message,
              timestamp: serverTimestamp(),
            });
            alert("Wish submitted successfully!");
            wishForm.reset();
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        });

        initializeCountdown();
        cycleAnimatedContainers();
        displayWishes();
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

      async function displayWishes() {
        const wishElement = document.getElementById("wish");
        const wisherInfoElement = document.getElementById("wisher-info");
    
        let wishes = [];
        let currentIndex = 0;
    
        const updateWishDisplay = () => {
            if (wishes.length === 0) {
                wishElement.textContent = "";
                wisherInfoElement.textContent = "";
                return;
            }
    
            const currentWish = wishes[currentIndex];
            wishElement.textContent = currentWish.message;
            wisherInfoElement.textContent = `- ${currentWish.firstName} ${currentWish.lastName}, ${currentWish.moreInfo}`;
    
            wishElement.classList.add('fade-in');
            wisherInfoElement.classList.add('fade-in');
    
            setTimeout(() => {
                wishElement.classList.remove('fade-in');
                wisherInfoElement.classList.remove('fade-in');
            }, 4000);
    
            currentIndex = (currentIndex + 1) % wishes.length;
        };
    
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
        };
    
        try {
            const wishesQuery = window.collection(window.db, "birthday-wishes");
            const q = window.query(wishesQuery, window.orderBy("timestamp"));
    
            window.onSnapshot(q, (querySnapshot) => {
                wishes = querySnapshot.docs.map(doc => doc.data());
                shuffleArray(wishes); // Shuffle the array to display wishes randomly
                currentIndex = 0; // Reset index to show the first wish
                updateWishDisplay(); // Update display immediately with the latest data
            });
        } catch (error) {
            console.error("Error fetching wishes: ", error);
        }
    
        // Optionally, you can set an interval to cycle through the wishes
        setInterval(updateWishDisplay, 6000); // Change every 5 seconds
        highlightCurrentPage()
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
      

      setTimeout(() => {
        transitionSplashScreenToHomepage();
      }, 1000);
    });