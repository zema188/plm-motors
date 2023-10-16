const previewSwiper = new Swiper('.preview__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: {
    el: ".preview__swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".preview__swiper-next",
    prevEl: ".preview__swiper-prev",
  },
})

const carSwiper = new Swiper('.card__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
})