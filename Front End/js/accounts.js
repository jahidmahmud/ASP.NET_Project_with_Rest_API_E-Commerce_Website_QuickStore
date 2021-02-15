jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  //console.log(UserID);
  var cookieval;
  var CookieUserID;
  $(".error").hide();
  $(".success").hide();


  $("#register-btn").click(function(){
    addUser();
  });

  $("#login-btn").click(function(){
    loginUser();
  });


    var addUser=function(){
        var UserName=$("#username").val();
        var UserEmail=$("#email").val();
        var UserPassword=$("#password").val();
       
        if(UserName != "" && UserEmail != "" && UserPassword != "")
        {
        	console.log('if block');
            $.ajax({
              url:"http://localhost:63483/api/users",
              method:"POST",
              header:"Content-Type:application/json",
              data:{
                Username:$("#username").val(),
                UEmail:$("#email").val(),
                UPassword:$("#password").val(),
                UserRole:"Customer"
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                	Swal.fire({
		              title: 'Resistration Completed successfully',
		              icon: 'success',
		              showClass: {
		                popup: 'animate__animated animate__fadeInDown'
		              },
		              hideClass: {
		                popup: 'animate__animated animate__fadeOutUp'
		              }
		            });

                  $(".success").show();
                  $(".success").html("Registration Successfull");
                }
                else
                {
                  $("#msg").html(xmlhttp.status+":"+xmlhttp.statusText);
                }
              }
            });
          
        }else{
        	console.log('else block');
          $(".error").show();
          $(".error").html("All fields are required");
          }
      }



  var loginUser=function(){
    var username1=$("#email").val();
    var password1=$("#password").val();
    if(username1 == "" || password1 == "")
    {
      $(".error").show();
      $(".error").html("All fields are required");
    }
    else{
      $.ajax({
        url:"http://localhost:63483/api/users/login",
        method:"POST",
        header:"Content-Type:application/json",
      	data:{
        	uEmail:$("#email").val(),
        	uPassword:$("#password").val()
      	},
        complete:function(xmlhttp,status){
          if(xmlhttp.status==200)
          {
            //console.log("hello world");
            var data=xmlhttp.responseJSON;
            for (var i = 0; i < data.length; i++) {
            	var UserId = data[i].uid;
            	var UserName = data[i].username;
            	var email = data[i].uEmail;
            	var password = data[i].uPassword;
            	var UserRole = data[i].userRole;
              Cookies.set("userrole",UserRole);
              Cookies.set("username",UserName);
              Cookies.set("userid",UserId);
              Cookies.set("upassword",password);
               Cookies.set("email",email);
              var username = Cookies.get('username');
              var userid = Cookies.get('userid');
              var userrole = Cookies.get('userrole');
              var userpassword = Cookies.get('upassword');
              var Emails = Cookies.get('email');
             // console.log(username);
              //console.log("username");
            	if (UserRole == "Admin") {
            		window.location="Admin/index.html";
            	}else{
            		window.location="Customer/index.html";
            	}
            }
            
          }
          else
          {
          	$(".error").show();
            $(".error").html("Username or password is incorrect");
            /*$("#err").html(xmlhttp.status+":"+xmlhttp.statusText);*/
          }
        }
      });
      }
    }


	});
