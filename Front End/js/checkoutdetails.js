$(document).ready(function(){
	var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
	$("#mike").click(function(){
		window.location="/QuickStoreAPI/payment.html";
	});
	var total;
	var subtotal;
	var taxtotal;
	var sumtotal=0;
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
					subtotal=data[i].price*data[i].quantity;
					taxtotal=subtotal*.15;
					total=subtotal+taxtotal;
					str+="<tr><td>"+data[i].productName+"</td><td>"+data[i].price+"</td><td>"+data[i].quantity+"</td><td>"+subtotal+"</td><td>"+taxtotal+"</td><td>"+total+"</td></tr>";

					$("#checkoutdetails tbody").html(str);
					sumtotal+=total;
				}
				Cookies.set("totalsums",sumtotal);
              	var totalsum = Cookies.get('totalsums');
				$("#total").html(sumtotal);
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