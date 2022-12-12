//The URIs of the REST endpoint
IUPS = "https://prod-35.northeurope.logic.azure.com:443/workflows/51b07b7ea3eb493b97b3d1c45c4aa7ff/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LVaMf1VXp8Zm0DWi6ttJ-Fk2TFEjFRDkHP93Q3hsj6c";
RAI = "https://prod-34.northeurope.logic.azure.com:443/workflows/c8b11ca4828a444f9b00aefd71351862/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k5UrF9dVr3txit_5zsNBqr5uiHKZlc6jcFJVQqLpUTY";

BLOB_ACCOUNT = "https://cloudnativedevelopment.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
    //Create a form data object
    submitData = new FormData();
    //Get form variables and append them to the form data object
    submitData.append('title', $('#Title').val());
    submitData.append('producer', $('#Producer').val());
    submitData.append('publisher', $('#Publisher').val());
    submitData.append('genre', $('#Genre').val());
    submitData.append('ageRating', $('#AgeRating').val());
    submitData.append('File', $("#UpFile")[0].files[0]);

    //Post the form data to the endpoint, note the need to set the content type header
    $.ajax({
        url: IUPS,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data){
            
        }
    });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
    
    //Replace the current HTML in that div with a loading message
    $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
    $.getJSON(RAI, function( data ) {
        //Create an array to hold all the retrieved assets
        var items = [];

        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each( data, function( key, val ) {
        items.push( "<hr />");
        items.push("<video width='320' height='240' controls><source src='"+BLOB_ACCOUNT + val["filePath"] +"' type='video/mp4'></video> <br />")
        items.push( "File : " + val["title"] + "<br />");
        items.push( "Uploaded by: " + val["producer"] + " (user id: "+val["publisher"]+")<br />");
        items.push( "<hr />");
        });
        //Clear the assetlist div
        $('#ImageList').empty();
        //Append the contents of the items array to the ImageList Div
        $( "<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
        }).appendTo( "#ImageList" );
    });
 
}

