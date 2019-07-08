let  btns = document.querySelectorAll('.sidebar .dropdown-toggle');
let title = document.getElementById('title');
let content = document.getElementById('content');
let  checkboxes = document.querySelectorAll('.dropdown-menu-right li input[type="checkbox"]');
let  lists = document.querySelectorAll('.sidebar ul');
const note = JSON.parse(localStorage.getItem("note")) || [];
let  del = document.getElementsByClassName('zmdi');




Show = (e) => {
  //  console.log(e);
    e.classList.toggle('show');
}

btns.forEach(btn => { btn.addEventListener('click', e => {
   Show(btn.nextElementSibling);
   /* console.log(e);   
    let a = btn.nextElementSibling; //refer to next sibling of element in DOM
    console.log(a);
    a.classList.toggle('show'); */
});    
});

viewNote = (e) => {
    console.log(e);
    
    console.log(e.target.lastElementChild);
    let _lastChild = e.target.lastElementChild;
    Show(_lastChild); 
    /*console.log(e.target.nextElementSibling);
    let nextSib = e.target.nextElementSibling;
    Show(nextSib); */

};


SelectCategory= (e) => {
    let b = e.target.nextElementSibling
    Show(b);
}

checkboxes.forEach(checkbox => { checkbox.addEventListener('click', (e) => {
    let b = checkbox.parentElement;
    Show(b.parentElement);
    checkbox.checked = false;
    let c = checkbox.value;
  
    Save = (e) => {
   // console.log(title.innerText);
    var date = new Date();
    var mainDate = date.getFullYear() +  ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let mainContent = {
        notettitle: title.innerText,
        notecontent: content.innerText,
        category: c,
        newdate: mainDate
    }
    console.log(mainContent.category);
    
    let cmp = mainContent.category;
    let cmp2 = mainContent.notettitle;

    const itemExists = note.some(function(i){     
        if(i.notettitle === cmp2){
            return true;
        }
    });
    if (itemExists){
        console.log('error');
        title.classList.add('error');
    } else{
        note.push(mainContent);
        note.sort((a,b) => b.newdate - a.newdate);
        localStorage.setItem("note", JSON.stringify(note)); 
        lists.forEach(list => {
            if (list.id === cmp){
                var newLi = document.createElement('li');
                newLi.className = "view";
                newLi.innerHTML = ` ${mainContent.notettitle}<i title="Hide Note" class="zmdi zmdi-delete" onclick="Hide(event)"></i> <div class="modal"> <p> ${mainContent.notecontent}</p></div> `;
                newLi.addEventListener('click', (e) => {
                    console.log(e);
                    viewNote(e);
                });
                list.appendChild(newLi);
               /* list.innerHTML += `<li class="view"> ${mainContent.notettitle}<i title="Hide Note" class="zmdi zmdi-delete" onclick="Hide(event)"></i> <div class="modal"> <p> ${mainContent.notecontent}</p></div> </li>`;   */         
            }
        }); 
        Clear(e);  
    }
}
});
});


Clear = (e) => {
    title.innerText = "";
    content.innerText = "";
}

Hide = (e) => {
  e.target.parentElement.remove();   
}


lists.forEach(list => {list.addEventListener('mouseover', (f) => {
    list.title = "View Note";
})    
});

Delete = (e) => {
    localStorage.clear();
    lists.forEach(list => {    
        list.innerHTML = "";
    });
}


listItems = () => {
 //   console.log(this);
    note.forEach(notes => {
        let comp = notes.category;
        lists.forEach(list => {
            if (list.id === comp){
                var newLi = document.createElement('li');
                newLi.className = "view";
                newLi.innerHTML = ` ${notes.notettitle}<i title="Hide Note" class="zmdi zmdi-delete" onclick="Hide(event)"></i> <div class="modal"> <p> ${notes.notecontent}</p></div> `;
                newLi.addEventListener('click', (e) => {
                    console.log(e);
                    viewNote(e);
                });
                list.appendChild(newLi);
              //  list.innerHTML += `<li> ${notes.notettitle} <i title="Hide Note" class="zmdi zmdi-delete" onclick="Hide(event)"></i></li>`;
            }
        });
    });
}

window.onload = listItems();

/*Checked = (e) => {
  //console.log(e.target);
    let b = e.target.parentElement;
    Show(b.parentElement);
    
    e.target.checked = false;
    
    //e.target.removeAttr('checked');
} */