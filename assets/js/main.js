
/* =========================
   Navbar
========================= */

window.initNavbar = function () {

  const navbar = document.getElementById("navbar");

  if (!navbar) return;


  window.addEventListener("scroll", () => {

    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 55
    );

  }, { passive: true });

};




/* =========================
   Mobile Navigation
========================= */

window.initMobileNav = function () {

  const navToggle =
    document.getElementById("navToggle");


  const navMobile =
    document.getElementById("navMobile");


  if (!navToggle || !navMobile) return;



  navToggle.addEventListener("click", () => {

    navToggle.classList.toggle("open");

    navMobile.classList.toggle("open");

  });



  navMobile.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navToggle.classList.remove("open");

        navMobile.classList.remove("open");

      });

    });


};





/* =========================
   Hero Carousel
========================= */

function initHeroCarousel() {

  const track =
    document.getElementById("carouselTrack");


  if (!track) return;



  const dots =
    document.querySelectorAll(".c-dot");


  const prev =
    document.getElementById("cPrev");


  const next =
    document.getElementById("cNext");



  let current = 0;

  const total = dots.length;

  let timer;



  function goTo(index) {

    current =
      (index + total) % total;


    track.style.transform =
      `translateX(-${current * 100}%)`;



    dots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === current
      );

    });

  }



  function start() {

    timer = setInterval(() => {

      goTo(current + 1);

    }, 5500);

  }



  function reset() {

    clearInterval(timer);

    start();

  }



  if (prev) {

    prev.onclick = () => {

      goTo(current - 1);

      reset();

    };

  }



  if (next) {

    next.onclick = () => {

      goTo(current + 1);

      reset();

    };

  }



  dots.forEach(dot => {

    dot.onclick = () => {

      goTo(
        Number(dot.dataset.index)
      );

      reset();

    };

  });



  start();

}





/* =========================
   Brand Filter
========================= */

function initBrandTabs() {

  const tabs =
    document.getElementById("brandTabs");


  if (!tabs) return;



  tabs.addEventListener("click", e => {


    const tab =
      e.target.closest(".brand-tab");


    if (!tab) return;



    const brand =
      tab.dataset.brand;



    tabs.querySelectorAll(".brand-tab")
      .forEach(t => {

        t.classList.toggle(
          "active",
          t === tab
        );

      });



    document.querySelectorAll(".product-card")
      .forEach(card => {


        card.style.display =
          (
            brand === "all" ||
            card.dataset.brand === brand
          )
            ?
            ""
            :
            "none";


      });


  });


}





/* =========================
   Scroll Reveal
========================= */

function initScrollReveal() {


  const elements =
    document.querySelectorAll(".reveal");


  if (!elements.length) return;



  const observer =
    new IntersectionObserver(entries => {


      entries.forEach(entry => {


        if (!entry.isIntersecting)
          return;



        entry.target.classList.add(
          "visible"
        );


        observer.unobserve(
          entry.target
        );


      });


    }, {
      threshold: .12
    });



  elements.forEach(el => {

    observer.observe(el);

  });


}





/* =========================
   RFQ Form
========================= */

function initRFQForm() {

  const form =
    document.getElementById("rfqForm");


  if (!form) return;



  const btn =
    document.getElementById("submitBtn");



  form.addEventListener("submit",
    async e => {


      e.preventDefault();


      btn.disabled = true;

      btn.innerHTML = "Sending...";



      try {


        const response =
          await fetch(
            form.action,
            {
              method: "POST",
              body: new FormData(form),
              headers: {
                "Accept": "application/json"
              }
            }
          );



        if (response.ok) {


          window.location.href =
            "/thank-you.html";


        } else {


          alert(
            "Submission failed. Please try again."
          );


          btn.disabled = false;

          btn.innerHTML =
            "Send Inquiry";

        }



      } catch (error) {


        alert(
          "Network error. Please try again."
        );


        btn.disabled = false;

        btn.innerHTML =
          "Send Inquiry";

      }


    });


}





/* =========================
   Normal Page Load
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {


    initHeroCarousel();

    initBrandTabs();

    initScrollReveal();

    initRFQForm();



    // Navbar
    if (window.initNavbar) {

      window.initNavbar();

    }


    // Mobile Navigation
    if (window.initMobileNav) {

      window.initMobileNav();

    }


    // Active Navigation
    if (window.initActiveNav) {

      window.initActiveNav();

    }


  });

/* =========================
   Active Navigation
========================= */

window.initActiveNav = function () {

    let currentPage = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop();


    // 首页根路径 / 自动对应 index
    if (currentPage === "") {
        currentPage = "index";
    }


    document.querySelectorAll(".nav-link")
    .forEach(link => {


        let linkPage = link
            .getAttribute("href")
            .split("?")[0]
            .replace(".html", "")
            .replace("/", "");


        // 清除旧状态
        link.classList.remove("active");


        // 匹配当前页面
        if (linkPage === currentPage) {

            link.classList.add("active");

        }


    });

};



/* =========================
   Home Section Memory
========================= */


window.saveSection = function (section) {

  sessionStorage.setItem(
    "returnSection",
    section
  );

};



window.restoreSection = function () {

  const params = new URLSearchParams(
    window.location.search
  );


  if (params.get("return") !== "true") {
    return;
  }


  const section = sessionStorage.getItem(
    "returnSection"
  );


  if (section) {

    const target = document.getElementById(section);


    if (target) {

      window.scrollTo(
        0,
        target.offsetTop - 90
      );

    }


    sessionStorage.removeItem(
      "returnSection"
    );

  }

};


/* ============================
   SECTION NAV ACTIVE 二级导航
============================ */

function initSectionNav(){


    const sections = document.querySelectorAll(
        "section[id]"
    );


    const navLinks = document.querySelectorAll(
        ".page-nav-links a"
    );


    if(!sections.length || !navLinks.length){
        return;
    }



    const observer = new IntersectionObserver(
        
        entries => {


            entries.forEach(entry => {


                if(entry.isIntersecting){


                    navLinks.forEach(link=>{

                        link.classList.remove("active");

                    });


                    const activeLink = document.querySelector(
                        `.page-nav-links a[href="#${entry.target.id}"]`
                    );


                    if(activeLink){

                        activeLink.classList.add("active");

                    }


                }


            });


        },

        {

            rootMargin:"-40% 0px -50% 0px"

        }

    );



    sections.forEach(section=>{

        observer.observe(section);

    });


}


document.addEventListener(
    "DOMContentLoaded",
    initSectionNav
);