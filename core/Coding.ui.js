Coding = typeof Coding != 'undefined' ? Coding : {}

Coding.rules = {
  ['Coding']: `
    position: absolute;
    z-index : 111;
    right   : 2px;
    top     : 24px;
    height  : 660px;
    width   : 600px;
    background: rgba(1,1,1,1);
    border: 1px groove rgba(75,75,75,0.15);
    border-radius: 3px;
    overflow: hidden;
    opacity : 0.96;
  `,
  ['Coding-Internal']: `
    position: absolute;
    left    : 0%;
    top     : 0%;
    height  : 100%;
    width   : 100%;
  `,
  ['Coding-Header']: `
    position: absolute;
    left    : 0%;
    top     : 0%;
    height  : 27px;
    width   : 100%;
    background: rgba(13,13,13,1);
    cursor  : pointer;
  `,
  ['Coding-Header-Close']: `
    position: absolute;
    right   : 0%;
    top     : 0%;
    height  : 100%;
    width   : 27px;
    background : rgba(1,1,1,0.44);
    font-family: 'Lekton';
    font-size  : 16pt;
    line-height: 27px;
    text-align : center;
    color      : rgba(123,33,33,1);
  `,
  ['Coding-Header-Close:hover']: `
    background: rgba(1,1,1,0.84);
    color      : rgba(177,33,33,1);
  `,
  ['Coding-Header-Splitter']: `
    position   : absolute;
    left       : 0.4em;
    top        : 49%;
    height     : 14px;
    width      : 14px;
    transform  : translate(0%, -50%);
    filter     : brightness(0) invert(0.47);
    background-size : contain;
    background-repeat: no-repeat;
    background-image: url('./core/resources/splitscreen.png');
  `,
  ['Coding-Header-Splitter:hover']: `
    filter     : brightness(0) invert(0.67);
  `,
  ['Coding-Navigator']: `
    position: absolute;
    left    : 0%;
    top     : 27px;
    height  : calc(100% - 27px);
    width   : 260px;
    background   : rgba( 22, 22, 22, 1 );
    background-image: url('./core/resources/raster.png');
    border-right : 1px solid rgba( 55, 55, 55, 1);
  `,
  ['Coding-Navigator-Submenu']: `
    position: absolute;
    left    : 0%;
    top     : 0%;
    height  : 26px;
    width   : 100%;
    border-bottom: 1px solid rgba( 14, 14, 14, 0.88 );
  `,
  ['Coding-Navigator-Content']: `
    position: absolute;
    left    : 0%;
    top     : 27px;
    height  : calc(100% - 27px - 27px);
    width   : 100%;
    overflow-y   : scroll;
  `,
  ['Coding-Navigator-Footer']: `
    position: absolute;
    left    : 0%;
    bottom  : 0%;
    width   : 100%;
    height  : 22px;
    background   : rgba( 44, 44, 44, 1 );
    background-image: url('./core/resources/raster.png');
    border-top : 3px solid rgba(1,1,1,0.35);
    cursor  : pointer;
  `,
  ['Coding-Body']: `
    position: absolute;
    left    : calc(350px + 2px);
    top     : 27px;
    height  : calc(100% - 27px);
    width   : calc(100% - 250px);
    border  : 1px groove rgba(255,255,255,0.33);
  `,
  ['Coding-Body-Header']: `
    position: absolute;
    left    : 0%;
    top     : 0%;
    width   : 100%;
    height  : calc(40px + 30px + 13px);
    background: rgba(122,122,122,1);
    background-image: url('./core/resources/raster.png');
    font-family: 'Noto Sans', 'Overpass', 'Lekton', sans-serif;
    font-size  : 9pt;
    overflow-y : scroll;
    overflow-x : hidden;
  `,
  ['Coding-Body-Header-Title']: `
    position: absolute;
    left    : 0%;
    top     : 3px;
    width   : 100%;
    height  : 27px;
  `,
  ['Coding-Body-Header-Name']: `
    position: absolute;
    left    : 0%;
    top     : 0%;
    width   : 100%;
    height  : 100%;
    padding-left: 0.4em;
    line-height: 23px;
  `,
  ['Coding-Body-Header-Name-input']: `
    position: absolute;
    left    : 70px;
    top     : 0px;
    width   : calc(100% - 70px - 0.4em - 13px);
    height  : 19px;
    padding : 0px;
    font-family: 'Ubuntu Mono','Overpass Mono','Lekton', sans-serif;
    font-size  : 9pt;
    color   : rgba( 1, 1, 1, 1 );
    letter-spacing: 0px;
    line-height: 19px;
    padding-left: 3px;
    background: rgba(255, 255, 255, 0.33);
    border: 1px groove rgba( 144, 144, 144, 0.44 );
  `,
  ['Coding-Body-Header-Patterns']: `
    position: absolute;
    left    : 0%;
    top     : 27px;
    width   : 100%;
    height  : 40px;
  `,
  ['Coding-Body-Header-Patterns-pre']: `
    display : inline-block;
    position: absolute;
    left    : 0%;
    top     : 0%;
    width   : 100%;
    height  : 40px;
    padding-left: 0.4em;
    line-height: 25px;
  `,
  ['Coding-Body-Header-Patterns-pre.invalid']: `
    display : none;
  `,
  ['Coding-Body-Header-Patterns-list']: `
    display : inline-block;
    position: absolute;
    left    : 70px;
    top     : 0%;
    width   : 100%;
    width   : calc(100% - 70px - 0.4em - 10px);
    height  : 40px;
  `,
  ['Coding-Body-Header-Patterns-textarea']: `
    display : inline-block;
    position: absolute;
    left    : 0%;
    top     : calc(0% + 1px);
    font-family: 'Ubuntu Mono','Overpass Mono','Lekton', sans-serif;
    font-size  : 9pt;
    line-height: 17px;
    color   : rgba( 1, 1, 1, 1 );
    letter-spacing: 0px;
    width   : 100%;
    padding-left: 3px;
    height  : 40px;
    outline : dotted 0px rgba( 255, 255, 255, 0.44 );
    resize  : vertical;
    background: rgba(255, 255, 255, 0.33);
  `,
  ['Coding-Body-Header-Patterns-textarea.invalid']: `
    user-select: none;
    background : rgba( 1, 1, 1, 0.35 );
  `,
  ['Coding-Body-Header-Bottom']: `
    position: absolute;
    left    : 0%;
    bottom  : 0%;
    width   : 100%;
    height  : 0px;
    background: rgba(56,56,56,1);
    border-bottom: 0px solid rgba(56,56,56,1);
  `,
  ['Coding-Body-Content']: `
    position: absolute;
    left    : 0%;
    top     : calc(40px + 30px);
    width   : 100%;
    height  : calc(100% - 40px - 30px - 27px - 3px);
    border-top: 3px solid rgba( 122, 122, 122, 1);
    background-image: url('./core/resources/raster.png');
  `,
  ['Coding-Body-Content-ACE']: `
    position: absolute;
    left    : 0%;
    top     : 0%;
    width   : 100%;
    height  : calc(100% - 8px);
  `,
  ['Coding-Footer']: `
    position: absolute;
    left    : 0%;
    bottom  : 0%;
    width   : 100%;
    height  : 23px;
    background   : rgba( 25, 25, 25, 1 );
    background-image: url('./core/resources/raster.png');
    cursor  : pointer;
  `,
  ['.Coding-Submenu-Element']: `
    display : inline-block;
    cursor  : pointer;
    padding-right: 3px;
    padding-left : 3px;
    margin-top   : 5px;
    width   : 16px;
    height  : 16px;
    background-size : contain;
    background-repeat: no-repeat;
    filter  : brightness(0) invert(0.67);
  `,
  ['.Coding-Submenu-Element:hover']: `
    filter  : brightness(0) invert(1.00);
  `,
  ['.Coding-Submenu-Element:active']: `
    filter  : brightness(0.77) invert(0.33);
  `,
  ['.Coding-Add']: `
    display : inline-block;
    cursor  : default;
    padding-right: 6px;
    padding-left : 6px;
    margin-top   : -2px;
    width   : 16px;
    height  : 16px;
    line-height: 16px;
    text-align : center;
    vertical-align: text-top;
    color   : rgba( 114, 114, 114, 1 );
  `,
  ['.Coding-Folder']: `
    background-image: url('./core/resources/folder.png');
  `,
  ['.Coding-Alias']: `
    background-image: url('./core/resources/alias.png');
  `,
  ['.Coding-Trigger']: `
    background-image: url('./core/resources/trigger.png');
  `,
  ['.Coding-Script']: `
    background-image: url('./core/resources/script.png');
  `,
  ['.Coding-Save']: `
    background-image: url('./core/resources/save.png');
    position: absolute;
    right   : 0.4em;
    width   : 14px;
    height  : 14px;
    line-height: 16px;
    margin-top   : 6px;
  `,
  ['.Coding-Upload']: `
    position: absolute;
    right   : calc(0.4em + 14px + 0.5em);
    width   : 14px;
    height  : 14px;
    line-height: 16px;
    margin-top   : 6px;
    background-image: url('./core/resources/upload-2.png');
  `,
  ['.Coding-Download']: `
    position: absolute;
    right   : calc(0.4em + 14px + 0.5em + 14px + 0.5em);
    width   : 14px;
    height  : 14px;
    line-height: 16px;
    margin-top   : 6px;
    background-image: url('./core/resources/download-2.png');
  `,
  ['.Coding-Item']: `
    display: inline-block;
    width: 13px;
    height: 13px;
    min-width: 13px;
    background-size: contain;
    background-repeat: no-repeat;
    filter: brightness(0) contrast(150) invert(0.67);
  `,
  ['.Coding-Item.folder']: `
    background-image: url('./core/resources/folder.png');
    width: 12px;
    height: 12px;
    position: relative;
    top: 1px;
  `,
  ['.Coding-Item.alias']: `
    background-image: url('./core/resources/alias.png');
    position: relative;
    top: 1px;
  `,
  ['.Coding-Item.trigger']: `
    background-image: url(./core/resources/trigger.png);
    position: relative;
    top: 3px;
    filter: brightness(0) contrast(150) invert(0.97);
  `,
  ['.Coding-Item.script']: `
    background-image: url(./core/resources/script.png);
    width: 12px;
    height: 12px;
    position: relative;
    top: 1px;
    filter: brightness(0) contrast(150) invert(0.97);
  `,
  ['.Coding-Item-closer']: `
    display: inline-block;
    cursor : pointer;
    color  : rgba( 135, 15, 15, 0.35 );
    position: absolute;
    right   : calc(0% + 20px);
    font-family: 'Lekton';
    font-size  : 9pt;
  `,
  ['.Coding-Item-closer:hover']: `
    color  : rgba( 155, 15, 15, 0.85 );
  `,
  ['.Coding-invisible']: `
    display: none;
  `,
  ['.Coding-Keypass']: `
    background-image: url('./core/resources/password.png');
    position: absolute;
    right   : calc(0.4em + 14px + 0.5em + 14px + 0.5em + 14px + 0.5em);
    margin-top   : 6px;
    filter  : brightness(0) invert(0.47);
  `,
  ['.Coding-Keypass:hover']: `
    filter  : brightness(0) invert(0.70);
  `,
  ['.Coding-Upload.no-key']: `
    filter  : none;
    filter  : contrast(1000%) invert(50%) sepia(100%) saturate(20000%) hue-rotate(350deg);
  `,
  ['.Coding-Download.no-key']: `
    filter  : none;
    filter  : contrast(1000%) invert(50%) sepia(100%) saturate(20000%) hue-rotate(350deg);
  `,
  /*
  ['.Coding-Keypass::before']: `
    content : '\\2713';
    color: rgba(255,1,1,1);
    filter : brightness(0) invert(0);
  `,
  */
  // Dialog Styling
  ['.Coding-DialogStyle']: `
    z-index   : 155;
    
    background: rgba( 79, 79, 91, 1.00 );
    border-radius: 4px;
  `,
  ['.Coding-DialogTitle']: `
    background: rgba( 64, 64, 74, 1.00 );
    border-top-right-radius: 4px;
    border-top-left-radius : 4px;
    padding: 0.2em;
    height     : 16px;
    line-height: 19px;
    text-align : center;
    font-family: 'Ubuntu Mono','Lekton';
    font-size  : 12pt;
    color      : rgba( 25, 25, 25, 0.90 );
  `,
  ['.Coding-DialogClose']: `
    position   : absolute;
    right      : 0px;
    top        : 0px;
    border-top-right-radius: 4px;
    cursor     : pointer;
  `,
  ['.Coding-DialogClose:hover']: `
    background : rgba( 76, 76, 76, 1.00 );
    color      : rgba( 155, 155, 155, 1.00 );
  `,
  ['.Coding-DialogContent']: `
    font-family: 'Overpass Mono','Lekton';
    font-size  : 11pt;
    color      : rgba( 14, 14, 14, 0.90 );
  `,
  ['.Coding-DialogButtons']: `
    padding-bottom: 0.3em;
  `,
  ['.Coding-DialogButtons .ui-button']: `
    margin-left: 10px;
    cursor : pointer;
  `,
  ['.Coding-DialogButtons .ui-button:focus']: `
    border: 1px solid rgba(255,1,1,1);
  `
}

