function changerActive(list) {
  for(let i = 0; i < list.length; i++) {
      list[i].classList.remove('active')
  }
  list = 0
}
const headerLogo = document.querySelector('.header__logo')

//превью свайпер
const previewSwiper = new Swiper('.preview__swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 5000,
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




//отзывы свайпер
const reviewsSwiper = new Swiper('.reviews__swiper', {
  slidesPerView: 3.2,
  spaceBetween: 10,
  autoplay: {
    delay: 4000,
  },
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




//пункты меню
if (document.querySelectorAll('.header__nav-item').length) {
  const navItems = document.querySelectorAll('.header__nav-item');

  const hoverNav = (e) => {
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

//анимация начальная
window.addEventListener('load', function() {
  const headerW = document.querySelector('.header-w')
  if(headerW.classList.contains('animation')) {
    const blackBlock = document.querySelector('.black-block')
    const headerLogo = document.querySelector('.header__logo')
    const headerNav = document.querySelectorAll('.header__nav')
    const headerNavMob = document.querySelector('.header__menu')
    blackBlock.classList.add('anim')
    headerLogo.classList.add('anim')
    headerNavMob.classList.add('anim')
    headerNav.forEach(nav => {
      nav.classList.add('anim')
    });
  }

  if(this.document.querySelectorAll('.cars__list').length) {
    const carsFetched = [
      {
        brand: 'bmw',
        status: 'В пути',
        name: 'BMW Х5',
        year: '2023',
        mileage: '0 км',
        fuel: 'дизель',
        engine: '3.0 (298 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/БМВХ5.png']
      },
      {
        brand: 'bmw',
        status: 'В наличии',
        name: 'BMW Х7',
        year: '2023',
        mileage: '0 км',
        fuel: 'дизель',
        engine: '3.0 (340 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/b1.jpg', './img/pic/b2.jpg', './img/pic/b3.jpg', './img/pic/b4.jpg']
      },
      {
        brand: 'geely',
        status: 'В пути',
        name: 'GEELY Monjaro',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '2.0 (238 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/Monjaro.png']
      },
      {
        brand: 'hongqi',
        status: 'В пути',
        name: 'Hongqi HS7',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '2.0 (252 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/HS7-Hongqi.png']
      },
      {
        brand: 'toyota',
        status: 'В пути',
        name: 'Toyota Land Cruiser',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '4.7 (288 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/Land-Cruiser-300.png']
      },
      {
        brand: 'lixiang',
        status: 'В наличии',
        name: 'LiXiang L9',
        year: '2023',
        mileage: '0 км',
        fuel: 'гибрид',
        engine: '1.5 (449 л.с.)',
        price: '9 800 000 (С НДС)',
        images: ['./img/pic/l9.png']
      },
      {
        brand: 'lixiang',
        status: 'В наличии',
        name: 'LiXiang L7',
        year: '2023',
        mileage: '0 км',
        fuel: 'гибрид',
        engine: '1.5 (449 л.с.)',
        price: '8 500 000 (с НДС)',
        images: ['./img/pic/l7.png']
      },
      {
        brand: 'lexux',
        status: 'В наличии',
        name: 'Lexus GX',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '4.6 (296 л.с.)',
        price: '7 500 000 (без НДС)',
        images: ['./img/pic/GX.png']
      },
      {
        brand: 'hyundai',
        status: 'В наличии',
        name: 'Hyundai Palisade',
        year: '2023',
        mileage: '0 км',
        fuel: 'дизель',
        engine: '2.2 (200 л.с.)',
        price: '5 600 000 (без НДС)',
        images: ['./img/pic/Palisade.png']
      },
      {
        brand: 'voyah',
        status: 'В пути',
        name: 'Voyah Free',
        year: '2023',
        mileage: '0 км',
        fuel: 'гибрид',
        engine: '1.5 ( 490 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/VOYAH-FREE.png']
      },
      {
        brand: 'zeekr',
        status: 'В наличии',
        name: 'Zeekr 001',
        year: '2023',
        mileage: '0 км',
        fuel: 'электро',
        engine: '544 л.с.',
        price: '8 700 000 (с НДС)',
        images: ['./img/pic/Zeek-001.png']
      },
      {
        brand: 'zeekr',
        status: 'В пути',
        name: 'Zeekr Х',
        year: '2023',
        mileage: '0 км',
        fuel: 'электро',
        engine: '272 л.с.',
        price: 'Цена по запросу',
        images: ['./img/pic/ZeekrX.png']
      },
      {
        brand: 'cadillac',
        status: 'В пути',
        name: 'Cadillac Escalade',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '6.2 (416 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/Кадилак.png']
      },
      {
        brand: 'land-rover',
        status: 'В пути',
        name: 'Range Rover V',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '4.4 (530 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/Рендж.png']
      },
      {
        brand: 'toyota',
        status: 'В пути',
        name: 'Toyota Camry',
        year: '2023',
        mileage: '0 км',
        fuel: 'бензин',
        engine: '2.0 (178 л.с.)',
        price: 'Цена по запросу',
        images: ['./img/pic/тайтота-камри.png']
      },
    ];
    document.querySelector('.cars__list').style.display = 'flex'
    const vueCarsList = new Vue({
      el: '#cars__list',
      data: {
        carsFiltred: carsFetched,
      },
    });
    
  
    // const carsList = document.querySelector('.cars__list')
    // carsList.style.height = carsList.offsetHeight + 'px'
  
    //свайпер в карточке 
    const carSwiper = new Swiper('.card__swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
    })
  
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
        vueCarsList.carsFiltred = carsFetched.filter(card => {
          const status = card.status;
          const brand = card.brand;
  
          if (filterParams.status !== 'all' && status !== filterParams.status) {
            return false;
          }
  
          if (filterParams.brand !== null && brand !== filterParams.brand) {
            return false;
          }
  
          return true;
        });
        checkForNothingInList()
  
        setTimeout(() => {
          //свайпер в карточке 
          const test = new Swiper('.card__swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
          })
          //свайп при ховере мышки
          const swipersCars = document.querySelectorAll('.card__swiper')
          console.log(swipersCars)
          for(let i = 0; i < swipersCars.length; i++) {
            addHoverMouseSwiper(swipersCars[i], test)
          }
        },0)
  
  
      }
  
      //функция для вывода текста если машин не найдено
      function checkForNothingInList() {
        const nothingBlock = document.querySelector('.nothing')
  
        if(!vueCarsList.carsFiltred.length) {
          nothingBlock.classList.add('active')
        } else {
          nothingBlock.classList.remove('active')
        }
      }
  }
  //свайп при ховере мышки
  const swipersCars = document.querySelectorAll('.card__swiper')
  for(let i = 0; i < swipersCars.length; i++) {
    addHoverMouseSwiper(swipersCars[i], carSwiper)
  }

  function addHoverMouseSwiper(swiperBlock, swiper) {
    const slides = swiperBlock.querySelectorAll('.swiper-slide');
    const width = 1 / slides.length * 100;
  
    const swiperWrapper = swiperBlock.querySelector('.swiper-wrapper');
    const id = swiperWrapper.getAttribute('id');
    console.log('id', id)
    console.log('swiperWrapper', swiperWrapper)
    console.log('swiper', swiper.length)
    let currentSwiper = null
    if(swiper.length) {
      currentSwiper = swiper.find(swiper => swiper.wrapperEl.getAttribute('id') === id);
    } else {
      currentSwiper = swiper
    }
    


    for (let i = 0; i < slides.length; i++) {
      let newDiv = document.createElement("i");
      swiperBlock.append(newDiv);
      newDiv.style.width = width + '%';
      newDiv.style.left = width * i + '%';
      newDiv.addEventListener('mouseover', function() {
        currentSwiper.slideTo(i, 400);
      });
    }

    const pic = swiperWrapper.closest('.card__pic')
    pic.addEventListener('mouseleave', function() {
      currentSwiper.slideTo(0, 400);
    })
  }


  }
  

  //открытие карточек в попапе
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
});

if (document.querySelectorAll('[popup-btn]').length) {
  const popupBtnOpen = document.querySelectorAll('[popup-btn]');
  popupBtnOpen.forEach(btn => {
    btn.addEventListener('click', function() {
      const name = btn.getAttribute('popup-btn');
      const popup = document.querySelector(`[popup-name="${name}"]`); // Добавьте кавычки вокруг значения атрибута
      if (popup) {
        popup.classList.add('active');
        bodyScrollLock.disableBodyScroll(popup);
      }
    });
  });
}








