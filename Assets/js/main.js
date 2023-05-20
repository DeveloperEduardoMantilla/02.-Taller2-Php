let myFormulario = document.querySelector("#myFormularioEjer1");

let myHeaders = new Headers({"Content-Type": "application/json"});

let config = {
    headers: myHeaders, 
};

function alerta(option){
    if(option){
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'success',
            title: 'Consumo de api exitoso',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            backdrop: false
        });
    }else{
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'error',
            title: 'Error, revise la consola',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            backdrop: false
        });
    }
}
/*EJERCICIO NUMERO 1*/
myFormulario.addEventListener("submit", async(e)=>{
    e.preventDefault();
    try{
        config.method = "POST";
        let data = Object.fromEntries(new FormData(e.target));
        config.body = JSON.stringify(data);
        let res = await (await fetch("Apis/ejer1.php", config)).text();
        let dataRes = JSON.parse(res);
        let plantilla =`
        <table>
            <thead>
                ${dataRes.promedio>3.9? `<tr class="clasificacion-aprobo"> <th colspan="4">Aprobo</th></tr>` : `<tr class="clasificacion-reprobo"> <th colspan="4">Reprobo</th></tr>`}  
            <tr>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota 3</th>
                <th>Promedio</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>'${dataRes.notas.nota}'</td>
                <td>'${dataRes.notas.nota2}'</td>
                <td>'${dataRes.notas.nota3}'</td>
                <td>'${dataRes.promedio}'</td>
            </tr>
            </tbody>
        </table>`;
        alerta(true);
        document.querySelector("#resultEjer1").innerHTML = plantilla;
    }catch(e){
        console.log("Error => "+e)
        alerta(false);
    }
})


/* EJERCICIO NUMERO 2*/
let myEjer2 = document.querySelector("#myFormularioEjer2");

myEjer2.addEventListener("submit", async(e)=>{
    e.preventDefault();
    try{
        let data = Object.fromEntries(new FormData(e.target));
        config.method ="POST";
        config.body = JSON.stringify(data);
        let result = await (await fetch("Apis/ejer2.php", config)).text();
        result=JSON.parse(result);
        let plantilla = 
        `<div class="par-impar">
            <p>${result.resultado}</p>
        </div>`;
        document.querySelector("#resultEjer2").innerHTML = plantilla;
        alerta(true);
    }catch(e){
        console.log("Error => "+e)
        alerta(false);
    }
    
})