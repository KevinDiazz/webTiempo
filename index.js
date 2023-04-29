let url = "https://weather-proxy.freecodecamp.rocks/api/current?";
let infoDiv = document.getElementsByTagName("div");
let imagen = document.createElement("img");
infoDiv[4].appendChild(imagen);

function latitud() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position);
    });
  });
}

let miPromesa = latitud();
miPromesa
  .then(
    (position) =>
      new Promise((resolve, reject) => {
        altura = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        resolve(altura);
      })
  )
  .then(
    (x) =>
      new Promise((resolve, reject) => {
        async function tiempo() {
          const ubi = await fetch(url + "lat=" + x.lat + "&" + "lon=" + x.long);
          let data = await ubi.json();
          return data;
        }
        resolve(tiempo());
      })
  )
  .then(
    (x) =>
      new Promise((resolve, reject) => {
        infoDiv[1].innerHTML = x.name;
        infoDiv[2].innerHTML = x.main.temp + " " + "ºC";
        infoDiv[3].innerHTML = x.weather[0].main;
        imagen.setAttribute("src", x.weather[0].icon);
        resolve(console.log("esta resuelta"));
      })
  );

console.log(miPromesa);
