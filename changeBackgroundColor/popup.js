document.addEventListener('DOMContentLoaded', function() {
  var colorPicker = document.getElementById('colorPicker');
  var changeColorButton = document.getElementById('changeColor');
  var presets = document.querySelectorAll('.preset');
  var originalColor;

  // // Lấy màu background của trang web khi mở
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {getOriginalBackgroundColor: true}, function(response) {
  //     originalColor = response.originalBackgroundColor;
  //     colorPicker.value = originalColor;
  //   });
  // });

  if (colorPicker && changeColorButton) {
    changeColorButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {color: colorPicker.value});
      });
    });
  }

  presets.forEach(function(preset) {
    preset.addEventListener('click', function() {
      var color = this.dataset.color;
      colorPicker.value = color;
    });
  });
});
