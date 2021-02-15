$(document).ready(function(){
        var allcookies = document.cookie;
          var username = Cookies.get('username');
          var userid = Cookies.get('userid');
          var userrole = Cookies.get('userrole');
          var userpassword = Cookies.get('upassword');
          var totalsum = Cookies.get('totalsums');
	$("#order").click(function(){
		placeOrder();
	});
	var placeOrder=function(){
        var address=$("#address").val();
        var paymentType=$(".ptype").val();
        var city=$("#city").val();
        var state=$("#state").val();
        var country=$("#country").val();
        var zip=$("#zip").val();
        var cardNo=$("#cardno").val();
        var cardName=$("#cardname").val();
        var date=$("#date").val();
        if(address== "")
        {
        	$("#addressErr").html("address required");
        }
        else if(city=="")
        {
        	$("#cityErr").html("city required");
        }
        else if(state=="")
        {
        	$("#stateErr").html("state required");
        }
        else if(country=="")
        {
        	$("#countryErr").html("country required");
        }
        else if(zip=="")
        {
        	$("#zipErr").html("zip no required");
        }
        else if(cardNo=="")
        {
        	$("#cardnoErr").html("cardNo required");
        }
        else if(cardName=="")
        {
        	$("#cardnameErr").html("cardName required");
        }
        else if(date=="")
        {
        	$("#dateErr").html("date required");
        }
        else{
		$.ajax({
		url:"http://localhost:63483/api/shippings",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			uid:userid,
			adress:address,
			city:city,
			state:state,
			country:country,
			zipCode:zip,
			amountPaid:totalsum,
			paymentType:paymentType,
			creditCardNumber:cardNo
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
                crearCart();
			}
			else
			{
			     console.log(xmlhttp.status+":"+xmlhttp.statusText);
			}
		}
	});
	}
	}

    function crearCart(){
        $.ajax({
          url:"http://localhost:63483/api/carts/CartDelete/"+userid,
          method:"Delete",
          header:"Content-Type:application/json",
          
          complete:function(xmlhttp,status){
            if(xmlhttp.status==204)
            {
                window.location="/QuickStoreAPI/success.html";
            }
            else
            {
              console.log(xmlhttp.status+":"+xmlhttp.statusText);
            }
          }
        });
    }
});