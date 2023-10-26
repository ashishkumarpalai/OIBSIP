
const convertButton = document.getElementById("convert");
convertButton.addEventListener("click", function () {
    const temperatureInput = parseFloat(document.getElementById("temperature").value);
    const unitSelect = document.getElementById("unit");
    const selectedUnit = unitSelect.options[unitSelect.selectedIndex].value;
    let convertedTemperature;
    if (selectedUnit === "celsius") {
        convertedTemperature = (temperatureInput - 32) * 5 / 9;
    } else if (selectedUnit === "fahrenheit") {
        convertedTemperature = (temperatureInput * 9 / 5) + 32;
    } else if (selectedUnit === "kelvin") {
        convertedTemperature = temperatureInput + 273.15;
    }
    document.getElementById("result").textContent = `Converted temperature: ${convertedTemperature.toFixed(2)} ${selectedUnit}`;
});
