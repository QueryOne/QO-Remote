Coding = typeof Coding != 'undefined' ? Coding : {}

Coding.cookie = 'QO-saved-code'

Coding.open   = function() { $('#QO-Coding').css('display','inline-block') } 
Coding.close  = function() { $('#QO-Coding').css('display','none') }
Coding.toggle = function() { $('#QO-Coding').css('display') == 'none' ? Coding.open() : Coding.close() }

Coding.initial = function() {
  Coding.css()
  Coding.render()
  Coding.resize()
  Coding.behaviours()
  Coding.treeSetup()
  $('#subpanel-3').contextmenu(function(e) {
    Coding.resize()
    return false
  })
}

Coding.generate = function(type) {
  let uuid = Utilities.uuids

  let t = type.toProperCase()
  let i = {
    name    : 'Unnamed ' + t,
    type    : type,
    id      : uuid(),
  }
  switch (type) {
      case 'folder':
         i.children = []
         i.desc = ''
         break
      case 'trigger':
      case 'alias':
         i.patterns = []
      case 'script':
         i.output   = ``
      default: 
         break;
  }
  
  var $tree = $('#QO-Coding-Navigator-Content')
  // var data = JSON.parse($tree.tree('toJson'))
  var node = $tree.tree('getSelectedNode')
  if (!node) {
    $tree.tree('appendNode', i)
  } else if (node.type == 'trigger' || node.type == 'alias' || node.type == 'script') {
    console.log('Cannot manufacture within.')
    // Go up to the parent folder
    $tree.tree('addNodeAfter', i, node)
    $tree.tree('openNode', node)
    $tree.tree('selectNode', node.getNextNode())
  } else {
    $tree.tree('appendNode', i, node)
    $tree.tree('openNode', node)
  }
}

