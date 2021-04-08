let apiData = [];

fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then((result) => {
        console.log(result);
        apiData = result;
        createHtml(apiData);
    }).catch((err) => {
        alert(err);
        console.log(err);
    });

function createHtml(apiData) {
    for (var i = 0; i < apiData.length; i++) {
        var col = createElement("div", "col-lg-4 col-sm-12 ");
        var card = createElement('div', "card mt-3");
        card.setAttribute('width', '18rem');
        card.setAttribute("style", "background: linear-gradient(to right, rgb(208, 209, 157) 10%, gray 90%);");
        var cardHeader = createElement('div', 'card-header text-center');
        cardHeader.innerText = apiData[i].name;
        cardHeader.setAttribute("style", "background-color: black; color: white;");
        var img = createElement("img", "card-img-top mt-4");
        img.setAttribute('width', 500);
        img.setAttribute('height', 200)
        img.setAttribute("src", apiData[i].flag);
        img.setAttribute('alt', "no img ");
        var cardbody = createElement("div", "card-body");
        cardbody.setAttribute('style', 'color: white');
        var cardtext = createElement("p", "card-text text-center");
        cardtext.innerHTML = `capital:  ${apiData[i].capital} <br> Region:  ${apiData[i].region} <br> Country Code: ${apiData[i].alpha3Code} <br> Latitude: ${apiData[i].latlng[0]} <br> Longitude: ${apiData[i].latlng[1]}`
        var buttonDiv = createElement("div", "text-center");
        var a = createElement("button", "btn text-right");
        a.setAttribute('style', 'border: 1px solid white; color: white')
        a.innerText = "Click for Weather";

        function somefun(data) {
            a.addEventListener('click', function() {
                let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data.latlng[0] + '&lon=' + data.latlng[1] + '&appid=cd0a24d4ba161856b95cf0b53a6086e1';
                fetch(url)
                    .then((response) => response.json())
                    .then(result => {
                        console.log(result);
                        alert(`Weather Details for latidue: ${data.latlng[0]} longitude: ${data.latlng[1]} \n Temperature: ${result.main.temp} \n Humidity: ${result.main.humidity} \n Pressure: ${result.main.pressure}`)
                    }).catch(err => console.log(err))
            })
        }
        somefun(apiData[i])
        buttonDiv.append(a);
        cardbody.append(cardtext, buttonDiv);
        card.append(cardHeader, img, cardbody);
        col.append(card);

        document.getElementById('restCountries').append(col);
    }
}



function createElement(elementName, elementClass = "", elementId = "") {
    let elem = document.createElement(elementName);
    elem.setAttribute("class", elementClass);
    elem.setAttribute("id", elementId);
    return elem;

}