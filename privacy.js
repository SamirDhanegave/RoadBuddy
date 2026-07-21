/*==========================================================
  ROADBUDDY PRIVACY POLICY
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const progressBar = document.querySelector(".progress-bar");
    const topBtn = document.querySelector(".top-btn");
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    const sections = document.querySelectorAll(".policy-card");
    const header = document.querySelector("header");

    /*=====================================
        PAGE LOAD ANIMATION
    =====================================*/

    document.body.classList.add("fade");

    /*=====================================
        SCROLL PROGRESS BAR
    =====================================*/

    function updateProgressBar() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width = progress + "%";
    }

    /*=====================================
        BACK TO TOP
    =====================================*/

    function toggleBackButton() {

        if (window.scrollY > 500) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    }

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /*=====================================
        HEADER SHADOW
    =====================================*/

    function navbarShadow() {

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.35)";

        } else {

            header.style.boxShadow = "none";

        }

    }

    /*=====================================
        REVEAL ANIMATION
    =====================================*/

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {

            threshold: .15

        }

    );

    sections.forEach((section) => {

        section.classList.add("reveal");

        observer.observe(section);

    });

    /*=====================================
        ACTIVE SIDEBAR LINK
    =====================================*/

    function highlightSidebar() {

        let current = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        sidebarLinks.forEach((link) => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    /*=====================================
        SMOOTH SIDEBAR LINKS
    =====================================*/

    sidebarLinks.forEach((link) => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const target =
                document.querySelector(

                    link.getAttribute("href")

                );

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /*=====================================
        BUTTON RIPPLE EFFECT
    =====================================*/

    const buttons = document.querySelectorAll(".hero-btn");

    buttons.forEach((button) => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const diameter = Math.max(

                this.clientWidth,

                this.clientHeight

            );

            ripple.style.width = diameter + "px";
            ripple.style.height = diameter + "px";

            ripple.style.left =
                e.offsetX - diameter / 2 + "px";

            ripple.style.top =
                e.offsetY - diameter / 2 + "px";

            ripple.style.position = "absolute";
            ripple.style.borderRadius = "50%";
            ripple.style.background =
                "rgba(255,255,255,.35)";
            ripple.style.transform = "scale(0)";
            ripple.style.animation =
                "ripple .6s linear";
            ripple.style.pointerEvents = "none";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /*=====================================
        CARD PARALLAX
    =====================================*/

    const cards = document.querySelectorAll(".policy-card");

    cards.forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - .5) * -4;

            const rotateY =
                ((x / rect.width) - .5) * 4;

            card.style.transform =

                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /*=====================================
        SCROLL EVENTS
    =====================================*/

    function handleScroll() {

        updateProgressBar();

        toggleBackButton();

        navbarShadow();

        highlightSidebar();

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

});

/*==========================================================
    RIPPLE KEYFRAME
==========================================================*/

const style = document.createElement("style");

style.innerHTML = `

@keyframes ripple{

    from{

        transform:scale(0);

        opacity:.6;

    }

    to{

        transform:scale(4);

        opacity:0;

    }

}

.hero-btn{

    overflow:hidden;

    position:relative;

}

`;

document.head.appendChild(style);