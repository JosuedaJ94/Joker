function searchForJokes(){
  $("form").submit(event => {
    event.preventDefault();
    //handle categories
    var cats = [];
    var count = 0;

    if($('#programming').prop("checked") == true) {
      cats.push($('#programming').val());
      count++;
    }
    if($('#misc').prop("checked") == true) {
      cats.push($('#misc').val());
      count++;
    }
    if($('#dark').prop("checked") == true) {
      cats.push($('#dark').val());
      count++;
    }
    if($('#pun').prop("checked") == true) {
      cats.push($('#pun').val());
      count++;
    }
    if(count == 0) {
      cats.push("Any");
    }

    //handle flags
    var flags = [];
    var fcount = 0;

    if($('#religion').prop("checked") == true) {
      flags.push($('#religion').val());
      fcount++;
    }
    if($('#political').prop("checked") == true) {
      flags.push($('#political').val());
      fcount++;
    }
    if($('#racism').prop("checked") == true) {
      flags.push($('#racism').val());
      fcount++;
    }
    if($('#sexist').prop("checked") == true) {
      flags.push($('#sexist').val());
      fcount++;
    }
    if(fcount == 0) {
      flags.push("none");
    }

    //handle phrase
    var phrase = "";
    if($('#search').val() != "") {
      phrase = $('#search').val();
    }else{
      phrase = "none";
    }
    
    var endpoint = "https://sv443.net/jokeapi/v2/joke/";

    var url = completeURL(endpoint, cats, flags, phrase);
    
    retrieveJoke(url);
  });
}

function completeURL(endpoint, cats, flags, phrase){

  if(cats[0] == "Any") {
    endpoint = endpoint + "Any";
  }else{
    endpoint = endpoint + cats.join(',');
  }

  if(flags[0] == "none" && phrase == "none") {
    
    return endpoint;
  }else{
    
    endpoint = endpoint + "?";
  }
  
  if(flags[0] != "none") {
    console.log("here");
    endpoint = endpoint + "blacklistFlags=" + flags.join(',');

    if(phrase == "none") {
      return endpoint;
    }else{
      endpoint = endpoint + "&contains=" + phrase;
      return endpoint;
    }
  }else{
    endpoint = endpoint + "contains=" + phrase;
    return endpoint;
  }
}

function retrieveJoke(url) {
  fetch(url).then(response => response.json()).then(responseJson => displayJoke(responseJson));
}

function displayJoke(response) {
  console.log(response);
  if(response.type == 'single') {
    $('.part1').html(`<div class="part1">
    <h3>${response.joke}</h3>
    </div>`);
  }else{
    $('.part1').html(`<div class="part1">
      <h3>${response.setup}</h3>
      </div>`);

    $('.part2').html(`<div class="part2">
      <h3>${response.delivery}</h3>
      </div>`);
  }
}

$(searchForJokes);