Coding.treeSetup = function(data) {
  // Sample Data Structure
  System = Coding.load(null, true)
  System = System || Coding.sampleData
  var data = data || System
      data = Coding.processTree(data)
  
  /*
  var data = data || Coding.sampleData
  data = Coding.processTree(data)
  */

  var $tree = $('#QO-Coding-Navigator-Content')

  // Deselect nodes if not clicking on anything in particular  
  /*
  $tree
     .off('click')
     .on('click', function(e) {
       if (e.target.closest('#QO-Coding-Navigator-Content ul')) {
         // something is selected, do nothing
       } else {
         $('#QO-Coding-Navigator-Content')
            .tree('selectNode') // deselect everything
            .trigger('tree.select')
         $('#QO-Coding-Body-Header-Name-input').val('')
         $('#QO-Coding-Body-Header-Patterns-textarea').val('')
         Coding.ace.session.setValue('')
       }
     })
  */

  // Create Node tree
  $tree.tree({
      data           : data,
      dragAndDrop    : true,
      showEmptyNode  : true,
      buttonLeft     : false,
      useContextMenu : true,
      slide          : false,
      autoOpen       : 0,
      openFolderDelay: 340,
      animationSpeed : 80,
      closedIcon     : '+',
      openedIcon     : '&ndash;',
      
      saveState      : 'QX-tree',
      
      // Only allow Folder-type to contain other nodes
      onCanMoveTo    : function(moved_node, target_node, position) {
        if (target_node.type == 'folder') {
            return true;
        } else {
            if (position == 'inside') { return (position == 'after') }
            return position;
        }
      },
      // Formatting
      onCreateLi: function(node, $li, is_selected) {

        // Directory display, non-essential
        var pre = '&boxvr;'
        for (var i = 0; i < node.parent.children.length; i++) {
           var item = node.parent.children[i]
           if (item.name == node.name && i == node.parent.children.length - 1) {
             pre = '&boxur;'
             break;
           }
        }
        if (node.parent.parent == null) {
           pre = ''
        }
        pre = '<span class="mute">' + pre + '</span>'

        // Styling different types of nodes 
        switch(node.type) {
          case('folder') : pre += ' <div class="QO-Coding-Item folder"></div>';  break;
          case('alias')  : pre += ' <div class="QO-Coding-Item alias"></div>';   break;
          case('trigger'): pre += ' <div class="QO-Coding-Item trigger"></div>'; break;
          case('script') : pre += ' <div class="QO-Coding-Item script"></div>';  break;
          default:
            break;
        }

        $li.find('.jqtree-title')
           // helps us replace the content later
           .html('<span class="QO-coding-title-anchor">' + $li.find('.jqtree-title').html() + '</span>') 
           .prepend('<span class="mute">' + pre + '</span> ')
           .append('<div class="QO-Coding-Item-closer" onclick="Coding.closeItem(this)">x</div>')
        
      },
  });

  // Linkify Body-Content with Node
  $tree.on('tree.click', function(event) {
    var node = event.node
    var type = node.type

    // Save some data before we move off
    Coding.lastState = Coding.lastState || {}
    Coding.lastState.patterns = $('#QO-Coding-Body-Header-Patterns-textarea').val()
    
    switch(type) {
      case 'alias':
      case 'trigger':
        var patterns = ''
        if (typeof node.patterns != 'undefined' && node.patterns.length > 0) {
          for (var i = 0; i < node.patterns.length; i++) {
            patterns += (i==0 ? '' : '\n') + node.patterns[i]
          }
        }
        $('#QO-Coding-Body-Header-Patterns-textarea').val(patterns)
      case 'folder':
      default:
        $('#QO-Coding-Body-Header-Name-input').val(node.name)
        if (typeof node.output != 'undefined') {
          Coding.ace.session.setValue(node.output)
        } else if (typeof node.desc != 'undefined') {
          Coding.ace.session.setValue('/*\n  ' + node.desc.split('\n').join('\n  ') + '\n */')
        } else {
          Coding.ace.session.setValue('')
        }
        break;
    }
    if (type == 'folder' || type == 'script') {
      $('#QO-Coding-Body-Header-Patterns-textarea').val('')
      $('#QO-Coding-Body-Header-Patterns-textarea').addClass('invalid').attr('disabled',true)
      $('#QO-Coding-Body-Header-Patterns-pre').addClass('invalid')
    } else {
      $('#QO-Coding-Body-Header-Patterns-textarea').removeClass('invalid').attr('disabled',false)
      $('#QO-Coding-Body-Header-Patterns-pre').removeClass('invalid')
    }
  })

  // Resolves deltas between old & new state on deselection/other-selection
  var anchorPattern = /\<span class\="QO-coding-title-anchor"\>(.*?)\<\/span\>/
  $tree.on('tree.select', function(event) {
    var oldNode  = Coding.last
    if (oldNode) {
      var newName = oldNode.element.innerHTML
      if (newName.match(anchorPattern) && typeof newName.match(anchorPattern)[1] != 'undefined') {
        oldNode.name = newName.match(anchorPattern)[1]
      }

      if (oldNode.type == 'trigger' || oldNode.type == 'alias') {
        var p = Coding.lastState.patterns.split('\n')
        if (p.length > 0) { oldNode.patterns = p }
      }

      if (typeof oldNode.output != 'undefined') {
        
      }
    }
    if (event.node === null) {
      $('#QO-Coding-Body-Header-Name-input').val('')
      $('#QO-Coding-Body-Header-Patterns-textarea').val('')
      $('#QO-Coding-Body-Header-Patterns-textarea').addClass('invalid').attr('disabled',true)
      $('#QO-Coding-Body-Header-Patterns-pre').addClass('invalid')
      Coding.ace.session.setValue('')
    }
    Coding.last = event.node
  })

  $tree.on('tree.contextmenu', function(event) {
    console.log(event)
    // The clicked node is 'event.node'
    var node = event.node
    $tree.tree('selectNode', node)

    var type = node.type

    // Save some data before we move off
    Coding.lastState = Coding.lastState || {}
    Coding.lastState.patterns = $('#QO-Coding-Body-Header-Patterns-textarea').val()
    
    switch(type) {
      case 'alias':
      case 'trigger':
        var patterns = ''
        if (typeof node.patterns != 'undefined' && node.patterns.length > 0) {
          for (var i = 0; i < node.patterns.length; i++) {
            patterns += (i==0 ? '' : '\n') + node.patterns[i]
          }
        }
        $('#QO-Coding-Body-Header-Patterns-textarea').val(patterns)
      case 'folder':
      default:
        $('#QO-Coding-Body-Header-Name-input').val(node.name)
        if (typeof node.output != 'undefined') {
          Coding.ace.session.setValue(node.output)
        } else if (typeof node.desc != 'undefined') {
          Coding.ace.session.setValue('/*\n  ' + node.desc.split('\n').join('\n  ') + '\n */')
        } else {
          Coding.ace.session.setValue('')
        }
        break;
    }
    if (type == 'folder' || type == 'script') {
      $('#QO-Coding-Body-Header-Patterns-textarea').val('')
      $('#QO-Coding-Body-Header-Patterns-textarea').addClass('invalid').attr('disabled',true)
      $('#QO-Coding-Body-Header-Patterns-pre').addClass('invalid')
    } else {
      $('#QO-Coding-Body-Header-Patterns-textarea').removeClass('invalid').attr('disabled',false)
      $('#QO-Coding-Body-Header-Patterns-pre').removeClass('invalid')
    }
  })
}

