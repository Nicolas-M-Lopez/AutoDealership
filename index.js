const obtenerStock = async () => {  /* Obtener Stock */
  try{  
  const response = await fetch('./src/stock.json');
  const data = await response.json();
  return data;
  }  catch (error){
    console.log('Hubo un error', error);
  };
};

const home =  async () => {
const autos = await obtenerStock();
const contenedorHome = document.getElementById('contenedorHome'); /* DOM para el home */
autos.forEach((auto) => {
    const divHome = document.createElement('div');
    divHome.classList.add('col');
    const desestructuracionParametros = (item) => {
      const {imagen, marca, modelo, precio} = item;
      divHome.innerHTML += `   
      <div class="card">
          <img src=${imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${marca} ${modelo}</h5>
          <p class="card-text">$${precio}</p>
        </div>
      </div>
        `;
    contenedorHome.appendChild(divHome);
    };
    desestructuracionParametros(auto);
})
}
home();

function limpiar (){  /* Funcion para limpiar el contenido de los contenedores */
  contenedorFiltro.innerHTML = "";
  contenedorHome.innerHTML = "";
}


let rangeInput = document.querySelectorAll(".range-input input"); /* Filtro de precio con slider e input */
let priceInput = document.querySelectorAll(".price-input input");
let range = document.querySelector(".slider .progress");
let priceGap = 30000;

priceInput.forEach(input =>{  /* Inputs */
    input.addEventListener("keyup", async e =>{
        if(e.keyCode === 13){
        limpiar();
        let minPrice = parseInt(priceInput[0].value);
        let maxPrice = parseInt(priceInput[1].value);
        const contenedorFiltro = document.getElementById('contenedorFiltro');
        const autos = await obtenerStock();
        const filtrarPrecio = autos.filter((elemento) => elemento.precio <= maxPrice && elemento.precio >= minPrice);
        filtrarPrecio.forEach(auto => {
            const divFiltro = document.createElement('div');
            divFiltro.classList.add('col');
          
            divFiltro.innerHTML += `   
            <div class="card">
                <img src=${auto.imagen} class="card-img-top" alt="autos">
              <div class="card-body">
                <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
                <p class="card-text">$${auto.precio}</p>
              </div>
            </div>
              `;
          contenedorFiltro.appendChild(divFiltro);
        })
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    }});
});

