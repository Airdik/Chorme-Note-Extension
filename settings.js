/**
 * @author Airdik <eshrestha961@gmail.com>
 * Github: https://github.com/Airdik
 */

const downloadAll = document.getElementById('downloadAll');
const titleBar = document.getElementById('title');
const Body = document.getElementById('body');
const allSettingsArea = document.getElementById('allSettingsArea');
const settingsTitle = document.getElementsByClassName('settings-title');
const noteHolder = document.getElementsByClassName('note-holder');
const numOFStatic = 5;
const btnResetYes = document.getElementById('btnResetYes');
const btnResetNo = document.getElementById('btnResetNo');
const hardResetAlert = document.getElementById('hardResetAlert');

const fnOnLoad = () => {

    // TITLE BAR COLOR
    chrome.storage.sync.get('xTitleBar', function (data) {
        if (typeof data.xTitleBar === 'undefined') { // If there is no value
            chrome.storage.sync.set({ 'xTitleBar': '#ffaca9' }, () => { })
        } else { // if not set then set it 
            console.log('xTitleBar is already set');
            console.log('xTitleBar:', data.xTitleBar);
            titleBar.style.backgroundColor = `${data.xTitleBar}`;
        }

        for (var i = 0; i < noteHolder.length; i++) {
            noteHolder[i].style.color = `${data.xTitleBar}`;
        }
    });

    //Background color
    chrome.storage.sync.get('xBody', function (data) {
        if (typeof data.xBody === 'undefined') { // If there is no value
            chrome.storage.sync.set({ 'xBody': '#fff6c3' }, () => { })

        } else { // If there is a key with a value
            console.log('')
            Body.style.backgroundColor = `${data.xBody}`;
            allSettingsArea.style.backgroundColor = `${data.xBody}`;

            if (data.xBody != '#fff6c3') { // Add and checks for really light background colors
                for (var i = 0; i < settingsTitle.length; i++) {

                    settingsTitle[i].style.color = '#fff';
                }
            }
        }
    });
}

const fnDownloadAll = () => {
    var fullNotesToDownload = '';
    
    chrome.storage.sync.get(null, function (items) {
        // Stores an array of all of the keys/value pairs
        var allKeys = Object.entries(items);
        console.log('# of all notes:', allKeys.length);

        if (allKeys.length > numOFStatic) { // check not necessary but im too lazy to remove this
            allKeys.forEach(function (row) {
                if (row[0] != 'NotesCount' && row[0] != 'ACTIVEID' && !row[0].startsWith('x')) {
                    fullNotesToDownload += `#################### NoteIT Entry ${row[0]} ####################\n${row[1]}\n\n\n\n\n`
                }
            });

            let textToBLOB = new Blob([fullNotesToDownload], { type: 'text/plain' });
            let sFileName = `NoteIT_Collection.txt`;	   // The file to save the data.
            let newLink = document.createElement("a");
            newLink.download = sFileName;

            if (window.webkitURL != null) {
                newLink.href = window.webkitURL.createObjectURL(textToBLOB);
            }
            else {
                newLink.href = window.URL.createObjectURL(textToBLOB);
                newLink.style.display = "none";
                document.body.appendChild(newLink);
            }
            newLink.click();

            console.log(fullNotesToDownload);
        } else {
            console.log('Nothing to download.')
        }
    });
}

