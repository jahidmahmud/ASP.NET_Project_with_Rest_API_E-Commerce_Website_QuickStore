jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
	getAllCategory();
  function getAllCategory(){
    $.ajax({
        url:"http://localhost:63483/api/orders",
        method:"GET",
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var str = "";
            str +="<thead class='thead-dark'><tr><th>User Id</th><th>Address</th><th>City</th><th>State</th><th>Country</th><th>Paid</th><th>Type</th><th>Card No</th></tr></thead><tbody>"
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              str +="<tr><td>"+data[i].uid+"</td><td>"+data[i].adress+"</td><td>"+data[i].city+"</td><td>"+data[i].state+"</td><td>"+data[i].country+"</td><td>"+data[i].amountPaid+"</td><td>"+data[i].paymentType+"</td><td>"+data[i].creditCardNumber+"</td></tr>";
            }
            str +="</tbody>"
            $("#dataTable").html(str);
          }
          else
          {
            $(".error").show();
            $(".error").html("Something error");
            /*$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);*/
          }
        }
      });
    }
});