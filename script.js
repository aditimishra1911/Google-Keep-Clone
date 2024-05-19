const addButton = document.getElementById('add');

const updateLSData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const text = [];
    console.log(textareaData);

    textareaData.forEach((msg) => {
        return text.push(msg.value);
    })
    console.log(text);

    localStorage.setItem('text' , JSON.stringify(text));
}

const addNewNote = (text = '') => {
    // Create a div with name notes with class note
    const notes = document.createElement('div');
    notes.classList.add('note');

    // If there is no text, main div is hidden
    // If text is already present,hide the text area else there is no text then show the text area.

    // Suppose text aditi is written, then main-div will not be hidden but the text area will be hidden

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas far fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class= "${text ? "hidden" : ""}" ></textarea>
    `;

    // ** Insert HTML data inside the div tag
    notes.insertAdjacentHTML('afterbegin', htmlData);
    console.log(notes);

    //** Getting the References 
    const editButton = notes.querySelector('.edit');
    const deleteButton = notes.querySelector('.delete');
    const mainDiv = notes.querySelector('.main');
    const textarea = notes.querySelector('textarea');

    // ** Deleting a Note
    deleteButton.addEventListener('click', () =>
        {
             notes.remove();
             updateLSData();
        });    

    // Toggle using edit button
    textarea.value = text;
    mainDiv.innerHTML = text;

    // ** Toggle Using Edit Button
    // It checks if the mainDiv is visible or hidden. If it's visible, it hides it. If it's hidden, it shows it.
    // It checks if the textarea is visible or hidden. If it's visible, it hides it. If it's hidden, it shows it.
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    // event.target refers to the element that triggered the event, which is the textarea.
    // event.target.value gets the text inside the textarea.
    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        
        // This line sets the content of the mainDiv to be the same as the text inside the textarea.
        mainDiv.innerHTML = value;

        updateLSData();
    })


    // ** The appendchild() method appends a note as the last child of a nodt.
    document.body.appendChild(notes);
}

// ** Getting data back from local storage
const msgInNote = JSON.parse(localStorage.getItem('text'));

// If data is present in the local storage array
if(msgInNote) 
    {
        msgInNote.forEach((msg) => addNewNote(msg));
    }

addButton.addEventListener('click', () => addNewNote());




// The local Storage and session Storage properties allow to save key/value pairs in a web browser.
// The local Storage object stores data woth no expiration Date.
// The data will not be deleted when the browser is closed and will be available the next day,week or year.