Coding.behaviours = function() {
  /* Main */
  // Make Main resizable
  $('#QO-Coding').resizable({
    ghost    :  true,
    helper   : 'ui-resizable-helper',
    maxHeight: $('#container').height() - $('#panel').height() - 10,
    minHeight: 260,
    maxWidth : $('#container').width() - 22,
    minWidth : 360,
    handles  : 'all',
    stop     : function() {
       setTimeout(function() {
        Coding.ace.resize(); 
        Coding.ace.renderer.updateFull();
       }, 40)
    },
  }).draggable({
    handle   : '#QO-Coding-Header, #QO-Coding-Navigator-Footer, #QO-Coding-Footer',
    containment: [0 - ($('#container').width() - 22), 0 - $('#QO-Coding').height() + 45, window.innerWidth + 355, window.innerHeight - 25],
  })
  
  /* Header */
  // Close Main
  $('#QO-Coding-Header-Close')
     .off('click')
     .on('click', function(e) {
       Coding.close()
     }) 

  // Split-screen
  $('#QO-Coding-Header-Splitter')
     .off('click')
     .on('click', function(e) {
       Coding.toggleSplit()
     })
  
  // Make Navigator resizable
  $('#QO-Coding-Navigator').resizable({
    handles  : 'e', // only resize to the right
    minWidth : 360 * 0.4,
    maxWidth : $('#QO-Coding-Navigator').width() + 11, // 11 is the webkit scrollbar width
    kidney   : '#QO-Coding-Body',
  })
  
  // Make Body-Header resizable
  $('#QO-Coding-Body-Header').resizable({
    handles  : 's',
    minHeight: 50,
    maxHeight: Math.max(0.5 * $('#QO-Coding-Body').height(), 160),
    spine    : '#QO-Coding-Body-Content',
  })

  // When the content of Body-Header-Name changes, change the tree's display but do not save it
  var anchorPattern = /\<span class\="QO-coding-title-anchor"\>.+?\<\/span\>/
  $('#QO-Coding-Body-Header-Name-input').on('keyup', function(e) {
    var text = e.target.value
    var node = $('#QO-Coding-Navigator-Content').tree('getSelectedNode')
    if (node) {
      node.element.innerHTML = node.element.innerHTML.replace(
        anchorPattern, '<span class="QO-coding-title-anchor">' + text + '</span>')
      // make change to underlying structure
      node.name = text
    }
  })

  $('#QO-Coding-Body-Header-Patterns-textarea').on('keyup', function(e) {
    var text = e.target.value
    var node = $('#QO-Coding-Navigator-Content').tree('getSelectedNode')
    if (node) {
      
    }
  })

  $('#QO-Coding-Body-Content').on('keyup', function(e) {
    var text = Coding.ace.session.getValue()
    var node = $('#QO-Coding-Navigator-Content').tree('getSelectedNode')
    if (node) {
      node.output = text
    }
  })
  
  Coding.enterMain = function() { $('body').trigger('QO-Coding-moused') }
  Coding.exitMain  = function() { $('body').trigger('QO-Coding-unmoused') }
  document.getElementById('QO-Coding').addEventListener('mouseenter', Coding.enterMain);
  document.getElementById('QO-Coding').addEventListener('mouseleave', Coding.exitMain);
}

Coding.closeItem = function(item) {
  let $tree = $('#QO-Coding-Navigator-Content')
  let node  = $tree.tree('getNodeByHtmlElement', item.parentNode)
  let name  = node.name
  
  // https://jqueryui.com/dialog/#modal-confirmation
  $('#QO-Coding-Dialog').dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        ["Delete permanently?"]: function() {
          $tree.tree('removeNode', node)
          $(this).dialog( "close" );
        },
        Cancel: function() {
          console.log('Do not delete.')
          $(this).dialog( "close" );
        }
      },
      title: '?Delete ' + name + '',
      closeText: 'x',
      classes: { // https://api.jqueryui.com/dialog/#theming
        "ui-dialog": "QO-Coding-DialogStyle",
        "ui-dialog-titlebar": "QO-Coding-DialogTitle",
        "ui-dialog-titlebar-close": "QO-Coding-DialogClose",
        "ui-dialog-content": "QO-Coding-DialogContent",
        "ui-dialog-buttonpane": "QO-Coding-DialogButtons",
      },
      // classes: ['QO-Coding-DialogStyle'],
    })
}

Coding.info = function(msg, type) {
  switch(type) {
    case 'error':
      msg = '<span class="darkred">[<span class="red">error</span>]</span> <span class="magenta">' + msg + '</span><br />'
      break;
    case 'success':
      msg = '<span class="black">&laquo; <span class="seagreen">success</span> &raquo;</span> <span class="turquoise">' + msg + '</span><br />'
      break;
    default: break;
  }
  Core.printdown(msg)
}

