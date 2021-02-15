jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
  var Email = Cookies.get('email');
  console.log(username);
  console.log(userid);
  console.log(userrole);
  console.log(userpassword);
	var count=0;
	var order = 0;
	var profit = 0;
  var hits = 0;
	totalUsers();
	totalOrder();
  totalHits()
	function totalUsers(){
      $.ajax({
        url:"http://localhost:63483/api/admins/TotalUsers",
        method:"GET",
        headers : {
                Authorization: "Basic "+btoa(Email+":"+userpassword) 
              },
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              count++;
            }
            $('#totalUsers').html(count);
          }
        }
      });
	}

	function totalOrder(){
      $.ajax({
        url:"http://localhost:63483/api/admins/TotalOrders",
        method:"GET",
        headers : {
                Authorization: "Basic "+btoa(Email+":"+userpassword) 
              },
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              order++;
              profit += data[i].amountPaid;
            }
            $('#totalOrder').html(order);
            $('#totalProfit').html(profit+" TK");
          }
        }
      });
	}

  //total hits

  function totalHits(){
      $.ajax({
        url:"http://localhost:63483/api/admins/totalHitsGet",
        method:"GET",
        headers : {
                Authorization: "Basic "+btoa(Email+":"+userpassword) 
              },
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              hits = data[i].hitsCount;
            }
            $('#totalHits').html(hits);
          }
        }
      });
  }
});
