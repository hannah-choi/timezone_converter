
import Search from './search.js'
import TimezoneManager from './timezonemanager.js'

//import Search from './search.js'
const searchInput = document.querySelector('.searchInput')
const search = new Search()
const suggestionList = document.querySelector('.suggestionList')
const timezoneManager = new TimezoneManager()
const selection = Selection.create({
    // Class for the selection-area
    class: 'selection',
    // All elements in this container can be selected
    selectables: ['.box-wrap > div'],
    // The container is also the boundary in this case
    boundaries: ['.box-wrap']
    }).on('start', ({inst, selected, oe}) => {
    // Remove class if the user isn't pressing the control key or ⌘ key
    if (!oe.ctrlKey && !oe.metaKey) {
        // Unselect all elements
        for (const el of selected) {
            el.classList.remove('selected');
            inst.removeFromSelection(el);
        }
        // Clear previous selection
        inst.clearSelection();
    }
}).on('move', ({changed: {removed, added}}) => {
    // Add a custom class to the elements that where selected.
    for (const el of added) {
        el.classList.add('selected');
    }
    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
        el.classList.remove('selected');
    }
}).on('stop', ({inst}) => {
    // Remember selection in case the user wants to add smth in the next one
    inst.keepSelection();
});

//const hourList = new Hour(0)
searchInput.addEventListener('input', (e) => {search.displayMatches(e.target.value)})
searchInput.addEventListener('focusout', (e) => {suggestionList.style.opacity = 0})

suggestionList.addEventListener('click', (e)=>{
    switch (e.target.className){
        case 'suggestionItem':
            timezoneManager.addZone(e.target)    
            break;
        case 'listTimezone':
            timezoneManager.addZone(e.target.parentElement)
            break;
        case 'highlight':
            timezoneManager.addZone(e.target.parentElement.parentElement)
            break;
        default:
            return;
    }
})
