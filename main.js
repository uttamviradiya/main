$(document).ready(function(){

  //  sticky header 
  $(window).scroll(function(){

    var headertop = $(".header-top").height() + $(".header-bottom-primary").height() + 100;
    if($(document).scrollTop() >= headertop)
    {
      //     	$(".header-bottom-primary").addClass("sticky");
      //       $(".mobile-search-main").addClass("sticky-search").css("top","" + $(".header-bottom-primary").height() + "px");

    }
    else{
      //       $(".header-bottom-primary").removeClass("sticky");
      //       $(".mobile-search-main").removeClass("sticky-search").css("top","100%");
    }
  });


  /*  mobile menu open  */

  $(".resp-ham-block .hamburger").click(function(){
    $(".mobile-nav-main").fadeIn();
    $(".mobile-nav-main .mobile-nav").css("transform","translateX(0)");  
    $("body").css("overflow","hidden");
    pro_slider();
  });

  $(".mobile-nav .close").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .mobile-nav").css("transform","translateX(-100%)");  
    $("body").css("overflow","auto");
  });  

  $(".nav-overlay").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .mobile-nav").css("transform","translateX(-100%)");  
    $(".mobile-nav-main .login-popup-block").css("transform","translateX(200%)");  
    $("body").css("overflow","auto");
  });

  $(".main-li").click(function(){
    $(this).find(".mob-dropdown-menu1").addClass("active");   
  });

  $(".main-sub-li").click(function(){

    //     $("div").scrollTop(0);
    //     $(this).find(".mob-dropdown-submenu1").scrollTop(0).addClass("active");  
    $(this).find(".mob-dropdown-submenu1").scrollTop(0).addClass("active");    
    $(".mob-dropdown-menu1").scrollTop(0).addClass("over-hide");
  });

  $(".main-li-head").click(function(e){    
    e.stopPropagation();
    $(".mob-dropdown-menu1").removeClass("active");    

  });

  $(".main-sub-li-head").click(function(e){

    e.stopPropagation();
    $(".mob-dropdown-menu1").removeClass("over-hide");
    $(".mob-dropdown-submenu1").removeClass("active");


  });
  // serach 
  $("#search").click(function(){
    $("#close-search").show();
    $("#search").hide();
    $(".mobile-search-main").fadeIn();

  });

  $("#close-search").click(function(){
    $("#close-search").hide();
    $("#search").show();
    $(".mobile-search-main").fadeOut();
  });

  function pro_slider(){
    $('.resp-product-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      speed: 700,
      dots:true
    });
  }

  //click to copy
  $(".dis-code-btn").click(function(){

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($($(this)).text()).select();
    document.execCommand("copy");
    $temp.remove();
  });

  //   click on login
  $(".login-click-popup").click(function(){
    $(".mobile-nav-main").fadeIn();
    $(".mobile-nav-main .login-popup-block").css("transform","translateX(0)");  
    $("body").css("overflow","hidden");

  });

  $(".login-popup-block .close").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .login-popup-block").css("transform","translateX(200%)");  
    $("body").css("overflow","auto");
  });

  //click on cart popup
  $(".cart-popup").click(function(){
    $(".mobile-nav-main").fadeIn();
    $(".mobile-nav-main .cart-popup-block").css("transform","translateX(0)");  
    $("body").css("overflow","hidden");

  });

  $(".cart-popup-block .close").click(function(){
    $(".mobile-nav-main").fadeOut();
    $(".mobile-nav-main .cart-popup-block").css("transform","translateX(200%)");  
    $("body").css("overflow","auto");
  });
  
 
$(".pro-variant label").first().trigger("click");
  $(".pro-variant label").off().click(function(){
    $(".pro-variant-block").removeClass("show");
    $(".pro-img-block .pro-a2c1").show();
    var first = 0 , selected = "not_selected";
    $('.variant-list .size-var').remove();
    $(".pro-variant label").removeClass("active");
        $(this).addClass("active");
        var id = $(this).attr("for");
        color = $("#"+id).attr("value");
        $("#color").html(color);
        var pro = $(this).attr("data-handle");
    console.log(pro + color);
    
    $.getJSON("/products/" + pro + ".js",function(product){
        	image(product,color);
      for (var i = 0 ; i < product.variants.length ; i++)
      {
        if(product.variants[i].option1 == color && product.variants[i].available == true)
        { 
          if(first == 0)
          {
          	selected = "selected";
            first = 1;
          }
          $('.variant-list').append(
            $('<a/>')
            .attr({"data-id": "" + product.variants[i].id + "","href":"javascript:void(0)"})
            .addClass("size-var " + selected +"").text("" + product.variants[i].option2 + "")
          );
          if(first == 1)
          {
          	selected = "";
          }
        }
        else{
          if(product.variants[i].option1 == color){

            $('.variant-list').append(
            $('<a/>')
            .attr({"data-id": "" + product.variants[i].id + "","href":"javascript:void(0)"})
            .addClass("size-var disabled").text("" + product.variants[i].option2 + "")
          );
          }
        }
        selected_var();
      }
      if(selected == "not_selected")
      {
      	console.log("not_selected");
        $('.variant-list .size-var').first().addClass("selected")
      }
    });
     $(".variant-list .size-var").trigger("click");
  });
  function selected_var(){
  	var var_id = $(".variant-list .size-var.selected").attr("data-id");
    $(".select-variant-select").val(var_id);
  }
  function image(p,color){
   console.log(p);
    var src = "";
  	for(var i = 0 ; i< p.variants.length; i++)
    {
    	if(p.variants[i].option1 == color)
        {
          if ( typeof p.variants[i].featured_image !== 'undefined' && p.variants[i].featured_image !== null )
          {
            src = p.variants[i].featured_image.src;
			$(".pro-img-block .img1").attr("src",src);
          }
        }
    }
    if(src == "")
    {
      src = p.images[0];
      $(".pro-img-block .img1").attr("src",src);
    }
  }
