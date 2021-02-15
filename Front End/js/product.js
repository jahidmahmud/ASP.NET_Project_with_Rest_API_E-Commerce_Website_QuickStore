$(document).ready(function(){
	
	$('#customer').hide();
	$('#admin').hide();
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
  var Email = Cookies.get('email');
	userDashboard();
  	
  function userDashboard(){
  	if (userrole === "Admin") {
  		$('#admin').show();
  		//window.location="Admin/index.html";
  	}else if(userrole === "Customer"){
  		$('#customer').show();
  	}
  }
	$("#checkOut").click(function(){
		window.location="/QuickStoreAPI/checkout.html";
	});
	var loadProducts=function(){
		$.ajax({
		url:"http://localhost:63483/api/products",
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				console.log('if');
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<li class='product-item'><div class='product-thumb clearfix'><a href='#' class='product-thumb'><img src="+data[i].productImage+" alt='image'></a></div><div class='product-info clearfix'> <span class='product-title'>"+data[i].description+"</span><div class='price'><ins><span class='amount'>$"+data[i].price+"</span></ins></div><ul class='flat-color-list width-14'><li><a href='#' class='red'></a></li><li><a href='#' class='blue'></a></li><li><a href='#' class='black'></a></li></ul></div><div class='add-to-cart text-center' id='addDiv'><button  class='readMore' id="+data[i].productId+">ADD TO CART</button></div><button class='like' id="+data[i].productId+"><i class='fa fa-heart-o'></i></button></li>";
					
					//<a class='addCart' id="+data[i].productId+">ADD TO CART</a>
				}
				$("#pro ul").html(str);
				
				$(".readMore").click(function(e){
					var id=$(this).attr('id');
					addCart(id);
					});
				$(".like").click(function(e){
					var id=$(this).attr('id');
					addWishlist(id);
					});
			}
			else
			{
				$("#pro ul").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}
	var removeCart=function(id){
		$.ajax({
		url:"http://localhost:63483/api/carts/"+id,
		method:"Delete",
		header:"Content-Type:application/json",
		
		complete:function(xmlhttp,status){
			if(xmlhttp.status==204)
			{
				loadCart();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
	var addCart=function(id){
		console.log(userid);
		//if(userid != ""){
			$.ajax({
				url:"http://localhost:63483/api/carts/",
				method:"POST",
				header:"Content-Type:application/json",
				headers : {
		          Authorization: "Basic "+btoa(Email+":"+userpassword) 
		        },
				data:{
					productId:id,
					userId:userid
				},
				complete:function(xmlhttp,status){
					if(xmlhttp.status==201)
					{
						loadCart();
					}
					else
					{
						console.log(xmlhttp.status+":"+xmlhttp.statusText);
					}
				}
			});	
		/*}else{
			window.location="login.html";
		}*/
	}



	var addWishlist=function(id){
		//var id=$(this).attr('id');
		console.log(id);
		$.ajax({
		url:"http://localhost:63483/api/wishlists/",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			uid:userid,
			pid:id
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				console.log("success");
				loadCart();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});	
	}

	var removeWishlist=function(id){
		$.ajax({
		url:"http://localhost:63483/api/wishlists/removefromwishlist",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			uid:userid,
			pid:id
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				loadWishlist();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});	
	}
	var loadWishlist=function(){
		console.log("hello wishlist");
		$.ajax({
		url:"http://localhost:63483/api/wishlists/product/"+userid,
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].productName+"</td><td>"+data[i].description+"</td><td>"+data[i].price+"</td><td><button class='addfromw' id="+data[i].productId+">Add Cart</button><button id="+data[i].productId+" class='removewish'>Remove</button></td></tr>";
					$("#wishTable tbody").html(str);
				}
					$(".removewish").click(function(e){
					var id=$(this).attr('id');
					removeWishlist(id);
					});
					$(".addfromw").click(function(e){
					var id=$(this).attr('id');
					addCart(id);
					});
			}
			else
			{
				$("#pro ul").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}

    


	var loadCart=function(){
		console.log("hello mister22");
		$.ajax({
		url:"http://localhost:63483/api/carts/",
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var increment = 0;
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<li class='woocommerce-mini-cart-item mini_cart_item'><a style='display:flex;'><li>"+data[i].productName+"</li><li>"+data[i].quantity+"</li><li><button  class='remove' id="+data[i].cartId+" ><i class='fa fa-minus-circle'></i></button></li></a> </li>";
					$("#cartss ul").html(str);
					increment++;
				}
				$('#count').html(increment);

				$(".remove").click(function(e){
					var id=$(this).attr('id');
					removeCart(id);
					});
			}
			else
			{
				$("#pro ul").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}

	$('#newsBtn').click(function(event) {
        var emailId=$("#subscribe").val();
        
        $.ajax({
              url:"http://localhost:63483/api/customers",
              method:"POST",
              header:"Content-Type:application/json",
              data:{
                nEmail: $('#subscribe').val()
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {console.log("if");
                  Swal.fire({
                    title: 'Your Subscription has successfully done',
                    type:'success'
                  });
                }
                else
                {
                	console.log("else");
                  Swal.fire({
                    title: 'Somthing error',
                    type:'error'
                  });
                }
              }
            });
    });

    //Search

    $('#search').on("keyup", function() {
    	if ($('#search').val() != "") {
    		 $.ajax({
              url:"http://localhost:63483/api/products/search",
              method:"POST",
              header:"Content-Type:application/json",
              data:{
                productName: $('#search').val()
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
			{
				var data=xmlhttp.responseJSON;
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<li class='product-item'><div class='product-thumb clearfix'><a href='#' class='product-thumb'><img src="+data[i].productImage+" alt='image'></a></div><div class='product-info clearfix'> <span class='product-title'>"+data[i].description+"</span><div class='price'><ins><span class='amount'>$"+data[i].price+"</span></ins></div><ul class='flat-color-list width-14'><li><a href='#' class='red'></a></li><li><a href='#' class='blue'></a></li><li><a href='#' class='black'></a></li></ul></div><div class='add-to-cart text-center' id='addDiv'><button  class='readMore' id="+data[i].productId+">ADD TO CART</button></div><button class='like' id="+data[i].productId+"><i class='fa fa-heart-o'></i></button></li>";
					
					//<a class='addCart' id="+data[i].productId+">ADD TO CART</a>
				}
				$("#pro ul").html(str);
				
				$(".readMore").click(function(e){
					var id=$(this).attr('id');
					addCart(id);
					});
				$(".like").click(function(e){
					var id=$(this).attr('id');
					addWishlist(id);
					});
			}
			else
			{
				$("#pro ul").html(xmlhttp.status+":"+xmlhttp.statusText);
			}
              }
            });
    	}
       
    });


loadProducts();
loadCart();
loadWishlist();
});