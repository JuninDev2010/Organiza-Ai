function salvarDados() {
    localStorage.setItem('tarefas', main.innerHTML);
}

let contador = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');
let mensagem = document.getElementById('mensagem');

function addTarefa() {

    let valorInput = input.value;

    if (valorInput !== "") {

        contador++;

        let novoItem = `<div id="${contador}" class="item">
            <div onclick="marcarTarefa(${contador})" class="itemicone">
                <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
            </div>
            <div onclick="marcarTarefa(${contador})" class="itemnome">${valorInput}</div>
            <div class="itembotao">
                <button onclick="deletar(${contador})" class="delete">
                    <i class="mdi mdi-delete"></i> Deletar
                </button>
            </div>
        </div>`;
       
        //ADD
        main.innerHTML += novoItem;

        //NEM VAZIO/NULO/UNDEFINED
        input.value = "";
        input.focus();

        // MOSTRAR MSG
        mensagem.style.display = "flex";

        salvarDados();
    };
};

function deletar(id) {
    var tarefa = document.getElementById(id);
    tarefa.remove();

 if (main.children.length === 0) {
        mensagem.style.display = "flex";
    }

    salvarDados();

    if (main.children.length === 0) {
        mensagem.style.display = "none";
    }
};

input.addEventListener("keyup", function (event) {
    //SE TECLOU ENTER (13)
    if (event.keyCode === 13) {
        event.preventDefault();
        btnAdd.click();
    };
});

function marcarTarefa(id) {
    var item = document.getElementById(id);
    var classe = item.getAttribute('class');

    if (classe === "item") {
        item.classList.add('itemClicado')
        var icone = document.getElementById('icone_' + id)
        icone.classList.remove('mdi-circle-outline');
        icone.classList.add('mdi-check-circle');

        item.parentNode.appendChild(item);
    } else {
        item.classList.remove('itemClicado')
        var icone = document.getElementById('icone_' + id)
        icone.classList.add('mdi-circle-outline');
        icone.classList.remove('mdi-check-circle');
    };

    salvarDados();
};

window.onload = function() {
    main.innerHTML = localStorage.getItem('tarefas') || "";

    if (main.children.length > 0) {
        mensagem.style.display = "flex";
    }
}