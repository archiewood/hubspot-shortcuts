// Function to extract the 8-digit ID from the URL
function extractHubSpotID() {
  const url = window.location.href;
  const match = url.match(/(\d{8})/);
  console.log(match);
  return match ? match[0] : null;
}

/**
 * Navigation Shortcuts
 * @param D - Navigate to Deals
 * @param L - Navigate to Leads
 * @param S - Navigate to Sequences
 */
const navigationShortcuts = {
  "D": () => navigateToPage(`/contacts/{id}/objects/0-3/`),
  "L": () => navigateToPage(`/prospecting/{id}/leads`),
  "S": () => navigateToPage(`/sequences/{id}`)
};

/**
 * Action Shortcuts
 * @param N - Select Create New Button
 * @param A - Select All Records
 * @param E - Enroll in Sequence
 * @param Ctrl/Cmd+Enter - Save/Send
 */
const actionShortcuts = {
  "N": () => pressCreateButton(),
  "A": () => selectAllRecords(),
  "E": () => clickEnrollInSequenceButton(),
  "CTRL+ENTER": () => clickSaveButton(), 
};

document.addEventListener('keydown', (event) => {
  const isInputField = (document.activeElement.tagName === 'INPUT' && document.activeElement.type !== 'checkbox') || 
                       document.activeElement.tagName === 'TEXTAREA' || 
                       document.activeElement.isContentEditable;

  // Only process shortcuts if not in an input field
  if (!isInputField) {
    const key = event.key.toUpperCase();
    if (navigationShortcuts[key]) {
      event.preventDefault();
      navigationShortcuts[key]();
    } else if (actionShortcuts[key]) {
      event.preventDefault();
      actionShortcuts[key]();
    }
  }

  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    actionShortcuts["CTRL+ENTER"]();
  }
});

function pressCreateButton() {
  document.querySelector('#hs-global-toolbar-object-create').click();
}

function selectAllRecords() {
  document.querySelector('[aria-label="Select all records."]').click();
}

function clickEnrollInSequenceButton() {
  document.querySelector('[data-selenium-test="bulk-action-enroll-in-sequence"]').click();
}

// This captures:
// - Notes Save Button
// - Log Call Save Button
// - Send Email Button
//
// This does not capture:
// - Create Task Button 
// - Enroll in Sequence Button (sequence-enroll-controls__save-btn)

function clickSaveButton() {
  document.querySelector('[data-selenium-test="rich-text-editor-controls__save-btn"]').click();
  // document.querySelector('[data-selenium-test="create" data-test-id="create-button"]').click();
 
}
// Generic function to navigate to a page
function navigateToPage(pathTemplate) {
  const id = extractHubSpotID();
  if (id) {
    const path = pathTemplate.replace('{id}', id);
    window.location.href = path;
  } else {
    throw new Error('HubSpot ID not found in URL');
  }
}

/**
 * Makes URLs clickable
 * 
 * Searches for URLs in various HTML elements and wraps them
 * with `<a>` tags to make them clickable.
 * 
 */
function wrapURLsInLinks() {
  const elements = document.querySelectorAll('p:not(:empty), span:not(:empty), div:not(:empty) textarea:not(:empty)');
  const urlRegex = /^(https?:\/\/[^\s]+)$/;
  const filteredElements = Array.from(elements).filter(element => urlRegex.test(element.innerHTML.trim()));

  filteredElements.forEach(element => {
    element.innerHTML = element.innerHTML.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });
  });
}

// Using the 'load' event
window.addEventListener('load', () => {
  setTimeout(wrapURLsInLinks, 3000);
});

// Click event
document.addEventListener('click', () => {
  setTimeout(wrapURLsInLinks, 1000);
});
