jQuery(document).ready(function($) {
  var allcookies = document.cookie;
  var username = Cookies.get('username');
  var userid = Cookies.get('userid');
  var userrole = Cookies.get('userrole');
  var userpassword = Cookies.get('upassword');
  var Email = Cookies.get('email');
	//add

    $('#sendnewsBtn').click(function(){
        SendNews();
      }); 
     function SendNews() {
      
        var msg=$("#messagetext").val();
       
        	 console.log(msg);
          if(msg == ""){
              console.log("if");
            Swal.fire({
                    title: 'Fild must required',
                    type:'error'
                  });
          }else{
          		 console.log("else");
            $.ajax({
              url:"http://localhost:63483/api/admins/news",
              method:"POST",
              header:"Content-Type:application/json",
              headers : {
                Authorization: "Basic "+btoa(Email+":"+userpassword) 
              },
              data:{
                nEmail: $("#messagetext").val()
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                  Swal.fire({
                    title: 'Email Send successfully',
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
          }
    }
});