Coding.css = function() {
  var inject = function(rule) { $('body').append('<div class="Coding-Rules">&shy;<style>' + rule + '</style></div>') }
  if ( $('.Coding-Rules').length ) { $('.Coding-Rules').remove() }
  var rules = ''
  for (var rule in Coding.rules) {
    if (rule.match(/^\./)) {
      rules += rule.replace(/^./,'.QO-') + ' {' + Coding.rules[rule] + '}\n'
    } else {
      rules += '#QO-' + rule + ' {' + Coding.rules[rule] + '}\n'
    }
  }
  inject(rules)

  inject('.jqtree-title.jqtree_common { overflow-x: hidden; }')
  // Context menu
  // inject('div.contextual { z-index: 100; }')
}

Coding.render = function() {
  $('#QO-Coding').remove()

  var d = ''
  d += '<div id="QO-Coding">'
  d += '<div id="QO-Coding-Internal">'
  d += '<div id="QO-Coding-Header"><div id="QO-Coding-Header-Close">x</div>'
  d +=   '<div id="QO-Coding-Header-Splitter"></div></div>'
  d += '<div id="QO-Coding-Navigator">'
  d +=   '<div id="QO-Coding-Navigator-Submenu">'
  d +=     '<div class="QO-Coding-Add">+</div>'
  d +=     '<div onclick="Coding.generate(\'folder\')"  class="QO-Coding-Submenu-Element QO-Coding-Folder"></div>'
  d +=     '<div onclick="Coding.generate(\'alias\')"   class="QO-Coding-Submenu-Element QO-Coding-Alias"></div>'
  d +=     '<div onclick="Coding.generate(\'trigger\')" class="QO-Coding-Submenu-Element QO-Coding-Trigger"></div>'
  d +=     '<div onclick="Coding.generate(\'script\')"  class="QO-Coding-Submenu-Element QO-Coding-Script"></div>'
  d +=     '<div onclick="Coding.keypass()"             class="QO-Coding-Submenu-Element QO-Coding-Keypass"></div>'
  d +=     '<div onclick="Coding.attempt(\'upload\')"   class="QO-Coding-Submenu-Element QO-Coding-Upload"></div>'
  d +=     '<div onclick="Coding.attempt(\'download\')" class="QO-Coding-Submenu-Element QO-Coding-Download"></div>'
  d +=     '<div onclick="Coding.save()"                class="QO-Coding-Submenu-Element QO-Coding-Save"></div>'
  d +=   '</div>'
  d +=   '<div id="QO-Coding-Navigator-Content">'
  d +=   '<ui-treeview id="QO-Coding-Treeview"></ui-treeview></div>'
  d +=   '<div id="QO-Coding-Navigator-Footer"></div>'
  d += '</div>'
  d += '<div id="QO-Coding-Body">'
  d +=   '<div id="QO-Coding-Body-Header">'
  d +=     '<div id="QO-Coding-Body-Header-Title">'
  d +=       '<div id="QO-Coding-Body-Header-Name">Name: <input id="QO-Coding-Body-Header-Name-input"></input></div>'
  d +=     '</div>'
  d +=     '<div id="QO-Coding-Body-Header-Patterns"><div id="QO-Coding-Body-Header-Patterns-pre">Patterns:</div>'
  d +=       '<div id="QO-Coding-Body-Header-Patterns-list">'
  d +=         '<textarea id="QO-Coding-Body-Header-Patterns-textarea" class="invalid" disabled></textarea></div>'
  d +=     '</div>'
  d +=     '<div id="QO-Coding-Body-Header-Bottom"></div>'
  d +=   '</div>'
  d +=   '<div id="QO-Coding-Footer"></div>'
  d +=   '<div id="QO-Coding-Body-Content"><div id="QO-Coding-Body-Content-ACE"></div></div>'
  d += '</div>'
  d += '</div></div>'

  d += '<div id="QO-Coding-Dialog" class="QO-Coding-invisible" title="Delete this item?"><p>'
  d +=   '<span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>'
  d +=   'This will be permanently deleted and cannot be recovered. Are you sure?'
  d += '</p></div>'
  $('#container').append(d)
     
  // ACE
  if (typeof ace != 'undefined') {
    var aceBody  = 'QO-Coding-Body-Content-ACE'
    var aceMode  = 'ace/mode/javascript'
    var aceTheme = 'ace/theme/tomorrow_night_eighties'
    Coding.ace = ace.edit(aceBody)
    Coding.ace.setOptions({
      autoScrollEditorIntoView: true,
    })
    Coding.ace.setTheme(aceTheme)
    Coding.ace.session.setMode(aceMode)
    Coding.ace.session.setValue('')
    Coding.ace.session.$worker.send("changeOptions", [{asi: true}]); // Don't show missing semicolons as errors

    // additional
    document.getElementById('QO-Coding-Body-Content-ACE').style.fontSize='11px';
    // Coding.ace.session.setUseWrapMode(true);
    // Coding.ace.setShowPrintMargin(false);

    Coding.ace.container.style.lineHeight = 1.2
    Coding.ace.renderer.updateFontSize()

    // Not sure why I have to do this...
    $('#QO-Coding-Body-Content-ACE').css('background-color','rgba(17,25,31,0.24)')
    $('#QO-Coding-Body-Content-ACE .ace_gutter')
       .css('background-color','rgba(44,44,44,0.24)')
       .css('color','rgba(144,144,144,0.24)')

    // LineBox   
    /*
    var lineBody  = 'QO-Coding-Body-Header-Patterns-list'
    var lineMode  = 'ace/mode/javascript'
    var lineTheme = 'ace/theme/tomorrow_night_eighties'
    Coding.lines = ace.edit(lineBody)
    Coding.lines.setOptions({
      autoScrollEditorIntoView: true,
    })
    Coding.lines.setTheme(lineTheme)
    Coding.lines.session.setMode(lineMode)
    Coding.lines.session.$worker.send("changeOptions", [{asi: true}]);
    Coding.lines.container.style.lineHeight = 1.25
    */
  }

  // Extend with Coding.remote
  if (typeof Coding.extend == 'function') { Coding.extend() }
}

