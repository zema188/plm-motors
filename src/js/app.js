function changerActive(list) {
  for(let i = 0; i < list.length; i++) {
      list[i].classList.remove('active')
  }
  list = 0
}


//превью свайпер
const previewSwiper = new Swiper('.preview__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
    },
  },
  pagination: {
    el: ".preview__swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".preview__swiper-next",
    prevEl: ".preview__swiper-prev",
  },
})


//свайпер в карточке 
const carSwiper = new Swiper('.card__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
})


//отзывы свайпер
const reviewsSwiper = new Swiper('.reviews__swiper', {
  slidesPerView: 3.2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".reviews__swiper-next",
    prevEl: ".reviews__swiper-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2.2,
      spaceBetween: 10,
    },
    900: {
      slidesPerView: 3.2,
      spaceBetween: 10,
    }
  }
})


//салон свайпер
const salonSwiper = new Swiper('.salon__swiper', {
  slidesPerView: 2.1,
  spaceBetween: 52,
  centeredSlides: 'auto',
  initialSlide: 1,
  loop: true,
  navigation: {
    nextEl: ".salon__swiper-next",
    prevEl: ".salon__swiper-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 52,
    },
    768: {
      slidesPerView: 1.5,
      spaceBetween: 52,
    },
    900: {
      slidesPerView: 2.1,
      spaceBetween: 52,
    }
  }
})


//свайперы в модалках
let smallSwiper = new Swiper(".small__swiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});

let bigSwiper = new Swiper(".big__swiper", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".big__swiper-next",
    prevEl: ".big__swiper-prev",
  },
  thumbs: {
    swiper: smallSwiper,
  },
});


if (document.querySelectorAll('.cars__list').length) {
  const carsList = document.querySelector('.cars__list');
  const modal = document.querySelector('.modal');
  const bigSwiperBLock = document.querySelector('.big__swiper-wrapper');
  const smallSwiperBLock = document.querySelector('.small__swiper-wrapper');
  
  carsList.addEventListener('click', function (e) {
    const target = e.target;
    if (target.closest('.card')) {
      const card = target.closest('.card');
      modal.classList.add('active');
      bodyScrollLock.disableBodyScroll(modal);
  
      const slides = card.querySelectorAll('.card__slide');
      const name = card.querySelector('.card__name');
      const info = card.querySelector('.card__info');
      const price = card.querySelector('.card__btn');
  
      smallSwiper.destroy();
      bigSwiper.destroy();
  
      bigSwiperBLock.innerHTML = '';
      smallSwiperBLock.innerHTML = '';
  
      slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        const bigSlide = `<div class="big__swiper-slide swiper-slide">
          <img src=${img.getAttribute('src')}>
        </div>`;
        const smallSlide = `<div class="small__swiper-slide swiper-slide">
          <img src=${img.getAttribute('src')}>
        </div>`;
        bigSwiperBLock.innerHTML += bigSlide;
        smallSwiperBLock.innerHTML += smallSlide;
      });
  
      // После добавления новых слайдов, инициализируйте и активируйте свайперы заново.
      smallSwiper = new Swiper(".small__swiper", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
      });
  
      bigSwiper = new Swiper(".big__swiper", {
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".big__swiper-next",
          prevEl: ".big__swiper-prev",
        },
        thumbs: {
          swiper: smallSwiper,
        },
      });
  
      const modalName = modal.querySelector('.modal__name');
      const modalPrice = modal.querySelector('.modal__price');
      const modalNameMob = modal.querySelector('.modal__name-mob');
      const modalPriceMob = modal.querySelector('.modal__price-mob');
      const modalInfo = modal.querySelector('.modal__info');
      modalName.innerHTML = name.innerHTML;
      modalPrice.innerHTML = price.innerHTML;
      modalNameMob.innerHTML = name.innerHTML;
      modalPriceMob.innerHTML = price.innerHTML;
      modalInfo.innerHTML = info.innerHTML;
    }
  });
}

//пункты меню
if (document.querySelectorAll('.header__nav-item').length) {
  const navItems = document.querySelectorAll('.header__nav-item');

  const hoverNav = (e) => {
    console.log(e)
    const target = e.target
    navItems.forEach(navItem => {
      navItem.classList.add('opacity')
    });
    target.classList.add('active')
  }

  const unHoverNav = (e) => {
    const target = e.target
    navItems.forEach(navItem => {
      navItem.classList.remove('opacity')
    });
    target.classList.remove('active')
  }

  navItems.forEach(link => {
    link.addEventListener('mouseover', hoverNav);
  });
  navItems.forEach(link => {
    link.addEventListener('mouseout', unHoverNav);
  });
}


