export function findInTabs(url) {
  return new Promise((resolve, reject) => {
      chrome.tabs.query({url: url}, tabs => {
          if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
          } else {
              console.log(`Found ${tabs.length} tabs with url '${url}'`);
              resolve(tabs);
          }
      });
  });
}

export function focusTab(tabs) {
  console.log(tabs);
  if (!tabs || tabs.length === 0) {
    console.error("No tabs to focus");
    return Promise.reject("No tabs to focus");
  }
  else {
    return new Promise((resolve, reject) => {
        chrome.tabs.update(tabs[0].id, {active: true}, (updatedTab) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                console.log(`Focused tab '${updatedTab.id}'`);
                resolve(updatedTab);
            }
        });
    });
  }
}
