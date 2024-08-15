
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
  function loadGuestBookPage() {
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
        <section id="guestbook">
          <div class="container">
            <h2>Guestbook - Birthday Wishes</h2>
            <div id="guestbook-entries">
              <!-- Guestbook entries will be displayed here -->
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

        </div>
      </footer>
    `;

    BODY.innerHTML = HEADER + MAIN + FOOTER;

    // Call the function to display guestbook entries
    displayGuestbookEntries();
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


  async function displayGuestbookEntries() {
    const guestbookEntriesContainer = document.getElementById("guestbook-entries");

    try {
      const entriesQuery = window.collection(window.db, "birthday-wishes");
      const q = window.query(entriesQuery, window.orderBy("timestamp"));

      window.onSnapshot(q, (querySnapshot) => {
        guestbookEntriesContainer.innerHTML = ""; // Clear existing entries

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const entryDiv = document.createElement("div");
          entryDiv.classList.add("guestbook-entry");

          entryDiv.innerHTML = `
            
            <p>${data.message}</p>
             <p style="margin-top: 20px">- <strong>${data.firstName} ${data.lastName}</strong>, ${data.moreInfo}</p>
          `;

          guestbookEntriesContainer.appendChild(entryDiv);
        });
      });
    } catch (error) {
      console.error("Error fetching guestbook entries: ", error);
    }
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
    loadGuestBookPage();
  }, 1000);
});