//THEME CLICK
document.querySelectorAll('.theme').forEach(item => {
    item.addEventListener('click', evt => {
        //handle click
        let id = evt.target.id;
        console.log(evt.target.id);
        if (id === 'charcoal') {
            chrome.storage.sync.set({ 'xTitleBar': '#000' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#363636' }, () => { });
        } else if (id === 'cloudySky') {
            chrome.storage.sync.set({ 'xTitleBar': '#598BAF' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#95C8D8' }, () => { });
        } else if (id === 'lavender') {
            chrome.storage.sync.set({ 'xTitleBar': '#C9A0DC' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#E6E6FA' }, () => { });
        } else if (id === 'astilbe') {
            chrome.storage.sync.set({ 'xTitleBar': '#FF69B4' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#FBAED2' }, () => { });
        } else if (id === 'copper') {
            chrome.storage.sync.set({ 'xTitleBar': '#CB6D51' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#DA8A67' }, () => { });

        } else if (id === 'desert') {
            chrome.storage.sync.set({ 'xTitleBar': '#C19A6B' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#EDC9AF' }, () => { });

        } else if (id === 'ocean') {
            chrome.storage.sync.set({ 'xTitleBar': '#077B8A' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#2A9DF4' }, () => { });

        } else if (id === 'mint') {
            chrome.storage.sync.set({ 'xTitleBar': '#5AA17F' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#92DDc8' }, () => { });

        } else if (id === 'bee') {
            chrome.storage.sync.set({ 'xTitleBar': '#000' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#F3CA20' }, () => { });

        } else if (id === 'colorDefault') {
            console.log('default color loaded')
            chrome.storage.sync.set({ 'xTitleBar': '#ffaca9' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#fff6c3' }, () => { })
        }
        location.reload();
        return false;
    });
})

//FONT CLICK
document.querySelectorAll('.font').forEach(item => {
    item.addEventListener('click', evt => {
        //handle click\
        let id = evt.target.id;
        if (id === 'fontBig') {
            chrome.storage.sync.set({ 'xFontSize': '16px' }, () => { });
        } else if (id === 'fontBigger') {
            chrome.storage.sync.set({ 'xFontSize': '18px' }, () => { });
        } else if (id === 'fontDefault') {
            chrome.storage.sync.set({ 'xFontSize': '14px' }, () => { });
        }
    })
})

//BOLD CLICK
document.querySelectorAll('.bold').forEach(item => {
    item.addEventListener('click', evt => {
        //handle click
        let id = evt.target.id;
        console.log(id == 'fontBolder');
        if (id === 'fontBold') {
            chrome.storage.sync.set({ 'xFontBold': 700 }, () => { });
        } else if (id === 'fontBolder') {
            chrome.storage.sync.set({ 'xFontBold': 900 }, () => { });

        } else if (id === 'fontBoldDefault') {
            chrome.storage.sync.set({ 'xFontBold': 0 }, () => { });
        }
        console.log('IN BOLD!', evt.target.id);
    });
});


//RESET CLICK
document.querySelectorAll('.reset').forEach(item => {
    item.addEventListener('click', evt => {
        //handle click
        let id = evt.target.id;

        console.log('Reset...')
        if (id === 'resetHard') {
            hardResetAlert.style.visibility = 'visible';

        }
        else
        {
            //Theme reset
            chrome.storage.sync.set({ 'xTitleBar': '#ffaca9' }, () => { });
            chrome.storage.sync.set({ 'xBody': '#fff6c3' }, () => { });
            //Font size reset
            chrome.storage.sync.set({ 'xFontSize': '14px' }, () => { });
            //Font weight reset
            chrome.storage.sync.set({ 'xFontBold': 0 }, () => { });
            location.reload();
            return false;

        }
    });
})

fnOnLoad();

downloadAll.addEventListener('click', fnDownloadAll);
btnResetYes.addEventListener('click', ()=> {
    chrome.storage.sync.clear(() => { console.log('Hard reset...') })
    //Theme reset
    chrome.storage.sync.set({ 'xTitleBar': '#ffaca9' }, () => { });
    chrome.storage.sync.set({ 'xBody': '#fff6c3' }, () => { });
    //Font size reset
    chrome.storage.sync.set({ 'xFontSize': '14px' }, () => { });
    //Font weight reset
    chrome.storage.sync.set({ 'xFontBold': 0 }, () => { });
    hardResetAlert.style.visibility = 'hidden';
    location.reload();
})
btnResetNo.addEventListener('click', () => { 
    hardResetAlert.style.visibility = 'hidden';
})