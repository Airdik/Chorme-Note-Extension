/**
 * @author Erik Shrestha <eshrestha961@gmail.com>
 */
const donateButton = document.getElementById('donateButton');

donateButton.addEventListener('click', () => {
    console.log('donate button clicked');
    chrome.tabs.executeScript({ code: 'window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=3LM36YCA22G9U&item_name=I+gotta+pay+off+some+loans+yo%21&currency_code=USD")' }, () => {});
})