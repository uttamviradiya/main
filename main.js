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


  //    var color = "White";
  //   $("#color").html(color);
  //   $(".pro-variant label").first().addClass("active");

  function product_data(alllabel_color,label_color,alllabel_size){
    alllabel_color.removeClass("active");
    label_color.addClass("active");
    var id = label_color.attr("for");
    color = $("#"+id).attr("value");
    $("#color").html(color);
    var pro = label_color.attr("data-handle");
    alllabel_size.removeClass("disabled");
    
    $.getJSON("/products/"+ pro +".js", function(product) {
      console.log(product);
      var i;
      var auto = 0;
      for(i=0;i<= product.variants.length - 1;i++)
      {
        if(product.variants[i].option1 == color && product.variants[i].available == false)
        {
          //         	console.log(product.variants[i].title);

          alllabel_size.each(function(){


            if($(this).attr("data-value") ==  product.variants[i].option2)
            {
              $(this).addClass("disabled");
            }
            else
            {
              if(auto == 0)
              {
                $(this).addClass("selected");
                auto = 1;
              }
            }


          });
        }
      }     
    });
  }

  product_data($(".pro-variant label"),$(".pro-variant label").first(),$(".variant-list .size-var"))


  $(".pro-variant label").click(function(e){
    product_data($(".pro-variant label"),$(this),$(".variant-list .size-var"));
  e.preventDefault();
    //     $(".pro-variant label").removeClass("active");
    //     $(this).addClass("active");
    //     var id = $(this).attr("for");
    //     color = $("#"+id).attr("value");
    //     $("#color").html(color);
    //     var pro = $(this).attr("data-handle");


    //     $(".variant-list .size-var").removeClass("disabled");
    //     $.getJSON("/products/"+ pro +".js", function(product) {
    //       console.log(product);

    //       var i;
    //       for(i=0;i<= product.variants.length - 1;i++)
    //       {
    //       	if(product.variants[i].option1 == color && product.variants[i].available == false)
    //         {
    //         	console.log(product.variants[i].title);

    //           $(".variant-list .size-var").each(function(){

    //             if($(this).attr("data-value") ==  product.variants[i].option2)
    //             {
    //             	$(this).addClass("disabled");
    //             }
    //           });
    //         }
    //       }




    //     });

  });




});