$(".qv-pro-variant-inner label").first().trigger("click");
   
  
// });

// tab menu

// $(document).ready(function(){
  
  $(".tab-menu-list .tab-a").first().addClass("active-a");
  $(".section-tab-menu .tab").first().addClass("tab-active");
  $('.tab-menu-list .tab-a').click(function(){  

    $(".section-tab-menu .tab").removeClass('tab-active');

    $(".section-tab-menu #tab"+$(this).attr('id')+"").addClass("tab-active");

    $(".tab-menu-list .tab-a").removeClass('active-a');

    $(this).addClass('active-a');
  });

  function tab_menu_slider(){
    
    $(".tab-active .pro-block-slider").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows:true,
      prevArrow:'<button class="qv-arrow qv-prev"><i class="fa fa-angle-left"></i></button>',
      nextArrow:'<button class="qv-arrow qv-next"><i class="fa fa-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1401,
          settings: {
            slidesToShow: 4,
            slidesToScroll:1,
            infinite: true,
            arrows:true
          }
        },
        {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
            slidesToScroll:1,
            infinite: true,
            arrows:true
          }
        }
      ]
    });
  }
  tab_menu_slider();


  //add to cart open
  $(".pro-img-block .pro-a2c1").click(function(){

    $(this).hide();
    $(this).parent().children(".pro-variant-block").addClass("show");
  });

  $(".pro-variant-block .close").click(function(){
    $(this).parents(".pro-variant-block").removeClass("show");
    $(this).parents("figcaption").children(".pro-a2c").show();
  });
  
  //size
$('.variant-list').on('click', '.size-var', function() {
//   $(".variant-list .size-var").click(function(){
   
    $(".variant-list .size-var").removeClass("selected");
    $(this).addClass("selected");
    
  var var_id = $(this).attr("data-id");
    $(".select-variant-select").val(var_id);
  
  if($(this).hasClass("disabled"))
  {
    $(".product-form .btn--purchase").addClass("a2c-disabled");
  }
  else
  {
  	$(".product-form .btn--purchase").removeClass("a2c-disabled");
  }
  });


  $(".select-variant-select ").change(function(){
    
    alert($(this).val());
  });
// });


//quick view
$(".pro-quick-view .quick-btn").click(function(ev){
  $(".tab-active .pro-block-slider").slick("unslick");
//   $(".pro-li").off().hover();
  $(this).siblings(".quick-view-main").css("display","flex");
  $("body").css("overflow","hidden");
  $(this).parents(".pro-quick-view").addClass("qv-active");
  
  $(".qv-pro-variant-inner label").first().trigger("click");
   
  $('.product-media-slider-single').slick('unslick');
  $('.product-media-slider-multi').slick('unslick');
  qv_slider();
  
  
  
});
  
  function qv_slider(){
    $('.product-media-slider-single').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.product-media-slider-multi',
      prevArrow:'<button class="qv-arrow qv-prev"><i class="fa fa-angle-left"></i></button>',
      nextArrow:'<button class="qv-arrow qv-next"><i class="fa fa-angle-right"></i></button>'


    });
    $('.product-media-slider-multi').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: '.product-media-slider-single',
      prevArrow:'<button class="qv-arrow qv-prev"><i class="fa fa-angle-left"></i></button>',
      nextArrow:'<button class="qv-arrow qv-next"><i class="fa fa-angle-right"></i></button>',
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1201,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            arrows: true
          }
        }
      ]
    });
  }

$(".quick-view-main .qv-btn-close").click(function(e){
  e.stopPropagation();
  $(".quick-view-main").css("display","none");
  $("body").css("overflow","auto");
  $(".pro-link-top .pro-quick-view").removeClass("qv-active");
  tab_menu_slider();
});

  

  //ajax

function a(form_id) {

// alert($('#'+form_id).serialize());
 $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: $('#'+form_id).serialize(),
    success: addToCartOk,
    error: addToCartFail
  });
}

function addToCartOk(product) { 
 alert("true");
} 

function addToCartFail(obj, status) { 
  alert("false");
} 

});