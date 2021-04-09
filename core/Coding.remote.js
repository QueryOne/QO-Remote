Coding = typeof Coding != 'undefined' ? Coding : {}

Coding.unencryptedTokenKey = 'QX-Token-Unencrypted';
Coding.encryptedTokenKey   = 'QX-Token-Encrypted';
Coding.encryptedSaltKey    = 'QX-Salt-Encrypted';
Coding.encryptedIVKey      = 'QX-IV-Encrypted';

Coding.extend = function() {
  var inject = function(rule) { $('body').append('<div class="Coding-Rules">&shy;<style>' + rule + '</style></div>') }
  inject(`
    #QO-Coding-Navigator-Remote {
      position  : absolute;
      left      : 0%;
      top       : 100%;
      height    : calc(2 * 31px);
      width     : 100%;
      background: rgba( 33, 33, 33, 1 );
      background-image: url('./core/resources/raster.png');
      border-bottom: 1px solid rgba( 255, 255, 255, 0.15 );
      z-index   : 40;
      transition: all 230ms;
      overflow  : hidden;
    }
    #QO-Coding-Navigator-key, #QO-Coding-Navigator-pwd {
      position  : absolute;
      left      : 0.7em;
      height    : 31px;
      width     : calc(100% - 0.7em);
    }
    #QO-Coding-Navigator-key {
      top       : 8px;
    }
    #QO-Coding-Navigator-pwd {
      top       : calc(8px + 26px);
    }
    #QO-Coding-Navigator-key input, #QO-Coding-Navigator-pwd input {
      background: rgba( 44, 44, 44, 0.44 );
      border    : none;
      border-bottom: 1px solid rgba( 255, 255, 255, 0.15 );
      position  : absolute;
      left      : calc(0.7em + 0.6em + 18px);
      height    : 16px;
      width     : 47%;
      font-family: "Noto Sans", "Nanum Gothic", sans-serif;
      font-size  : 9pt;
      color     : rgba( 167, 167, 167, 0.88 );
    }
    #QO-Coding-Navigator-key input {
      top       : -2px;
    }
    #QO-Coding-Navigator-key input.error {
      border-bottom: 1px solid rgba( 222, 15, 15, 0.44 );
    }
    #QO-Coding-Navigator-pwd input {
      top       : -2px;
    }
    #QO-Coding-Navigator-pwd input.error {
      border-bottom: 1px solid rgba( 222, 15, 15, 0.44 );
    }
    #QO-Coding-Navigator-key-icon, #QO-Coding-Navigator-pwd-icon {
      position  : absolute;
      left      : 0.6em;
      height    : 16px;
      width     : 16px;
      background: rgba( 255, 255, 255, 0.11 );
      cursor    : pointer;
    }
    #QO-Coding-Navigator-key-icon {
      background-image: url('./core/resources/key.png');
      background-size : cover;
      filter: invert(100%) opacity(22%);
    }
    #QO-Coding-Navigator-pwd-icon {
      background-image: url('./core/resources/password.png');
      background-size : cover;
      filter: invert(100%) opacity(22%);
    }
    #QO-Coding-Navigator-save, #QO-Coding-Navigator-unlock {
      position  : absolute;
      right     : 1.8em;
      width     : 35px;
      font-family: "Noto Sans", sans-serif;
      font-size  : 8pt;
      text-align: center;
      line-height: 16px;
      color     : rgba( 255, 255, 255, 0.11 );
      cursor    : pointer;
    }
    #QO-Coding-Navigator-save:hover, #QO-Coding-Navigator-unlock:hover {
      color     : rgba( 255, 255, 255, 0.44 );
      z-index   : 41;
    }
    #QO-Coding-Navigator-save {
      top       : 8px;
    }
    #QO-Coding-Navigator-unlock {
      top       : calc(8px + 26px);
    }
    #QO-Coding-Navigator-minimise {
      position  : absolute;
      right     : 1px;
      bottom    : 0%;
      font-family: "Noto Sans", sans-serif;
      font-size  : 12pt;
      color      : rgba( 255, 255, 255, 0.18 );
      cursor     : pointer;
    }
    #QO-Coding-Navigator-minimise:hover {
      color      : rgba( 255, 255, 255, 0.44 );
    }
    #QO-Coding-Navigator-expand {
      position  : absolute;
      left      : 2px;
      bottom    : 0%;
      font-family: "Noto Sans", sans-serif;
      font-size  : 12pt;
      color      : rgba( 255, 255, 255, 0.18 );
      cursor     : pointer;
    }
    #QO-Coding-Navigator-expand:hover {
      color      : rgba( 255, 255, 255, 0.44 );
    }
    #QO-Coding-Options {
      position   : absolute;
      height     : 0%;
      width      : 100%;
      transition : all 230ms;
      z-index    : 44;
      overflow   : hidden;
      background: rgba( 33, 33, 33, 1 );
      background-image: url('./core/resources/raster.png');
    }
    #QO-Options-Header {
      height     : 31px;
      font-family: 'Noto Sans', sans-serif;
      font-size  : 11pt;
      padding-left: 0.8em;
      line-height: 31px;
      color      : rgba( 167, 167, 167, 0.88 );
    }
    .QO-OptionParent {
      padding-top: 3px;
      padding-bottom: 3px;
      position   : relative;
      left       : 0.8em;
      font-family: "Noto Sans", sans-serif;
      font-size  : 9pt;
      color      : rgba( 167, 167, 167, 0.88 );
    }
    .QO-Option {
      margin-right: 0.7em;
      background  : rgba( 255, 255, 255, 0.44 );
      border      : none;
    }
    .QO-OptionParent label {
      position   : relative;
      top        : -2px;
    }

    .QO-Option[type="checkbox"]:before{
      position: relative;
      display: block;
      width: 11px;
      height: 11px;
      border: 1px solid #808080;
      content: "";
      background: rgba(255,255,255,0.44);
    }
    .QO-Option[type="checkbox"]:after{
      position: relative;
      display: block;
      left: 2px;
      top: -11px;
      width: 7px;
      height: 7px;
      border-width: 1px;
      border-style: solid;
      border-color: #B3B3B3 #dcddde #dcddde #B3B3B3;
      content: "";
      background-image: linear-gradient(135deg, #B1B6BE 0%,#FFF 100%);
      background-repeat: no-repeat;
      background-position:center;
    }
    .QO-Option[type="checkbox"]:checked:after{
      background-image:  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC'), linear-gradient(135deg, #B1B6BE 0%,#FFF 100%);
    }
    .QO-Option[type="checkbox"]:disabled:after{
     -webkit-filter: opacity(0.4);
    }
    .QO-Option[type="checkbox"]:not(:disabled):checked:hover:after{
      background-image:  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAQAAABuW59YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB2SURBVHjaAGkAlv8A3QDyAP0A/QD+Dam3W+kCAAD8APYAAgTVZaZCGwwA5wr0AvcA+Dh+7UX/x24AqK3Wg/8nt6w4/5q71wAAVP9g/7rTXf9n/+9N+AAAtpJa/zf/S//DhP8H/wAA4gzWj2P4lsf0JP0A/wADAHB0Ngka6UmKAAAAAElFTkSuQmCC'), linear-gradient(135deg, #8BB0C2 0%,#FFF 100%);
    }
    .QO-Option[type="checkbox"]:not(:disabled):hover:after{
      background-image: linear-gradient(135deg, #8BB0C2 0%,#FFF 100%);  
      border-color: #85A9BB #92C2DA #92C2DA #85A9BB;  
    }
    .QO-Option[type="checkbox"]:not(:disabled):hover:before{
      border-color: #3D7591;
    }

    #QO-Coding-Options-path {
      margin-left : 0.2em;
    }
    #QO-Coding-Options-path label {
      margin-right: 0.9em;
    }
    #QO-Coding-Options-path input {
      height      : 24px;
      border      : none;
      background  : rgba( 144, 144, 144, 0.14 );
      border-bottom: 1px solid rgba( 255, 255, 255, 0.34 );
      color       : rgba( 167, 167, 167, 0.67 );
    }
  `)
  // https://stackoverflow.com/a/17005494

  var str = ''
  str += '<div id="QO-Coding-Navigator-Remote">'
  str += '<div id="QO-Coding-Navigator-key"><div id="QO-Coding-Navigator-key-icon"></div>'
  str += '<input id="QO-Coding-Navigator-key-input" placeholder="API Token"></input>'
  str += '</div>'
  str += '<div id="QO-Coding-Navigator-pwd"><div id="QO-Coding-Navigator-pwd-icon"></div>'
  str += '<input id="QO-Coding-Navigator-pwd-input" type="password" placeholder="password"></input>'
  str += '</div>'
  str += '<div id="QO-Coding-Navigator-save"     onclick="Coding.overwriteKey()">save</div>'
  str += '<div id="QO-Coding-Navigator-unlock"   onclick="Coding.unlockKey()"   >unlock</div>'
  str += '<div id="QO-Coding-Navigator-minimise" onclick="Coding.hideEncryptionInputs()">&wedbar;</div>'
  str += '<div id="QO-Coding-Navigator-expand"   onclick="Coding.toggleOptions()">&hercon;</div>'
  str += '</div>'
  str += '<div id="QO-Coding-Options">'
  str +=   '<div id="QO-Options-Header">Options</div>'
  str +=   '<div id="QO-Coding-Options-sessional" class="QO-OptionParent">'
  str +=     '<input type="checkbox" id="QO-Options-sessional" class="QO-Option"></input>'
  str +=     '<label for="QO-Options-sessional">Use password across session.</label></div>'
  str +=   '<div id="QO-Coding-Options-unencrypted" class="QO-OptionParent">'
  str +=     '<input type="checkbox" id="QO-Options-unencrypted" class="QO-Option"></input>'
  str +=     '<label for="QO-Options-unencrypted">Save API key without encryption.</label></div>'
  str +=   '<div id="QO-Coding-Options-path" class="QO-OptionParent">'
  str +=     '<label for="QO-Options-path">Path: </label>'
  str +=     '<input id="QO-Options-path"></div>'
  str +=   '</div>'
  str += '</div>'
  $('#QO-Coding-Navigator-Submenu').append(str)

  var ukey = localStorage.getItem(Coding.unencryptedTokenKey)
  var key  = localStorage.getItem(Coding.encryptedTokenKey)
  if (ukey) {
    $('#QO-Coding-Navigator-key-input').attr('placeholder','API Key available')
  } else if (key) {
    $('#QO-Coding-Navigator-key-input').attr('placeholder','API Key encrypted')
  }

  Coding.hideEncryptionInputs()
  // Coding.showEncryptionInputs()
  // setTimeout(function() { Coding.showOptions() }, 120)
}

