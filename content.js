// Function to extract the 8-digit ID from the URL
function extractHubSpotID() {
  const url = window.location.href;
  const match = url.match(/(\d{8})/);
  console.log(match);
  return match ? match[0] : null;
}

const navigationShortcuts = {
  "D": () => navigateToPage(`/contacts/{id}/objects/0-3/`),
  "L": () => navigateToPage(`/prospecting/{id}/leads`),
  "S": () => navigateToPage(`/sequences/{id}`)
};

const actionShortcuts = {
  "/": () => openSearchBar(),
  "N": () => pressCreateButton(),
  "A": () => selectAllRecords(),
  "E": () => clickEnrollInSequenceButton() // Added new shortcut for 'E'
};

document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase();
  if (navigationShortcuts[key]) {
    event.preventDefault();
    navigationShortcuts[key]();
  } else if (actionShortcuts[key]) {
    event.preventDefault();
    actionShortcuts[key]();
  }
});

// Function to open the search bar - Doesn't work
function openSearchBar() {
  const isMac = /Macintosh/.test(navigator.userAgent);
  const key = isMac ? 'meta' : 'control';
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    [key + 'Key']: true,
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

function pressCreateButton() {
  const createButton = document.querySelector('#hs-global-toolbar-object-create');
  if (createButton) {
    createButton.click();
  }
}

function selectAllRecords() {
  document.querySelector('[aria-label="Select all records."]').click();
}

function clickEnrollInSequenceButton() {
    document.querySelector('[data-selenium-test="bulk-action-enroll-in-sequence"]').click();
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
