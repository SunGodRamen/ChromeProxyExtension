import * as tabs from './feature/tabs.js';
// Add additional imports as needed for other feature scripts

// Create a map of features to their functions
const featureFunctionMap = {
    tabs: tabs,
    // ... additional feature modules
};

const nativeHostName = "com.ra.chrome_proxy";
let port = chrome.runtime.connectNative(nativeHostName);

port.onMessage.addListener((msg) => {
    console.log(msg);
    if (msg.feature && msg.function) {
        const featureModule = featureFunctionMap[msg.feature];
        if (featureModule && typeof featureModule[msg.function] === "function") {
            // Assume the function returns a Promise
            const resultPromise = featureModule[msg.function](msg.parameters);
            
            resultPromise
                .then(result => {
                    if (msg.callback && typeof featureModule[msg.callback] === "function") {
                        featureModule[msg.callback](result);
                    }
                })
                .catch(error => {
                    console.error(`Error executing function '${msg.function}' from feature '${msg.feature}':`, error);
                });
        } else {
            console.error(`Failed to find feature '${msg.feature}' or function '${msg.function}'`);
        }
    }
});

