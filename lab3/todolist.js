var list = document.querySelector('ul');

list.addEventListener('click', function (ev) {
    if(ev.target.tagName === "LI") {
        ev.target.classList.toggle('checked');
    } else if(ev.target.tagName === "SPAN") {
        ev.target.parentNode.remove();
    }
}, false);

function newElement() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('toDoNewTask').value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if(inputValue == "") {
        alert("Input your task!");
    } else {
        document.getElementById('list').appendChild(li);
    }
    document.getElementById('toDoNewTask').value = "";
    var span = document.createElement('SPAN');
    var txt = document.createTextNode("Delete");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}