rangeInput.forEach(input =>{  /* Slider */
    
    input.addEventListener("mouseup", async e =>{
        limpiar();
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);
        const contenedorFiltro = document.getElementById('contenedorFiltro');
        const autos = await obtenerStock();
        const filtrarPrecio = autos.filter((elemento) => elemento.precio <= maxVal && elemento.precio >= minVal);
        filtrarPrecio.forEach(auto => {
            const divFiltro = document.createElement('div');
            divFiltro.classList.add('col');
        
            divFiltro.innerHTML += `   
            <div class="card">
                <img src=${auto.imagen} class="card-img-top" alt="autos">
              <div class="card-body">
                <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
                <p class="card-text">$${auto.precio}</p>
              </div>
            </div>
              `;
          contenedorFiltro.appendChild(divFiltro);
        })
        if((maxVal - minVal) < priceGap){
          e.target.className === 'range-min' ? rangeInput[0].value = maxVal - priceGap : rangeInput[1].value = minVal + priceGap; 
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

const marcaMercedes = document.querySelector('.mercedes');  /* Filtro de marcas */
const marcaBMW = document.querySelector('.bmw');
const marcaAudi = document.querySelector('.audi');
const marcaLexus = document.querySelector('.lexus');
const marcaFerrari = document.querySelector('.ferrari');
const marcaBentley = document.querySelector('.bentley');
const marcaMcLaren = document.querySelector('.mclaren');
const marcaRolls = document.querySelector('.rollsroyce')

marcaMercedes.addEventListener('click', async () =>{
    /* contenedorHome.classList.toggle('display'); */
    limpiar();
    const contenedorFiltro = document.getElementById('contenedorFiltro');
    const autos = await obtenerStock();
    const filtrarMarcaMercedes = autos.filter((elemento) => elemento.marca === 'MERCEDES BENZ');
    filtrarMarcaMercedes.forEach(auto => {
        const divFiltro = document.createElement('div');
        divFiltro.classList.add('col');
    
        divFiltro.innerHTML += `   
        <div class="card">
            <img src=${auto.imagen} class="card-img-top" alt="autos">
          <div class="card-body">
            <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
            <p class="card-text">$${auto.precio}</p>
          </div>
        </div>
          `;
      contenedorFiltro.appendChild(divFiltro);
    })
    Swal.fire({
      title: 'Mercedes Benz',
      confirmButtonText: 'Okey',
      imageUrl:'./public/imagenes/logoMercedes.jpg'
    })
})

marcaAudi.addEventListener('click', async () =>{
    limpiar();
    const contenedorFiltro = document.getElementById('contenedorFiltro');
    const autos = await obtenerStock();
    const filtrarMarcaAudi = autos.filter((elemento) => elemento.marca === 'AUDI');
    filtrarMarcaAudi.forEach(auto => {
        const divFiltro = document.createElement('div');
        divFiltro.classList.add('col');
    
        divFiltro.innerHTML += `   
        <div class="card">
            <img src=${auto.imagen} class="card-img-top" alt="autos">
          <div class="card-body">
            <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
            <p class="card-text">$${auto.precio}</p>
          </div>
        </div>
          `;
      contenedorFiltro.appendChild(divFiltro);
    })
    Swal.fire({
      title: 'Audi',
      confirmButtonText: 'Okey',
      imageUrl:'./public/imagenes/logoAudi.jpg'
    })
})

marcaBMW.addEventListener('click', async () =>{
    limpiar();
    const contenedorFiltro = document.getElementById('contenedorFiltro');
    const autos = await obtenerStock();
    const filtrarMarcaBMW = autos.filter((elemento) => elemento.marca === 'BMW');
    filtrarMarcaBMW.forEach(auto => {
        const divFiltro = document.createElement('div');
        divFiltro.classList.add('col');
    
        divFiltro.innerHTML += `   
        <div class="card">
            <img src=${auto.imagen} class="card-img-top" alt="autos">
          <div class="card-body">
            <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
            <p class="card-text">$${auto.precio}</p>
          </div>
        </div>
          `;
      contenedorFiltro.appendChild(divFiltro);
    })
    Swal.fire({
      title: 'BMW',
      confirmButtonText: 'Okey',
      imageUrl:'./public/imagenes/logoBMW.jpg'
    })
})

marcaLexus.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const filtrarMarcaLexus = autos.filter((elemento) => elemento.marca === 'LEXUS');
  filtrarMarcaLexus.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
  Swal.fire({
    title: 'Lexus',
    confirmButtonText: 'Okey',
    imageUrl:'./public/imagenes/logoLexus.jpg'
  })
})

marcaFerrari.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const filtrarMarcaFerrari = autos.filter((elemento) => elemento.marca === 'FERRARI');
  filtrarMarcaFerrari.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
  Swal.fire({
    title: 'Ferrari',
    confirmButtonText: 'Okey',
    imageUrl:'./public/imagenes/logoFerrari.jpg'
  })
})

marcaBentley.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const filtrarMarcaBentley = autos.filter((elemento) => elemento.marca === 'BENTLEY');
  filtrarMarcaBentley.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
  Swal.fire({
    title: 'Bentley',
    confirmButtonText: 'Okey',
    imageUrl:'./public/imagenes/logoBentley.jpg'
  })
})

marcaMcLaren.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const filtrarMarcaMclaren = autos.filter((elemento) => elemento.marca === 'MCLAREN');
  filtrarMarcaMclaren.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
  Swal.fire({
    title: 'McLaren',
    confirmButtonText: 'Okey',
    imageUrl:'./public/imagenes/logoMclaren.jpg'
  })
})

marcaRolls.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const filtrarMarcaRolls = autos.filter((elemento) => elemento.marca === 'ROLLS ROYCE');
  filtrarMarcaRolls.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
  Swal.fire({
    title: 'Rolls Royce',
    confirmButtonText: 'Okey',
    imageUrl:'./public/imagenes/logoRolls.jpg'
  })
})

const asc = document.querySelector('.ascendente');  /* Ordernar contenido */
asc.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const ordenarMenor = autos.sort((a,b) => {return a.precio - b.precio;});
  ordenarMenor.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
})

const dsc = document.querySelector('.descendente')
dsc.addEventListener('click', async () =>{
  limpiar();
  const contenedorFiltro = document.getElementById('contenedorFiltro');
  const autos = await obtenerStock();
  const ordenarMayor = autos.sort((a,b) => {return b.precio - a.precio;});
  ordenarMayor.forEach(auto => {
      const divFiltro = document.createElement('div');
      divFiltro.classList.add('col');
  
      divFiltro.innerHTML += `   
      <div class="card">
          <img src=${auto.imagen} class="card-img-top" alt="autos">
        <div class="card-body">
          <h5 class="card-title">${auto.marca} ${auto.modelo}</h5>
          <p class="card-text">$${auto.precio}</p>
        </div>
      </div>
        `;
    contenedorFiltro.appendChild(divFiltro);
  })
})