Coding.options = typeof Coding.options != 'undefined' ? Coding.options : {}

Coding.options.useUnencrypted = false
Coding.options.sessionalLogin = false
Coding.options.root           = 'Profiles'

Coding.keypass = function() {
  if ($('#QO-Coding-Navigator-Remote').height() > 0) {
    Coding.hideEncryptionInputs()
  } else {
    Coding.showEncryptionInputs()
  }
}

// 70b957c4742f1adc4156a2fce7fa4b859082eab0
Coding.overwriteKey = async function() {
  var useEncryption = !Coding.options.useUnencrypted

  var $input = $('#QO-Coding-Navigator-key-input')
  var key    = $input.val()
  $input.removeClass('error')
  if (key.length <= 0) {
    $input.attr('placeholder','bad input').addClass('error')
    return
  }

  if (useEncryption) {
    var $pwd   = $('#QO-Coding-Navigator-pwd-input')
    var pwd    = $pwd.val()
    $pwd.removeClass('error')
    if (pwd.length <= 0) {
      $pwd.attr('placeholder','bad input').addClass('error')
      return
    }

    PBKDF2.assign(Coding.encryptedTokenKey, Coding.encryptedSaltKey, Coding.encryptedIVKey)
    var f = await PBKDF2.encrypt(pwd, key)
    if (f) {
      $input.val('').attr('placeholder','encryption complete')
        $pwd.val('').attr('placeholder','encryption complete')
    } else {
      $pwd.val('').addClass('error').attr('placeholder','encryption failed')
    }
    return
  }

  localStorage.setItem(Coding.unencryptedTokenKey, key)
  $input.val('').attr('placeholder','encryption complete')
  return
}

