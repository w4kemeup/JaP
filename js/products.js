const AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(AUTOS)
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data)

        for (let auto of data.products) {
            let htmlContentToAppend = "";
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + auto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4 style="text-align:left">`+ auto.name + " " + "-" + " " + auto.currency + " " + auto.cost + `</h4> 
                        <p> `+ auto.description + `</p> 
                        </div>
                        <small class="text-muted">` + auto.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
            document.getElementById("cat-list-container").innerHTML += htmlContentToAppend;
        }
    })    