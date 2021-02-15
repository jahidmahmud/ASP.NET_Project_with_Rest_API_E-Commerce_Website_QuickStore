$(document).ready(function(){
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
	$("#dtails").click(function(){
		window.location="/QuickStoreAPI/checkoutdetails.html";
	});
	var updateQuan=function(id,value){
		$.ajax({
		url:"http://localhost:63483/api/carts/update/",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			cartId:id,
			quantity:value
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				loadCheckout();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});	
	}
	var addPlus=function(id){
		//var id=$(this).attr('id');
		$.ajax({
		url:"http://localhost:63483/api/carts/add",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			cartId:id
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				loadCheckout();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});	
	}
	var minus=function(id){
		//var id=$(this).attr('id');
		$.ajax({
		url:"http://localhost:63483/api/carts/remove/",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			cartId:id
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				loadCheckout();
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});	
	}
	var loadCheckout=function(){
		$.ajax({
		url:"http://localhost:63483/api/carts/",
		method:"GET",
		complete:function(xmlhttp,status){
			if(xmlhttp.status==200)
			{
				var data=xmlhttp.responseJSON;
				console.log(data);
				var str="";
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].productName+"</td><td>"+data[i].quantity+"</td><td><a class='addplus' id="+data[i].cartId+"><i class='fa fa-plus'></i></a><span> <span><a class='minus' id="+data[i].cartId+"><i class='fa fa-minus'></i></a></td><td><input type='number' min='0' value="+data[i].quantity+" id='num1'/><input type='submit' value='Update' id="+data[i].cartId+" class='subm'></td></tr>";

					$("#checkoutTable tbody").html(str);
					//<a class='addCart' id="+data[i].productId+">ADD TO CART</a>
					//<button  class='remove'></button>
				}
				$(".addplus").click(function(e){
					var id=$(this).attr('id');
					addPlus(id);
					});
				$(".minus").click(function(e){
					var id=$(this).attr('id');
					minus(id);
					});
				$(".subm").click(function(e){
					var id=$(this).attr('id');
					var value=$("#num1").val();
					updateQuan(id,value);
					});
			}
			else
			{
				console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});

	}
	loadCheckout();
});