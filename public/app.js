// Grab the articles as a json

 $("#wrapper").empty();
$.getJSON("/articles", function(data) {

  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var card = $('<div class="card" data-id = '+ data[i]._id +'>');
    var cardHeader = '<h3 class="card-header" data-id = '+ data[i]._id +'>'+ data[i].title +'</h3>';
    var cardBlock = $("<div class='card-block'>");
    var cardDesc = "<p class='card-text'>" +  data[i].description + "</p>" 
    var cardBtn = "<a href="+ data[i].link +" 'class='btn btn-primary'>Goto Article</a>";
    var cardCmnt = "<a href='#' 'class='btn btn-primary' id= 'cmntBtn' data-id = "+data[i]._id+">Leave Comment</a>";
    var inputField = "<input id='titleinput' name='title'>";
    var cmntTitle = "<h2>Title</h2>";
    var cmntBody = "<h2>Body</h2>";
    var bodyField = "<textarea id='bodyinput' name='body'></textarea>";
    var submitBtn = "<button type='button' id= 'savenote' class='btn btn-success' data-id = "+ data[i]._id +">Submit</button>";
    var showCmntBtn = "<button type='button' id= 'showCmnts' class='btn btn-info' data-id = "+ data[i]._id +">Show Comments</button>"
    $(cardHeader).appendTo(card);
    $(cardDesc).appendTo(cardBlock);
    $(cardBtn).appendTo(cardBlock)
    $(cardCmnt).appendTo(cardBlock)

    $(cardBlock).append(cmntTitle);
     $("h2").hide();
    $("input#titleinput").hide();
    $(cardBlock).append(cmntBody);
    $("textarea#bodyinput").hide();

    $(cardBlock).append(inputField);
    $(cardBlock).append(bodyField);
    $(cardBlock).append(submitBtn);
    $(cardBlock).append(showCmntBtn);
    $(".btn-success").hide();
    $(cardBlock).appendTo(card);
    $("#wrapper").append(card);
    //console.log($(this).attr("data-id"));
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].description + "</p>");
  }
});






// Whenever someone clicks a p tag
$(document).on("click", "#cmntBtn", function() {
  // Empty the notes from the note section

  $("#notes").empty();
  $("input#titleinput").show();
  $("h2").show()
  $("textarea#bodyinput").show();
  $(".btn-success").show();
  $(".btn-info").hide();
  
  
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  //Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // // The title of the article
      // $("#notes").append("<h2>" + data.title + "</h2>");
      // // An input to enter a new title
      // $("#notes").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});





$(document).on("click", "#showCmnts", function() {

//alert('hello');

var thisId = $(this).attr("data-id");

  //Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
.done(function(data) {
      //console.log(data[0]);
      //var cardBlock = $("<div class='card-block'>");

      console.log(data);
      var noteTitle = data[0].note.title;
      var noteBody = data[0].note.body;

      var noteCardTitle = "<h1>" + noteTitle + "</h1>";
      var noteCardBody = "<h1>" + noteBody + "</h1>";
      console.log(noteCardTitle);

      $(noteCardTitle).appendTo(".card-block");
      $(noteCardBody).appendTo(".card-block");
     

});

  });