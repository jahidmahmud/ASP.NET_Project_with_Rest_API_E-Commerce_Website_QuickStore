jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
	getAllOrder();
  function getAllOrder(){
    $.ajax({
        url:"http://localhost:63483/api/shippings/"+userid,
        method:"GET",
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            var count= 0;
            var amount = 0;
            var paid=0;
            var str = "";
            str +="<thead class='thead-dark'><tr><th>User Id</th><th>Address</th><th>City</th><th>State</th><th>Country</th><th>Paid</th><th>Type</th><th>Card No</th></tr></thead><tbody>"
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              str +="<tr><td>"+data[i].uid+"</td><td>"+data[i].adress+"</td><td>"+data[i].city+"</td><td>"+data[i].state+"</td><td>"+data[i].country+"</td><td>"+data[i].amountPaid+"</td><td>"+data[i].paymentType+"</td><td>"+data[i].creditCardNumber+"</td></tr>";
              count++;
              amount = amount+data[i].amountPaid;
            }
            str +="</tbody>"
            $("#dataTable").html(str);
            paid=amount/count;
            $("#totalpaid").html(amount+" TK");
            $("#avgPaid").html(paid+" TK");
            $("#TotalOrder").html(count);
          }
          else
          {
            $("#dataTable").html("No Data Found");
            /*$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);*/
          }
        }
      });
    }



});