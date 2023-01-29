/**
 * @author Airdik <eshrestha961@gmail.com>
 * Github: https://github.com/Airdik
 */
const donateButton = document.getElementById('donateButton');

donateButton.addEventListener('click', () => {
    chrome.tabs.create({"url":"https://www.buymeacoffee.com/Airdik", "pinned":true},()=>{})
})