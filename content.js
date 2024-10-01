// Function to extract the 8-digit ID from the URL
function extractHubSpotID() {
  const url = window.location.href;
  const match = url.match(/(\d{8})/);
  console.log(match);
  return match ? match[0] : null;
}

// Default keyboard shortcuts
const navigationShortcuts = {
  "D": () => navigateToPage(`/contacts/{id}/objects/0-3/`),
  "L": () => navigateToPage(`/prospecting/{id}/leads`),
  "S": () => navigateToPage(`/sequences/{id}`)
};

const actionShortcuts = {
  "/": () => openSearchBar(),
  "N": () => pressCreateButton()
};

// Listen for keydown events
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

// Function to open the search bar
function openSearchBar() {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const key = isMac ? 'Meta' : 'Control';
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    [key + 'Key']: true,
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

// Function to press the create button
function pressCreateButton() {
  const createButton = document.querySelector('#hs-global-toolbar-object-create');
  if (createButton) {
    createButton.click();
  }
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
