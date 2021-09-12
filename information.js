/**
 * @author Airdik <eshrestha961@gmail.com>
 * Github: https://github.com/Airdik
 */
const donateButton = document.getElementById('donateButton');

donateButton.addEventListener('click', () => {
    chrome.tabs.executeScript({ code: 'window.open("https://www.paypal.com/donate?business=KYMYPSSPCAMNU&no_recurring=0&item_name=Gotta+pay+off+some+loans+yo%21&currency_code=USD", "_blank")' }, () => { });
})