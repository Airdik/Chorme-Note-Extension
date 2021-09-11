/**
 * @author Erik Shrestha <eshrestha961@gmail.com>
 */
const donateButton = document.getElementById('donateButton');

donateButton.addEventListener('click', () => {
    console.log('donate button clicked');
    chrome.tabs.executeScript({ code: 'window.open("https://www.paypal.com/donate?business=KYMYPSSPCAMNU&no_recurring=0&item_name=Gotta+pay+off+some+loans+yo%21&currency_code=USD")' }, () => { });
})