Coding.unlockKey = async function() {
  Coding.token = undefined

  var $key = $('#QO-Coding-Navigator-key-input')
  var $pwd = $('#QO-Coding-Navigator-pwd-input')
      $pwd.removeClass('error')
  var pwd  = $pwd.val()
  var noEncryption = Coding.options.useUnencrypted

  if (noEncryption) {
    var tokun = localStorage.getItem(Coding.unencryptedTokenKey)
    if (tokun) {
      console.log('Using unencrypted token saved at ' + Coding.unencryptedTokenKey + ': ' + tokun)
      $pwd.val('').attr('placeholder','unencrypted available')
      Coding.token = tokun
      return
    }
    $pwd.val('').addClass('error').attr('placeholder','no unencrypted')
    return
  }

  if (pwd.length <= 0) {
    $pwd.val('').addClass('error').attr('placeholder','need password')
    return
  }

  PBKDF2.assign(Coding.encryptedTokenKey, Coding.encryptedSaltKey, Coding.encryptedIVKey)
  var f = await PBKDF2.decrypt(pwd, new Uint8Array(JSON.parse(localStorage.getItem(Coding.encryptedTokenKey))))
  if (f) {
    Coding.token = f
    $pwd.val('').attr('placeholder','success')
    $key.val('').val(f)
    // console.log('Successfully unlocked token: ' + f)
    return
  } else {
    $pwd.val('').addClass('error').attr('placeholder','wrong password')
    return
  }  
}

