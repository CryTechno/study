$(document).ready(function(){
    $('.carousel__inner').slick({
            infinite: true,
            speed: 1200,
            adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev"><img src = "img/icons/left-arrow.png"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src = "img/icons/right-arrow.png"></button>'
    });

  $('ul.catalogy__tabs').on('click', 'li:not(.catalogy__tab_active)', function() {
    $(this)
      .addClass('catalogy__tab_active').siblings().removeClass('catalogy__tab_active')
      .closest('div.container').find('div.catalogy__content').removeClass('catalogy__content_active').eq($(this).index()).addClass('catalogy__content_active');
  });
  function toggleSlide(parent){
    $(parent).each(function(i){
        $(this).on('click',function(e){
            e.preventDefault();
            $('.catalogy-item__content').eq(i).toggleClass('catalogy-item__content_active');
            $('.catalogy-item__list').eq(i).toggleClass('catalogy-item__list_active');
        })
      })
  }
  toggleSlide('.catalogy-item__link');
  toggleSlide('.catalogy-item__back');

  //Modal windows
  $('.modal__close').on('click',function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  $('.overlay__close').on('click',function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  $('[data-modal="consultation"]').on('click',function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.button_mini').on('click',function(){
    $('.overlay, #order').fadeIn('slow');
  });
  $('.button_mini').each(function(i){
    $(this).on('click',function(){
      $('#order .modal__descr').text($('.catalogy-item__subtitle').eq(i).text());
    })
  });
  function validForm(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: {
          required: true
        },
        email: {
          required: true,
          email:true
        }
      },
      messages:{
        name: "Пожалуйста, введите свое настоящее имя!",
        phone: "Пожалуйста, введите свой настоящий номер телефона!",
        email: {
          required: "Пожалуйста, введите свою почту!",
          email:"Неккоректный адресс почты!"
        }
      }
    });
  }
  validForm('#consultation form');
  validForm('#order form');
  validForm('#consultation-form');

  $('input[name=phone]').mask("+7 (999) 999-9999");
//почта
  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });
//scroll
  $(window).scroll(function(){
    if ($(this).scrollTop() > 1500){
      $('.pageup').fadeIn();
    }else{
      $('.pageup').fadeOut();
    }
  });

function scrollslow(element){
  $(element).on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
  });
}
scrollslow('a[href^="#up"');
scrollslow('a[href^="#catalogy"');
new WOW().init();

});