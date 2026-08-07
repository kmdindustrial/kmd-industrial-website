/* =========================
   Components Loader
========================= */


document.addEventListener("DOMContentLoaded", function () {





  /* =========================
     Load Footer
  ========================= */


  const footerContainer =
    document.getElementById("footer-container");



  if (footerContainer) {


    fetch("components/footer.html")


      .then(response => {


        if (!response.ok) {

          throw new Error(
            "Footer load failed"
          );

        }


        return response.text();


      })


      .then(data => {


        footerContainer.innerHTML = data;


      })


      .catch(error => {


        console.error(
          "Footer Error:",
          error
        );


      });



  }





  /* =========================
     Load Floating Buttons
  ========================= */


  const floatingContainer =
    document.getElementById("floating-container");



  if (floatingContainer) {


    fetch("components/floating-buttons.html")


      .then(response => {


        if (!response.ok) {

          throw new Error(
            "Floating buttons load failed"
          );

        }


        return response.text();


      })


      .then(data => {


        floatingContainer.innerHTML = data;


        initBackTop();


      })


      .catch(error => {


        console.error(
          "Floating Button Error:",
          error
        );


      });



  }



});






/* =========================
   Back To Top
========================= */


function initBackTop() {


  const btn =
    document.getElementById("backTop");



  if (!btn) return;



  btn.addEventListener(
    "click",
    function () {


      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });


    }
  );


}