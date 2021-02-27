const downloadAll = document.getElementById('downloadAll');
const deleteAll = document.getElementById('deleteAll');
const allNotesArea = document.getElementById('allNotesArea');
const numOFStatic = 5; // num of things in array to not count such as default keys to determine if the array is actually empty 
const titleBar = document.getElementById('title');
const Body = document.getElementById('body');
const btnResetYes = document.getElementById('btnResetYes');
const btnResetNo = document.getElementById('btnResetNo');
const hardResetAlert = document.getElementById('hardResetAlert');

const fnOnLoad = () => {
    //Background color
    chrome.storage.local.get('xBody', function (data) {
        if (typeof data.xBody === 'undefined') { // If there is no value

        } else { // If there is a key with a value
            Body.style.backgroundColor = `${data.xBody}`;
            allNotesArea.style.backgroundColor = `${data.xBody}`;
        }
    });
}

const fnDeleteAll = () => {
    hardResetAlert.style.visibility = 'visible';

}

const fnLoadNotes = () => {
    chrome.storage.local.get(null, function (items) {
        // Stores an array of all of the keys/value pairs
        var allKeys = Object.entries(items);

        allKeys.forEach(function (row) {
            if (row[0] != 'NotesCount' && !(row[0].startsWith('x'))) {

                let noteHolder = document.createElement('div');
                noteHolder.id = row[0];
                noteHolder.classList = 'note-holder';

                let noteLink = document.createElement('a');
                noteLink.text = `${row[1].substring(0, 18)}. . .`;
                noteLink.id = row[0];
                noteLink.classList = 'homeNote';

                let noteDelete = document.createElement('div');
                noteDelete.id = row[0];
                noteDelete.classList = 'note-delete ';
                noteDelete.innerText = 'X';

                noteLink.addEventListener('click', (evt) => {
                    //Handle Click
                    fnHomeNoteClick(evt);
                });
               
                noteDelete.addEventListener('click', (evt) => {
                    fnHomeNoteClick(evt);
                });

                noteHolder.appendChild(noteLink);
                noteHolder.appendChild(noteDelete);
                allNotesArea.appendChild(noteHolder);
            }
        });
        let noteHolder = document.getElementsByClassName('homeNote');

        // TITLE BAR COLOR
        chrome.storage.local.get('xTitleBar', function (data) {
            if (typeof data.xTitleBar === 'undefined') { // If there is no value

            } else { // if not set then set it 
                console.log('xTitleBar is already set');
                console.log('xTitleBar:', data.xTitleBar);
                titleBar.style.backgroundColor = `${data.xTitleBar}`;
            }
            for (var i = 0; i < noteHolder.length; i++) {
                noteHolder[i].style.color = `${data.xTitleBar}`;
            }

        });
    });
}

const fnHomeNoteClick = (evt) => {
    if (evt.target.classList[0] === 'homeNote') {
        //Handle editing the selected note
        chrome.storage.local.set({ "ACTIVEID": evt.target.id }, function () {
            console.log('Clicked edit note');
            window.location.pathname = 'popup.html';
        });
    } else if (evt.target.classList[0] === 'note-delete') {
        // Delete the selected note
        chrome.storage.local.remove(evt.target.id, function () {
            console.log('Note deleted:', evt.target.id);
            window.location.pathname = 'home.html';
        });
    }
}

const fnDownloadAll = () => {
    var fullNotesToDownload = '';

    chrome.storage.local.get(null, function (items) {
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

const fnDownloadSingle = () => {
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
        console.log('Not downloaded, note is empty');
    }
}

// Load All Notes
fnLoadNotes();
fnOnLoad();

downloadAll.addEventListener('click', fnDownloadAll);
deleteAll.addEventListener('click', fnDeleteAll);

btnResetYes.addEventListener('click', () => {
    chrome.storage.local.get(null, function (items) {
        // Stores an array of all of the keys/value pairs
        let allKeys = Object.entries(items);
        allKeys.forEach(function (row) {
            let item = row[0];

            if (row[0] != 'NotesCount' && !(row[0].startsWith('x'))) {
                console.log('Removing Key:', item);
                chrome.storage.local.remove([item], () => { });
            }
        });
        location.reload();
        return false;
    });
});

btnResetNo.addEventListener('click', () => {
    hardResetAlert.style.visibility = 'hidden';
})