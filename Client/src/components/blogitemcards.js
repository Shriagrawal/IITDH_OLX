import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './itemcards.css';
import $ from 'jquery';
import { useEffect } from 'react';

// Use like this : <CardItem title="Boo" description="I don't care what you want" price={10}/> 

function CardItem(props) {
  useEffect(() => {
    $(document).ready(function(){
    
      $(".largeGrid").click(function(){											
        $(this).find('a').addClass('active');
        $('.smallGrid a').removeClass('active');
        
        $('.product').addClass('large').each(function(){											
        });						
        setTimeout(function(){
          $('.info-large').show();	
        }, 200);
        setTimeout(function(){
    
          $('.view_gallery').trigger("click");	
        }, 400);								
        
        return false;				
      });
      
      $(".smallGrid").click(function(){		        
        $(this).find('a').addClass('active');
        $('.largeGrid a').removeClass('active');
        
        $('div.product').removeClass('large');
        $(".make3D").removeClass('animate');	
        $('.info-large').fadeOut("fast");
        setTimeout(function(){								
            $('div.flip-back').trigger("click");
        }, 400);
        return false;
      });		
      
      $(".smallGrid").click(function(){
        $('.product').removeClass('large');			
        return false;
      });
      
      $('.colors-large a').click(function(){return false;});
      
      
      $('.product').each(function(i, el){					
    
        // Lift card and show stats on Mouseover
        $(el).find('.make3D').hover(function(){
            $(this).parent().css('z-index', "20");
            $(this).addClass('animate');
            $(this).find('div.carouselNext, div.carouselPrev').addClass('visible');			
          }, function(){
            $(this).removeClass('animate');			
            $(this).parent().css('z-index', "1");
            $(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
        });	
        
        // Flip card to the back side
        $(el).find('.view_gallery').click(function(){	
          // add function to chat with vendor re-direct
          
        });			
        
        // Flip card back to the front side
        // $(el).find('.flip-back').click(function(){		
          
        //   $(el).find('.make3D').removeClass('flip180').addClass('flip190');
        //   setTimeout(function(){
        //     $(el).find('.make3D').removeClass('flip190').addClass('flip90');
        
        //     $(el).find('.product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
        //       $(el).find('.product-back, .product-back div.shadow').hide();
        //       $(el).find('.product-front, .product-front div.shadow').show();
        //     });
        //   }, 50);
          
        //   setTimeout(function(){
        //     $(el).find('.make3D').removeClass('flip90').addClass('flip-10');
        //     $(el).find('.product-front div.shadow').show().fadeTo( 100 , 0);
        //     setTimeout(function(){						
        //       $(el).find('.product-front div.shadow').hide();
        //       $(el).find('.make3D').removeClass('flip-10').css('transition', '100ms ease-out');		
        //       $(el).find('.cx, .cy').removeClass('s1 s2 s3');			
        //     }, 100);			
        //   }, 150);			
          
        // });				
      
        // makeCarousel(el);
      });
      
      $('.add-cart-large').each(function(i, el){
        $(el).click(function(){
          var carousel = $(this).parent().parent().find(".carousel-container");
          var img = carousel.find('img').eq(carousel.attr("rel"))[0];						
          var position = $(img).offset();	
    
          var productName = $(this).parent().find('h4').get(0).innerHTML;				
      
          $("body").append('<div class="floating-cart"></div>');		
          var cart = $('div.floating-cart');		
          $("<img src='"+img.src+"' class='floating-image-large' />").appendTo(cart);
          
          $(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
          setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
          
          setTimeout(function(){
          $('div.floating-cart').remove();
          $("body").removeClass("MakeFloatingCart");
    
    
          var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+img.src+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";			
    
          $("#cart .empty").hide();			
          $("#cart").append(cartItem);
          $("#checkout").fadeIn(500);
          
          $("#cart .cart-item").last()
            .addClass("flash")
            .find(".delete-item").click(function(){
              $(this).parent().fadeOut(300, function(){
                $(this).remove();
                if($("#cart .cart-item").size() == 0){
                  $("#cart .empty").fadeIn(500);
                  $("#checkout").fadeOut(500);
                }
              })
            });
            setTimeout(function(){
            $("#cart .cart-item").last().removeClass("flash");
          }, 10 );
          
        }, 1000);
          
          
        });
      })
      
      /* ----  Image Gallery Carousel   ---- */
      // function makeCarousel(el){
      
        
      //   var carousel = $(el).find('.carousel ul');
      //   var carouselSlideWidth = 315;
      //   var carouselWidth = 0;	
      //   var isAnimating = false;
      //   var currSlide = 0;
      //   $(carousel).attr('rel', currSlide);
        
      //   // building the width of the casousel
      //   $(carousel).find('li').each(function(){
      //     carouselWidth += carouselSlideWidth;
      //   });
      //   $(carousel).css('width', carouselWidth);
        
      //   // Load Next Image
      //   $(el).find('div.carouselNext').on('click', function(){
      //     var currentLeft = Math.abs(parseInt($(carousel).css("left")));
      //     var newLeft = currentLeft + carouselSlideWidth;
      //     if(newLeft == carouselWidth || isAnimating === true){return;}
      //     $(carousel).css({'left': "-" + newLeft + "px",
      //                  "transition": "300ms ease-out"
      //                });
      //     isAnimating = true;
      //     currSlide++;
      //     $(carousel).attr('rel', currSlide);
      //     setTimeout(function(){isAnimating = false;}, 300);			
      //   });
        
      //   // Load Previous Image
      //   $(el).find('div.carouselPrev').on('click', function(){
      //     var currentLeft = Math.abs(parseInt($(carousel).css("left")));
      //     var newLeft = currentLeft - carouselSlideWidth;
      //     if(newLeft < 0  || isAnimating === true){return;}
      //     $(carousel).css({'left': "-" + newLeft + "px",
      //                  "transition": "300ms ease-out"
      //                });
      //     isAnimating = true;
      //     currSlide--;
      //     $(carousel).attr('rel', currSlide);
      //     setTimeout(function(){isAnimating = false;}, 300);						
      //   });
      // }
      
      $('.sizes a span, .categories a span').each(function(i, el){
        $(el).append('<span class="x"></span><span class="y"></span>');
        
        $(el).parent().on('click', function(){
          if($(this).hasClass('checked')){				
            $(el).find('.y').removeClass('animate');	
            setTimeout(function(){
              $(el).find('.x').removeClass('animate');							
            }, 50);	
            $(this).removeClass('checked');
            return false;
          }
          
          $(el).find('.x').addClass('animate');		
          setTimeout(function(){
            $(el).find('.y').addClass('animate');
          }, 100);	
          $(this).addClass('checked');
          return false;
        });
      });
      
      $('.add_to_cart').click(function(){
        var productCard = $(this).parent();
        var position = productCard.offset();
        var productImage = $(productCard).find('img').get(0).src;
        var productName = $(productCard).find('.product_name').get(0).innerHTML;				
    
        $("body").append('<div class="floating-cart"></div>');		
        var cart = $('div.floating-cart');		
        productCard.clone().appendTo(cart);
        $(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
        setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
        setTimeout(function(){
          $('div.floating-cart').remove();
          $("body").removeClass("MakeFloatingCart");
    
    
          var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+productImage+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";			
    
          $("#cart .empty").hide();			
          $("#cart").append(cartItem);
          $("#checkout").fadeIn(500);
          
          $("#cart .cart-item").last()
            .addClass("flash")
            .find(".delete-item").click(function(){
              $(this).parent().fadeOut(300, function(){
                $(this).remove();
                if($("#cart .cart-item").size() == 0){
                  $("#cart .empty").fadeIn(500);
                  $("#checkout").fadeOut(500);
                }
              })
            });
            setTimeout(function(){
            $("#cart .cart-item").last().removeClass("flash");
          }, 10 );
          
        }, 1000);
      });
    });
  });
  return (
    // <div id="grid">
      <div class="product">
    	{/* <div class="info-large">
        	<h4>{props.title}</h4>
            <div class="sku">
            	PRODUCT SKU: <strong>89356</strong>
            </div>
             
            <div class="price-big">
            	<span>$43</span> $39
            </div>
             
            <h3>COLORS</h3>
            <div class="colors-large">
                <ul>
                    <li><a href="" style={{backgroundColor: "#222"}}><span></span></a></li>
                    <li><a href="" style={{backgroundColor: "#6e8cd5"}}><span></span></a></li>
                    <li><a href="" style={{backgroundColor: "#f56060"}}><span></span></a></li>
                    <li><a href="" style={{backgroundColor:"#44c28d"}}><span></span></a></li>
                </ul> 
            </div>

            <h3>SIZE</h3>
            <div class="sizes-large">
 				<span>XS</span>
                <span>S</span>
                <span>M</span>
                <span>L</span>
                <span>XL</span>
                <span>XXL</span>
            </div>
            
            <button class="add-cart-large">Add To Cart</button>                          
                         
        </div> */}
        <div class="make3D">
            <div class="product-front">
                <div class="shadow"></div>
                <div style={{backgroundColor: "yellow",height:'100%'}}>
                <img src={props.image} alt={props.image}/>
                </div>
                
                <div class="image_overlay"></div>
                {/* <div class="add_to_cart">Bookmark</div> */}
                {/* <div class="view_gallery">Chat with Event Head</div>*/}
                <div class="stats">        	
                    <div class="stats-container">
                        <span class="product_price">{props.title}</span>
                        <span class="product_name">Sent by: {props.name}</span>  
                        <br/>
                        <strong>Category : </strong>
                        <i>{props.category}</i>
                        <br/>  
                        <br/>
                        
                        <strong>Content : </strong>
                        <i>{props.content}</i>
                        <br/>
                        
                        <div class="product-options">
                        
                        {/* <div class="colors">
                            <div class="c-blue"><span></span></div>
                            <div class="c-red"><span></span></div>
                            <div class="c-white"><span></span></div>
                            <div class="c-green"><span></span></div>
                        </div> */}
                        </div>                       
                    </div>                         
                </div>
            </div>
            
            {/* <div class="product-back">
                <div class="shadow"></div>
                <div class="carousel">
                    <ul class="carousel-container">
                        <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1.jpg" alt="" /></li>
                        <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2.jpg" alt="" /></li>
                        <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/3.jpg" alt="" /></li>
                    </ul>
                    <div class="arrows-perspective">
                        <div class="carouselPrev">
                            <div class="y"></div>
                            <div class="x"></div>
                        </div>
                        <div class="carouselNext">
                            <div class="y"></div>
                            <div class="x"></div>
                        </div>
                    </div>
                </div>
                <div class="flip-back">
                    <div class="cy"></div>
                    <div class="cx"></div>
                </div>
            </div>	   */}
        </div>	
      </div>
    // </div>
  );
}

export default CardItem;