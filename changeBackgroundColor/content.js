chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.color) {
        document.body.style.backgroundColor = request.color;
      }
    }
  );
  