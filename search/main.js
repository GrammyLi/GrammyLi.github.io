/*
 * @Author: your name
 * @Date: 2021-10-14 13:35:59
 * @LastEditTime: 2021-10-14 13:36:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /grammyli/search/main.js
 */

var form = document.querySelector("#searchQuery");
var results = document.querySelector("#searchResults");

function searchQuery(){
  
  // Clear prior search results
  results.innerHTML = ""
  
  // Establish search param
  var search = encodeURIComponent(document.querySelector("#query").value);
  
  // Fetch JSON from Mediawiki API
  $.getJSON("https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts|info&exintro=&explaintext=&inprop=url&gsrsearch=" + search, function(data){
    
    // Add content to DOM
    var pages = data.query.pages;
    
    for (var key in pages){
      var title = data.query.pages[key].title;
      var intro = data.query.pages[key].extract;
      var link = data.query.pages[key].fullurl;
      results.innerHTML += "<div class='box'><a href='" + link + "' target='_blank'><h2>" + title + "</h2><p>" + intro + "</p></a></div>"
    };
  });
  
  // // Override default form behavior
  // $(this).on("submit", function(e){
  //   e.preventDefault();
  // });
};
  