Coding.attempt = async function(func) {
  var fn    = typeof Coding[func] != 'undefined' ? Coding[func] : function(){}

  var tokun = localStorage.getItem(Coding.unencryptedTokenKey)
  var token = localStorage.getItem(Coding.encryptedTokenKey)
  var salt  = localStorage.getItem(Coding.encryptedSaltKey)
  var iv    = localStorage.getItem(Coding.encryptedIVKey)
  var key   = $('#QO-Coding-Navigator-key-input').val()
  var pwd   = $('#QO-Coding-Navigator-pwd-input').val()

  if (Coding.token) {
    Coding.hideEncryptionInputs()
    $('.QO-Coding-Submenu-Element').removeClass('no-key')
    var k = '';
    switch (func) {
      case 'upload':
        k = '.QO-Coding-Upload'
        break;
      case 'download':
        k = '.QO-Coding-Download'
        break;
    }
    if ($(k).hasClass('in-progress')) {
    
    } else {
      fn()
    }
  } else {
    Coding.showEncryptionInputs()
    $('.QO-Coding-Submenu-Element').removeClass('no-key')
    switch (func) {
      case 'upload':
        $('.QO-Coding-Upload').addClass('no-key')
        break;
      case 'download':
        $('.QO-Coding-Download').addClass('no-key')
        break;
    }
  }
}

Coding.showEncryptionInputs = function() {
  // $('#QO-Coding-Navigator-Remote').css('height', $('#QO-Coding-Navigator-Content').css('height'))
  $('#QO-Coding-Navigator-Remote').css('height', '62px')
  $('#QO-Coding-Options')
    .css('top', '89px')
}

Coding.hideEncryptionInputs = function() {
  Coding.hideOptions()
  $('#QO-Coding-Navigator-Remote')
     .css('height','0%')
  $('#QO-Coding-Options')
    .css('top', '23px')
}

Coding.toggleOptions = function() {
  if ($('#QO-Coding-Options').height() == 0) {
    Coding.showOptions()
  } else { 
    Coding.hideOptions()
  }
}

Coding.showOptions = function() {
  $('#QO-Coding-Options')
    .css('height', ($('#QO-Coding-Navigator-Content').height() - $('#QO-Coding-Navigator-Remote').height()) + 'px')
  $('#QO-Coding-Navigator-expand')
    .html('&ndash;')
    .css('left', '4px')
}

Coding.hideOptions = function() {
  $('#QO-Coding-Options')
    .css('height', 0)
  $('#QO-Coding-Navigator-expand')
    .html('&hercon;')
    .css('left', '2px')
}

