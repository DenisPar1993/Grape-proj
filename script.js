

// Initialize Swiper when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.products-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320:{
                slidesPerView:1.1,
                spaceBetween:0,
                 pagination: {
    el: '.swiper-pagination',
    enabled:true
  },
            },
            460:{
                slidesPerView:1.2,
                 pagination: {
    el: '.swiper-pagination',
    enabled:true
  },
            },
            520:{
                slidesPerView:1.5,
                spaceBetween:0,
                 pagination: {
    el: '.swiper-pagination',
    enabled:true
  },
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                 pagination: {
    el: '.swiper-pagination',
    enabled:false
  },
                
               
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
                pagination: {
    el: '.swiper-pagination',
    enabled:false
  },
            },
        },
    });

}); 