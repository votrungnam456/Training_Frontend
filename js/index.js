
$( document ).ready(function(){
     let win = $(this);
     if(win.width() > 768){
          $('#navbar > li > a').attr('href','#');
     }
     else{
          $('#navbar > li > a').removeAttr('href');
     }
     $('#icon__menu').click(function () {
          if ($('#navbar').css("display") == "block")
               $('#navbar').css("display", "none");
          else
               $('#navbar').css("display", "block");
     });
     $(window).on("resize",function(){
          let win = $(this);
          if(win.width() > 768){
               if ($('#navbar').css("display") == "none" || $('#navbar').css("display") == "block")
               {
                    $('#navbar').css("display", "flex");
               }
               $('#navbar > li > a').attr('href','#');
          }
          else{
               if ($('#navbar').css("display") == "flex")
               {
                    $('#navbar').css("display", "none");
               }
               
               $('#navbar > li > a').removeAttr('href');
          }
     })
})