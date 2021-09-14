/**
 * @author Airdik <eshrestha961@gmail.com>
 * Github: https://github.com/Airdik
 */

var console = chrome.extension.getBackgroundPage().console;
const home = document.getElementById('home');
const downloadSingle = document.getElementById('downloadSingle');
const shareNote = document.getElementById('shareNote');
const settings = document.getElementById('settings');
const noteArea = document.getElementById('noteArea');
const titleBar = document.getElementById('title');
const Body = document.getElementById('body-div');

var currKey = '';


const fnOnLoad = () => {

    ////  Uncomment if want to save note ever x seconds instead of every time user presses a key
    // const interval = setInterval(function () {
    //     fnSaveNote();
    // }, 500);

    // TITLE BAR COLOR
    chrome.storage.local.get('xTitleBar', function (data) {
        if (typeof data.xTitleBar === 'undefined') { // If there is no value
            chrome.storage.local.set({'xTitleBar': '#ffaca9'}, () => { })
        } else { // if not set then set it 
            titleBar.style.backgroundColor = `${data.xTitleBar}`;
        }
    });

    //Background color
    chrome.storage.local.get('xBody', function (data) {
        if (typeof data.xBody === 'undefined') { // If there is no value
            chrome.storage.local.set({ 'xBody': '#fff6c3' }, () => { })
        } else { // If there is a key with a value
            Body.style.backgroundColor = `${data.xBody}`;
            noteArea.style.backgroundColor = `${data.xBody}`;
            if (data.xBody === '#363636') { noteArea.style.color = '#fff'; } // Do this for all dark themes
        }
    });

    //Font Size
    chrome.storage.local.get('xFontSize', function (data) {
        if (typeof data.xFontSize === 'undefined') { // If there is no value
            console.log('No Font Size found');
            chrome.storage.local.set({ 'xFontSize': '14px' }, () => { });
            chrome.storage.local.get('xFontSize', function (data) {
                noteArea.style.fontSize = `${data.xFontSize}`;
            });
            
        } else { // If there is a key with a value
            console.log('Font size set to:', data.xFontSize);
            noteArea.style.fontSize = `${data.xFontSize}`;
        }
    });

    //Font Bold
    chrome.storage.local.get('xFontBold', function (data) {
        if (typeof data.xFontBold === 'undefined') { // If there is no value
            console.log('No Font weight found');
            chrome.storage.local.set({ 'xFontBold': '0' }, () => { });
            chrome.storage.local.get('xFontBold', function (data) {
                noteArea.style.fontWeight = `${data.xFontBold}`;
                console.log('Setting font weight:', data.xFontBold);
            });
        } else { // If there is a key with a value
            console.log('Font weight set to:', data.xFontBold);
            noteArea.style.fontWeight = `${data.xFontBold}`;

        }
    });

    chrome.storage.local.get("ACTIVEID", function (items) {
        let allKeys = Object.entries(items);

        if (allKeys.length > 0) { //If there is an activeKey
            // This would be a note clicked on from the home page or if user clicks a different tab then comes back
            console.log('Active key found.');
            console.log('Active key:', allKeys[0][1]);
            // Setting currKey as the active key
            currKey = allKeys[0][1];

            //Setting the note area as the value that is saved with the key
            chrome.storage.local.get([currKey], function (items) {
                let allKeys = Object.entries(items);
                console.log('actualNote:', allKeys[0][1]);
                let note = allKeys[0][1];
                noteArea.value = note;
            });

            // Clearing the ACTIVEID after currKey has been set
            chrome.storage.local.remove("ACTIVEID", function () {
                console.log('ACTIVEID has been reset');
            });
        } else { 
            console.log('Creating new note')
        }
    });
    noteArea.focus(); // Focusing on to the note area automatically, so user can start writing right away instead of having to click on the note area first
}

const fnSwitchPage = (evt) => {

    //fnSaveNote(); no need to save since now the note is saved on each key press
    if (evt.target.id === 'home') {
        
        window.location.pathname = 'home.html';
    } else if (evt.target.id === 'settings') {
        window.location.pathname = 'settings.html';
    }
}

const fnSaveNote = () => {

    if (currKey === '') { //Meaning we are saving a new note
        var noteIncNum = 0;

        chrome.storage.local.get("NotesCount", function (items) {
            let allKeys = Object.entries(items);

            if (allKeys.length > 0) { // If an existing NotesCount Key exists
                chrome.storage.local.get('NotesCount', (items) => {
                    let allKeys = Object.entries(items);

                    let note = `${noteArea.value}`;
                    
                    if (!(note.trim() === '')) {
                        noteIncNum = (parseInt(allKeys[0][1]) + 1);
                        chrome.storage.local.set({ 'NotesCount': [noteIncNum] }, () => { });
                        chrome.storage.local.set({ [noteIncNum]: note }, function () {

                            currKey = noteIncNum;
                        
                            console.log('Note saved');
                        });
                    } else {
                        console.log('There is nothing to save')
                    }
                });

            } else { // If the NotesCount Key doesn't exist'
                let note = `${noteArea.value}`;
            
                // note = note.replace(/\s/gm, '`');
                // note = note.replace(/\n/gm, '~');

                if (!(note.trim() === '')) {
                    console.log('No previous notes found')
                    chrome.storage.local.set({ 'NotesCount': 1 }, () => { });

                    chrome.storage.local.set({ 1: note }, function () {
                        currKey = 1;
                    });
                } else {
                    console.log('Nothing to save')
                }
            }

        });

    } else {
        let note = `${noteArea.value}`;

        if (!(note.trim() === '')) {
            chrome.storage.local.set({ [currKey]: note }, function () {
            });
        } else {
            console.log('Nothing to save');
            chrome.storage.local.remove(currKey, function () {
                console.log('Deleted empty note');
            });
        }
    }
}

const fnDownloadSingle = () => {
    console.log('Download Note');
    let note = `${noteArea.value}`;
    if (!(note.trim() === '')) {
        let textToBLOB = new Blob([note], { type: 'text/plain' });
        let sFileName = `Note${currKey}.txt`;	   // The file to save the data.

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
    } else {
        console.log('Not saved, note is empty');
    }
}

const fnShareNote = () => {
    let note = `${noteArea.value}`;

    if (!(note.trim() === '')) {
        window.location.href = encodeURI(
`mailto:${""}?subject=${""}&body=
${note}



Made with NoteIT`);
    }
}
// When the tab key is pressed
const fnKeyPressed = (evt) => {
    if (evt.keyCode == "9") {
        noteArea.value += "\t";
    } else if (evt.keyCode == "8") {
        fnSaveNote();
    }
}

fnOnLoad();

home.addEventListener('click', fnSwitchPage)
downloadSingle.addEventListener('click', fnDownloadSingle);
shareNote.addEventListener('click', fnShareNote);
settings.addEventListener('click', fnSwitchPage);
noteArea.addEventListener('keydown', fnKeyPressed, false);
noteArea.addEventListener('input', fnSaveNote); // Saving note on every key press
