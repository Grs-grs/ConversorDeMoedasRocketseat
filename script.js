const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const Regex = /\D+/g
const footer = document.querySelector("footer");
const getValueCurrency = async(currency) =>{
const description = document.getElementById("description")
const result = document.getElementById("result")

switch(currency){
    case "USD":
        try{
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
        const data = await response.json();
        dataUSD = data.USDBRL.bid;
        return dataUSD;
        }catch(error){
            console.error("Error fetching USD data: ", error);
        }
    
    case "GBP":
        try{
            const response = await fetch("https://economia.awesomeapi.com.br/json/last/GBP-BRL")
            const data = await response.json();
            dataGBP = data.GBPBRL.bid;
            return dataGBP;
            }catch(error){
                console.error("Error fetching GBP data: ", error);
            }

    case "EUR":
        try{
            const response = await fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL")
            const data = await response.json();
            dataEUR = data.EURBRL.bid;
            return dataEUR;
            }catch(error){
                console.error("Error fetching EUR data: ", error);
            }
}   

}


amount.addEventListener("input", ()=>{
    console.log(amount.value)
    amount.value = amount.value.replace(Regex, "")
})




form.onsubmit = async (event) =>{
    event.preventDefault()
    console.log(currency.value)
        switch(currency.value){
            case "USD":
                usd = await getValueCurrency("USD")
                convertCurrency(amount.value, usd, "US$");
                break
            case "EUR":
                eur = await getValueCurrency("EUR")
                convertCurrency(amount.value, eur, "€")
                break
            case "GBP":
                gbp = await getValueCurrency("GBP")
                convertCurrency(amount.value, gbp, "£")
                break
            }   

}


const convertCurrency =(amount, price, symbol) =>{
    try{
        description.textContent = `${symbol} 1 = ${price}`
        // result formatted
        resultado = (price*amount).toFixed(2)

        //DOM Handling
        result.textContent = `${symbol} ${resultado}`
        footer.classList.add("show-result")
        }
    
    catch (error){
        footer.classList.remove("show-result")
        console.log(error)
        alert("Fez o L irmão, servidor foi de vasco")
    }

}