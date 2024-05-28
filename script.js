document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.brands__card');
    const toggleButton = document.querySelector('.brands__button');
    const swiperSlides = document.querySelectorAll('.swiper-slide');

    let cardsToShow = cards.length;
    let init = false;
    let swiper;

    function updateCardVisible() {
        if (window.matchMedia('(min-width: 1008px)').matches) {
            cardsToShow = 8;
        } else if (window.matchMedia('(min-width: 767px)').matches) {
            cardsToShow = 6;
        } else {
            cardsToShow = cards.length;
        }

        cards.forEach((card, index) => {
            if (index >= cardsToShow) {
                card.classList.add('hidden');
            } else {
                card.classList.remove('hidden');
            }
        });
    }

    function toggleCardVisible() {
        if (toggleButton.classList.contains('show-button')) {
            cards.forEach(card => {
                card.classList.remove('hidden');
            });
            toggleButton.classList.remove('show-button');
            toggleButton.classList.add('hide-button');
            toggleButton.textContent = 'скрыть';
        } else {
            updateCardVisible();
            toggleButton.classList.remove('hide-button');
            toggleButton.classList.add('show-button');
            toggleButton.textContent = 'показать все';
        }
    }

    function initializeSwiper() {
        if (window.innerWidth < 767) {
            if (!init) {
                init = true;
                swiper = new Swiper(".swiper", {
                    direction: "horizontal",
                    slidesPerView: "auto",
                    spaceBetween: 10,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    freeMode: true,
                    loop: true,
                });

                swiperSlides.forEach((slide, index) => {
                    slide.addEventListener('click', () => {
                        swiper.slideTo(index);
                    });
                });
            }
        } else if (init) {
            swiper.destroy();
            init = false;

            updateCardVisible();
        }
    }

    window.addEventListener('resize', updateCardVisible);

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleCardVisible);
    }

    updateCardVisible();
    initializeSwiper();
    window.addEventListener("resize", initializeSwiper);
});