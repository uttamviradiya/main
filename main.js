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
    alllabel_size.removeClass("selected");
     var auto = 0;
    $.getJSON("/products/"+ pro +".js", function(product) {
      console.log(product);
      var i;
     
      for(i=0;i<= product.variants.length - 1;i++)
      {
   
        if(product.variants[i].option1 == color && product.variants[i].available == false)
        {
          
                  	console.log(product.variants[i].option2 + product.variants[i].available);

//           alllabel_size.each(function(){
	
		
//             if($(this).attr("data-value") ==  product.variants[i].option2)
//             {
//               $(this).addClass("disabled");
//             }
//             else{
//             	console.log($(this).attr("data-value"));
//               if(!$(this).hasClass("disabled") && auto == 0)
//               {              	
//                 $(this).addClass("selected");
//                 auto = 1;
//               }
              
//             }


//           });
          var j;
          for(j = 0; j < alllabel_size.length;j++)
          {
          	if(alllabel_size.eq(j).attr("data-value") == product.variants[i].option2)
            {
            	alllabel_size.eq(j).addClass("disabled");
            }
            else{
              console.log(alllabel_size.eq(j).attr("data-value"));
              if(!alllabel_size.eq(j).hasClass("disabled"))
              {
                if(auto == 0)
                {
              	alllabel_size.eq(j).addClass("selected");
                auto = 1;
                }
              }
            }
          }
        }
        
      }     
      $(".select-variant-select").val($(".variant-list .size-var.selected").attr("id"));
      console.log("id select - " + $(".select-variant-select").val());
    });
  }
  

//   product_data($(".pro-variant label"),$(".pro-variant label").first(),$(".variant-list .size-var"))


  $(".pro-variant1 label").unbind().click(function(e){
    product_data($(".pro-variant label"),$(this),$(".variant-list .size-var"));
//     select();

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

 
 
$(".pro-variant label").first().trigger("click");
  $(".pro-variant label").off().click(function(){
    $(".pro-variant-block").removeClass("show");
    $(".pro-img-block .pro-a2c1").show();
//     alert("select val = " + $(".select-variant-select").val())
  
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
//     	console.log(product);
   
        	image(product,color);
      
      for (var i = 0 ; i < product.variants.length ; i++)
      {
        
//         console.log(first);
        if(product.variants[i].option1 == color && product.variants[i].available == true)
        {
//           if(product.variants[i].image != null)
//           {
//           	$(".img1").attr("src",""+ product.variants[i].image.src + "");
//             $(".img2").attr("src",""+ product.variants[i].image.src + "");
//           }
          
          if(first == 0)
          {
          	selected = "selected";
            first = 1;
//             alert();
          }
//         	console.log(product.variants[i].option1 + " " + product.variants[i].option2);
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
//         	console.log("Not availalbe=" + product.variants[i].option1 + " " + product.variants[i].option2);
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
//     $(".pro-img-block .img2").attr("src");
//     alert(var_id);
    
//     console.log("select val = " + $(".select-variant-select").val());
  }
  

  function image(p,color){
   
    var src = "";
  	for(var i = 0 ; i< p.variants.length; i++)
    {
    	if(p.variants[i].option1 == color)
        {
          if ( typeof p.variants[i].featured_image !== 'undefined' && p.variants[i].featured_image !== null )
          {
// 			console.log(p.variants[i].featured_image.src);
            console.log(color);
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

});
