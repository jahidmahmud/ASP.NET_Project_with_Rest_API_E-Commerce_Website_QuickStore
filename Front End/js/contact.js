jQuery(document).ready(function($) {
	$('#sendBtn').click(function(e) {
      
        var name=$("#author").val();
        var email=$("#email").val();
        var subject=$("#subject").val();
        var message=$("#message").val();

          if(name != "" && email != "" && subject != "" && message != ""){

            $.ajax({
              url:"http://localhost:63483/api/customers/contact",
              method:"POST",
              header:"Content-Type:application/json",
              data:{
                cname: $("#author").val(),
	            cemail: $("#email").val(),
	            csubject: $("#subject").val(),
	            cmessage: $("#message").val()
              },
              complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                  Swal.fire({
                    title: 'Your message send successfully',
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