const nativeHostName = "com.ra.chrome_proxy";
let port = chrome.runtime.connectNative(nativeHostName);

port.onMessage.addListener((message) => {
    console.log("Received from native app: ", message);
    port.postMessage({ content: "recieved message" + message.id });
});