Coding.load = function(address, suppress) {
  let print = Coding.info
  let addr  = address || Coding.cookie

  if (typeof localStorage == 'undefined') {
    print('Unable to access localStorage.', 'error')
    return false
  } else if (typeof localStorage.getItem(addr) != 'string') {
    if (!suppress) {
      print('No correct file available at "<span class="white">' + addr + '</span>" within <span class="sysecho">localStorage</span>.', 'error')
    }
    return false
  }
  let sys = JSON.parse(localStorage.getItem(addr))
  print('Retrieved system from <span class="mute">localStorage(<span class="white">' + Coding.cookie + '</span>)</span>.', 'success')
  return sys
}

Coding.save = function(address) {
  console.log('Attempting to save system now. System:')
  var system = JSON.parse($('#QO-Coding-Navigator-Content').tree('toJson'))
  console.log(system)
  Coding.processTree(system)

  let print = Coding.info
  let addr  = address || Coding.cookie

  if (typeof localStorage == 'undefined') {
    print('Unable to access localStorage', 'error')
    return false
  }
  localStorage.setItem(addr, JSON.stringify(system))
  print('Successfully saved system to <span class="mute">localStorage(<span class="white">' + addr + '</span>)</span>.', 'success')
}

Coding.processTree = function(data) {
  var uuid = Utilities.uuids

  var f = function(obj) {
    for (var key in obj) {
       let item = obj[key]
       // Assign a uuid
       if (typeof item.id == 'undefined') { item.id = uuid() }
       
       if (item.type == 'folder' && item.children != null) {
         f(item.children)
       } else {
         if (item.type == 'trigger') {
           item.patterns.forEach(function(trigger, index) {
             Triggers.update(trigger, item.output, item.name, item.id + '-index-' + index)
           })
         }
         if (item.type == 'alias') {
           item.patterns.forEach(function(alias, index) {
             Aliases.update(alias, item.output, item.name, item.id)
           })
         }
         if (item.type == 'script') {
           Scripts.test(item.output)
         }
       }
    }
  }
  f(data)
  return data
}

Coding.toggleSplit = function() {

  // we probably want to invoke a UI-Manager rather than wrapping our own manipulation of #output in Coding

  if (Coding._layout) {
    Coding.unsplit()
  } else {
    Coding.split()
  }  
}


Coding.split = function() {
  var $output = $('#output-container')
  var $coding = $('#QO-Coding')
  
  if ($output.data('draggable')) { $output.draggable('destroy') }
  if ($output.data('resizable')) { $output.resizable('destroy') }
  if ($coding.data('draggable')) { $coding.draggable('destroy') }
  if ($coding.data('resizable')) { $coding.resizable('destroy') }
  document.getElementById('QO-Coding').removeEventListener('mouseenter', Coding.enterMain );
  document.getElementById('QO-Coding').removeEventListener('mouseleave', Coding.exitMain  );
  
  Coding._layout = {
    outputLeft  : $output.css('left'),
    outputTop   : $output.css('top'),
    outputHeight: $output.css('height'),
    outputWidth : $output.css('width'),
    codingLeft  : $coding.css('left'),
    codingTop   : $coding.css('top'),
    codingHeight: $coding.css('height'),
    codingWidth : $coding.css('width'),
  }

  $output.css({
    left  : '0%',
    top   : '0%',
    height: '100%',
    width : '43%',
  })
  $coding.css({
    left  : '43%',
    top   : '0%',
    height: '100%',
    width : '57%',
  })
  $('#QO-Coding-Header-Splitter').css('background-image','url("./core/resources/unsplit.png")')
  Core.scroll()
  Coding.ace.resize(); 
  Coding.ace.renderer.updateFull();
}

Coding.unsplit = function() {
  var $output = $('#output-container')
  var $coding = $('#QO-Coding')

  $output.css({
    left  : Coding._layout.outputLeft,
    top   : Coding._layout.outputTop,
    height: Coding._layout.outputHeight,
    width : Coding._layout.outputWidth,
  })
  $coding.css({
    left  : Coding._layout.codingLeft,
    top   : Coding._layout.codingTop,
    height: Coding._layout.codingHeight,
    width : Coding._layout.codingWidth,
  })
  Core.scroll()
  document.getElementById('QO-Coding').addEventListener('mouseenter', Coding.enterMain );
  document.getElementById('QO-Coding').addEventListener('mouseleave', Coding.exitMain  );

  $coding.resizable({
    ghost    :  true,
    helper   : 'ui-resizable-helper',
    maxHeight: $('#container').height() - $('#panel').height() - 10,
    minHeight: 260,
    maxWidth : $('#container').width() - 22,
    minWidth : 360,
    handles  : 'all',
  }).draggable({
    handle   : '#QO-Coding-Header'
  })
  $('#QO-Coding-Header-Splitter').css('background-image','url("./core/resources/splitscreen.png")')
  
  Coding._layout = null
}