Coding.upload = function() {
  console.log('Attempting system upload...')
  $('.QO-Coding-Upload').addClass('in-progress')
  var p = $.when(1)
  p = p.then(function() { 
    return Coding.authorise()
  }).then(function(e) {
    if (!e) { return false }
    Coding._login = e.login
    return Coding.locate()
  }).then(function(e) {
    console.log(e)
    switch(e) {
      case 'Not Found':
        break;
      default:
        return Coding.retrieve()
        break;
    }
  }).then(function(e) {
    console.log(e)
    if (e.type == 'file') {
      Coding._uri = e.git_url
      Coding._sha = e.sha
      return Coding.uploadFile()
    }
  }).then(function(e) {
    console.log(e)
    $('.QO-Coding-Upload').removeClass('in-progress')
  })
}

Coding.download = function() {
  console.log('Attempting system download...')
  $('.QO-Coding-Download').addClass('in-progress')
  var p = $.when(1)

  p = p.then(function() { 
    return Coding.authorise()
  }).then(function(e) {
    if (!e) { return false }
    Coding._login = e.login
    return Coding.locate()
  }).then(function(e) {
    console.log(e)
    switch(e) {
      case 'Not Found':
        break;
      default:
        return Coding.retrieve()
        break;
    }
  }).then(function(e) {
    console.log(e)
    if (e.type == 'file') {
      Coding._uri = e.git_url
      return Coding.retrieveFile()
    }
  }).then(function(e) {
    $('.QO-Coding-Download').removeClass('in-progress')
    console.log(e)
    if (e.content) {
      var f = atob(e.content)
      console.log(JSON.parse(f))
      $('body').trigger('QO-System-Downloaded', JSON.parse(f))
      $('#QO-Coding-Navigator-Content').tree('loadData', JSON.parse(f))
    }
  })
}

/* Github Interface */
Coding.authorise = async function() {
  if (!Coding.token) { console.log('No valid token.'); return false }
  return $.ajax({
    type      : 'GET',
    beforeSend: function(xhr) { xhr.setRequestHeader('Authorization','token ' + Coding.token) },
    url       : 'https://api.github.com/user',
    success   : function(e) { return e },
    error     : function(e) { return false },
  })
}
Coding.locate = async function() {
  Coding._root = Coding.options.root
  if (!Coding._root) { console.log('No valid root path set.'); return false }
  try {
    return await (function() { return $.ajax({
      type      : 'GET',
      beforeSend: function(xhr) { xhr.setRequestHeader('Authorization','token ' + Coding.token) },
      url       : 'https://api.github.com/repos/' + Coding._login + '/' + Coding._root + '/git/trees/master?recursive=1',
      success   : function(e) { return e },
      error     : function(e) { return false },
    }) })()
  } catch(error) { console.log(error); return error.responseJSON.message; }
}
Coding.retrieve = async function() {
  Coding._character = 'Tysandr'
  Coding._path = Coding._root + '/contents/' + Coding._character
  try {
    return await (function() { return $.ajax({
      type     : 'GET',
      beforeSend: function(xhr) { xhr.setRequestHeader('Authorization','token ' + Coding.token) },
      url       : 'https://api.github.com/repos/' + Coding._login + '/' + Coding._path,
      success   : function(e) { return e },
      error     : function(e) { return false },
    }) })()
  } catch(error) { console.log(error); return error.responseJSON.message; }
}
Coding.retrieveFile = async function() {
  try {
    return await (function() { return $.ajax({
      type     : 'GET',
      beforeSend: function(xhr) { xhr.setRequestHeader('Authorization','token ' + Coding.token) },
      url       : Coding._uri,
      success   : function(e) { return e },
      error     : function(e) { return false },
    }) })()
  } catch(error) { console.log(error); return error.responseJSON.message; }
}
Coding.uploadFile = async function() {
  var system = $('#QO-Coding-Navigator-Content').tree('toJson',2)
  try {
    return await (function() { return $.ajax({
      type     : 'PUT',
      beforeSend: function(xhr) { xhr.setRequestHeader('Authorization','token ' + Coding.token) },
      url       : 'https://api.github.com/repos/' + Coding._login + '/' + Coding._path,
      data      : JSON.stringify({
        message : 'Update system, ' + new Date().toLocaleString(),
        content : btoa(system),
        sha     : Coding._sha,
      }),
      success   : function(e) { return e },
      error     : function(e) { return false },
    }) })()
  } catch(error) { console.log(error); return error.responseJSON.message; }
}