//фильтр карточек в блоке cars
if (document.querySelectorAll('.cars__header-filter-item').length) {
  const filterStatus = document.querySelectorAll('.cars__header-filter-item')
  const filterBrand = document.querySelectorAll('.cars__brand-item')
  const cars = document.querySelectorAll('.card')

  const filterParams = {
    status: 'all',
    brand: null
  }

  filterStatus.forEach(status => {
    status.addEventListener('click', function(e) {
      if(this.classList.contains('btn_all-black')) {

      } else {
        filterStatus.forEach(status => {
          status.classList.remove('btn_all-black')
          status.classList.add('btn_black')

          this.classList.remove('btn_black')
          this.classList.add('btn_all-black')

          const attribute = this.getAttribute('status')
          filterParams.status = attribute
          filterCars()
        });
      }
    })
  });

  filterBrand.forEach(brand => {
    brand.addEventListener('click', function(e) {
      if(this.classList.contains('active')) {
        this.classList.remove('active')
        filterParams.brand = null

      } else {
        filterBrand.forEach(status => {
          status.classList.remove('active')
          this.classList.add('active')

          const attribute = this.getAttribute('brand')
          filterParams.brand = attribute
        });
      }
      filterCars()
    })
  });

  //сама функция для фильтра
  function filterCars() {
    cars.forEach(card => {
      const status = card.getAttribute('status')
      const brand = card.getAttribute('brand')
      if(filterParams.status !== 'all') {
        if(status !== filterParams.status) {
          card.classList.add('hidden')
          card.classList.remove('active')
          return
        }
      } 

      
      if(filterParams.brand !== null) {
        if(brand !== filterParams.brand) {
          card.classList.add('hidden')
          card.classList.remove('active')
          return
        }
      }

      card.classList.remove('hidden')
      card.classList.add('active')

    });
    checkForNothingInList()
  }

  //функция для вывода текста если машин не найдено
  function checkForNothingInList() {
    const nothingBlock = document.querySelector('.nothing')
    const carsVisible = document.querySelectorAll('.card.active');


    if(!carsVisible.length) {
      nothingBlock.classList.add('active')
    } else {
      nothingBlock.classList.remove('active')
    }
  }

}


//Popup close 
document.addEventListener("click", function(event) {
  event = event || window.event;
  let target = event.target

  if(target.classList.contains('popup')) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
  }

  //закрытие меню кликом по темной области
  if(target.classList.contains('header-m')) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
    for (let i = 0; i < headerMenuBtn.length; i++) {
      headerMenuBtn[i].classList.toggle('open')
    }
  }


  //закрытие блоков close-out по клику вне 
  if(!target.classList.contains('close-out') && !target.closest('.close-out')) {
    let closeOutBlock = document.querySelectorAll('.close-out')
    changerActive(closeOutBlock)
  }
}

)

let popupClose = document.querySelectorAll('.popup-close')
for(let i=0 ; i < popupClose.length ; i++) {
  popupClose[i].addEventListener("click",
  function() {
    let popup = popupClose[i].closest('.popup')
    if(popup.classList.contains('filter')) {
      popup.classList.remove('popup')
    } else {
      popup.classList.remove('active')
    }
      bodyScrollLock.enableBodyScroll(popup);
  })
}

//header
let headerMenuBtn = document.querySelectorAll('.toggle-menu')
let mobileMenu = document.querySelector('.header-m')
for (let i = 0; i < headerMenuBtn.length; i++) {
  headerMenuBtn[i].addEventListener('click', function() {
    toggleMobileMenu()
  })
}

function toggleMobileMenu() {
  for (let i = 0; i < headerMenuBtn.length; i++) {
    headerMenuBtn[i].classList.toggle('open')
  }
  mobileMenu.classList.toggle('active')
}

//header-touch-swipe
function hedearMobileSwipeClose() {
  const headerMobile = document.querySelector('.header-m')
  const headerMobileContent = headerMobile.querySelector('.header-m__content')


  headerMobileContent.addEventListener('touchstart', handleTouchStart, false);
  headerMobileContent.addEventListener('touchmove', handleTouchMove, false);
  
  let xDown = null;
  let yDown = null;
  
  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  };
  
  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
  
      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;
  
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
          if ( xDiff > 0 ) {
            headerMobile.classList.remove('active')
            for (let i = 0; i < headerMenuBtn.length; i++) {
              headerMenuBtn[i].classList.toggle('open')
            }
            bodyScrollLock.enableBodyScroll(headerMobile);
          } else {
          }
      } else {
          if ( yDiff > 0 ) {
          } else {
          }
      }
      xDown = null;
      yDown = null;
  
  };
}
if(document.querySelectorAll('.header-m').length) {
  hedearMobileSwipeClose()
}


// // Size-control
window.addEventListener('resize', function(event){
  let popups = document.querySelectorAll('.popup')
  if(window.innerWidth >= 1024 && mobileMenu !== null) {
    mobileMenu.classList.remove('active')
    for (let i = 0; i < headerMenuBtn.length; i++) {
      headerMenuBtn[i].classList.remove('open')
    }
  }
})

// //анимация начальная
// window.addEventListener('load', function() {
//   const blackBlock = document.querySelector('.black-block')
//   const headerLogo = document.querySelector('.header__logo')
//   const headerNav = document.querySelectorAll('.header__nav')
//   blackBlock.classList.add('anim')
//   headerLogo.classList.add('anim')
//   headerNav.forEach(nav => {
//     nav.classList.add('anim')
//   });
// });