Coding.resize = function() {
  var narrow = window.innerWidth < 900 ? true : false

  if (Coding._layout) {
    Coding.unsplit()
  }

  if (narrow) {
    $('#QO-Coding')
      .removeAttr('style')
      .css('top', (5) + 'px')
      .css('height', (Math.max(460, $('#output').height() * 0.35)) + 'px')
      .css('width', ($('#output').width() - 0) + 'px')
  } else {
    $('#QO-Coding')
      .removeAttr('style')
      .css('top', '8px')
      .css('height', (Math.max(660, $('#output').height() * 0.85)) + 'px')
      .css('width', ($('#output').width() * 0.55) + 'px')
  }

  $('#QO-Coding-Header-Close')
    .css('width', $('#QO-Coding-Header').height() + 'px')
    
  $('#QO-Coding-Navigator')
    .css('top', $('#QO-Coding-Header').height() + 'px')
    .css('height', 'calc(100% - ' + $('#QO-Coding-Header').height() + 'px')
    
  $('#QO-Coding-Navigator-Content')
    .css('top', $('#QO-Coding-Header-Submenu').height() + 'px')
    .css('height', 'calc(100% - ' + $('#QO-Coding-Header-Submenu').height() + 'px - ' + $('#QO-Coding-Navigator-Footer').height() + 'px')
    
  $('#QO-Coding-Body')
    .css('top', $('#QO-Coding-Header').height() + 'px')
    .css('height', 'calc(100% - ' + $('#QO-Coding-Header').height() + 'px')
    .css('left', 'calc(' + $('#QO-Coding-Navigator').width() + 'px + 2px')
    .css('width', 'calc(100% - ' + $('#QO-Coding-Navigator').width() + 'px - 2px - 2px')

  $('#QO-Coding-Body-Content')
    .css('top', ($('#QO-Coding-Body-Header').height() + 1) + 'px')
    .css('height', 'calc(100% - ' + $('#QO-Coding-Body-Header').height() + 'px - ' + $('#QO-Coding-Footer').height() + 'px - 3px')

  $('#QO-Coding-Body-Content-ACE')
    .css('top', '0%')
    .css('height', 'calc(100% - 5px)')

  // DNW
  Coding.ace.resize()
  // $('#QO-Coding-Body-Content-ACE .ace_gutter' ).height($('#QO-Coding-Body-Content-ACE').height())
  // $('.ace_content').height($('#QO-Coding-Body-Content-ACE').height())

}
