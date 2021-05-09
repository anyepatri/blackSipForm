const postalCode = document.getElementById("postalCode");

postalCode.addEventListener('input', (e) => {
    const select = document.querySelector("select")
    const option = document.querySelectorAll("option");
    option.forEach(element => {
        element.remove();
    });
    getColonies(e.target.value);
    const msj = document.querySelector(".msj");
    const colonies = document.querySelector("#colonies");
    function getColonies(code) {
        const urlGetCode = `https://blackisp.herokuapp.com/postalCodes/${code}`;
        fetch(urlGetCode)
        .then((sucess) => {
            return sucess.json();
        })
        .then((data) => {
            showColoniesDom(data);
            // console.log(data)
        })
        .catch((err) => {
            console.log('error fecth');
            select.style.display="none";
            colonies.style.display="flex";
            colonies.value = "";
            msj.style.display="block";
            msj.innerHTML = "No existe ese codigo postal";
            msj.style.color= "red";
        });
    }
    function showColoniesDom(data){
        msj.style.display="none";
        let lengthColonies = data.colonies.length;
        console.log(lengthColonies)
        if (lengthColonies < 2){
            // console.log(data)
            colonies.value = data.colonies[0];
        }else{
            colonies.style.display = "none"
            select.style.display="flex"
            select.classList.add("input")
            const boxInfo = document.querySelector("#coloniesBox");
            boxInfo.appendChild(select);
            let option = document.createElement("option");
            option.innerHTML = "Escoge una colonia";
            select.appendChild(option);
            for (let i = 0; i < lengthColonies; i++){
                let option = document.createElement("option");
                option.setAttribute("value",i);
                option.innerHTML = data.colonies[i];
                select.appendChild(option);
            }
        }
        const buttonSubmit = document.querySelector("#submit");
        let vacio = 0;
        buttonSubmit.addEventListener("click",(e)=>{
            const input = document.querySelectorAll(".input");
            vacio = 0;
            input.forEach(element => {
                if (element.value == ""){
                    console.log(element)
                    vacio = vacio + 1;
                }
            });
            console.log(vacio)
            const coloniesSelect = document.querySelector("#coloniesSelect");
            console.log(coloniesSelect.value)
            if ((coloniesSelect.value == 'Escoge una colonia') || (vacio > 1)){
                e.preventDefault()
                msj.style.display="block";
                msj.innerHTML = "Favor, llenar todos los datos solicitados";
                msj.style.color= "red";
            }
            else{
                e.stopImmediatePropagation()
                e.preventDefault()
                cargar();
            }
        });
    }
    function cargar(){
        const form = new FormData(document.getElementById('form'))
        console.log(form)
        // fetch('https://blackisp.herokuapp.com/contact',
        //     {
        //         method: 'POST',
        //         body: form
        //     }
        // )
        // .then(result => {
        // console.log('Success:', result);
            msj.style.display="block";
            msj.innerHTML = "Sus datos han sido guardados de manera exitosa";
            msj.style.color= "green";
        // })
        // .catch(error => {
        // console.error('Error:', error);
        // });
    }
});
function ShowSelected(){
    var combo = document.getElementById("coloniesSelect");
    var selected = combo.options[combo.selectedIndex].text;
    colonies.value = selected;
}