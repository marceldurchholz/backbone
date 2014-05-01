// alert('loading cordova-loader.js');

// require this script before your document is done loading
;(function () {
  
  var isDroid = navigator.userAgent.match(/Android/)
  var isiOS = navigator.userAgent.match(/(iPhone|iPod|iPad)/)
  var isiPhone = ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) )
  /*
  var droidScripts = [
    "script/cordova-android.js",
    "script/android-utils.js",
    "script/cdv-plugin-childbrowser-android.js",
    "script/cdv-plugin-datepicker.js",
    "script/cdv-plugin-statusbarnotification.js",
    "script/cdv-plugin-gcm.js"
  ]
  */
  var iosScripts = [
    "phonegap.js"
  ]
  // if (isDroid) droidScripts.forEach(loadScript)
  if (isiPhone) iosScripts.forEach(loadScript)
 
  function loadScript(src) {
    var line = '<script type="text/javascript" charset="utf-8" src="' + src + '"></script>';
    document.writeln(line);
  }
})();