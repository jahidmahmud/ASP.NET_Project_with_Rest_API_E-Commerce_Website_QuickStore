jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
  var Email = Cookies.get('email');
	getAllContact();
  function getAllContact(){
    console.log(Email);
    $.ajax({
        url:"http://localhost:63483/api/admins/message",
        method:"GET",
       /* headers : {
          Authorization: "Basic "+btoa(Email+":"+userpassword) 
        },*/
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            console.log('If');
            var str = "";
            str +="<thead class='thead-dark'><tr><th>Author</th><th>Email</th><th>Subject</th><th>Message</th><th>Action</th></tr></thead><tbody>"
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
              str +="<tr><td>"+data[i].cname+"</td><td>"+data[i].cemail+"</td><td>"+data[i].csubject+"</td><td>"+data[i].cmessage+"</td><td><a href='contactedit.html?id="+data[i].cemail+"' title='Reply' class='replyBtn'>reply</a></td></tr>";
            }
            str +="</tbody>"
            $("#dataTable").html(str);

          }
          else
          {
            console.log('else');
            $(".error").show();
            $(".error").html("Something error");
            /*$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);*/
          }
        }
      });
    }

    $('#replyBtn').click(function(e) {
      
        var email=$("#email").val();
        var reply=$("#reply").val();
        console.log(reply);
        console.log(email);

          if(email != "" && reply != ""){

            $.ajax({
              url:"http://localhost:63483/api/admins/reply",
              method:"POST",
              header:"Content-Type:application/json",
              data:{
              cemail: $("#email").val(),
              cmessage: $("#reply").val()
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                  Swal.fire({
                    title: 'Reply Sent Successfylly successfully',
                    type:'success'
                  });
                }
                else
                {
                  Swal.fire({
                    title: 'Somthing error',
                    type:'error'
                  });
                }
              }
            }); 
          }else{
             Swal.fire({
                    title: 'All fields are required',
                    type:'error'
                  });
          }
    });
});