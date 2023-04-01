
// Arshdeep Singh
// 0791162

$(function(){
    $.getJSON("presidents.json").done(function(data){
      let $tableBody = $('<tbody id="test"></tbody>');
      let array1 = [];
      let array2 = [];    
      $.each(data.actors, function(index, value){     
        let $row = $('<tr></tr>');
        $row.append($('<td class="fname"></td>').text(value.fname));
        $row.append($('<td class="lname"></td>').text(value.lname));
        $row.append($('<td></td>').text(value.gender));
        $row.append($('<td></td>').text(value.city)); 
        $row.append($('<td></td>').text(value.birthday));
       
        $tableBody.append($row);
        
        if(data.actors[index].fname.charAt(0) <= 'N') {
          array1.push(data.actors[index]);
        } else {
          array2.push(data.actors[index]);
        }
      });
  
      $('thead').after($tableBody);
  
      let temp = [];
      let $tds = $('.fname');
      $.each($tds, function( index, value ) {
        temp.push({
          element: this,
          text: $tds[index].innerText.trim().toLowerCase()
        });
      });
  
      $('#button1').append(`A-M (${array1.length})`).addClass('active').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('td').hide();
          temp.forEach(function (td) {
            if ($(td.element).text().charAt(0) <= 'N'){
              $(td.element).show();
              $(td.element).siblings().show();
            }
          });
      });
  
      $('#button2').append(`N-Z (${array2.length})`).addClass('active').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('td').hide();
        temp.forEach(function (td) {
          if ($(td.element).text().charAt(0) > 'N'){
            $(td.element).show();
            $(td.element).siblings().show();
          }
        });
      });
  
      let $search = $('#filter-search');
      let cache = [];
      
      $.each($tds, function( index, value ) {
        cache.push({
          element: this,
          text: $tds[index].innerText.trim().toLowerCase()
        });
       
  
      });
  
    
      function filter() {
        let query = this.value.trim().toLowerCase();
        
        if(query) {
          cache.forEach(function (td) {
            let index = 0;
            index = td.text.indexOf(query);
            // td.element.style.backgroundColor = index === -1 ? '' : 'yellow';
            // console.log("d", $(td.element).parent());
            if(index === -1){ 
              $(td.element).siblings().css("background-color", "") 
              $(td.element).siblings().css("color", "")
              $(td.element).css("background-color", "")   
              $(td.element).css("color", "") 
            } else {
              $(td.element).siblings().css("background-color", "green")
              $(td.element).siblings().css("color", "white")
              $(td.element).css("background-color", "green")
              $(td.element).css("color", "white")
  
            } 
          });
        } 
        if(!query) {
          cache.forEach(function(td){
            td.element.style.backgroundColor = "";
            $(td.element).siblings().css("background-color", "")
            $(td.element).siblings().css("color", "")
            $(td.element).css("background-color", "")
            $(td.element).css("color", "")
          });
  
        }
  
      }
    
      if('oninput' in $search[0]) {
        $search.on('input', filter);
      } else {
       $search.on('keyup', filter);
      }
  
    
  
    });
  
  
  });
  