/* Core Module */
Core = typeof Core != 'undefined' ? Core : {}

Core._address    = Core._address    || 'achaea.com/socket/'
Core._protocol   = Core._protocol   || 'binary'
Core._binaryType = Core._binaryType || 'arraybuffer'
Core._scrollback = Core._scrollback || false
Core._ping       = Core._ping       || false

Core._loopTick      = Core._loopTick        || 0
Core._loopFrequency = Core._loopFrequency   || 650

Core.options = typeof Core.options != 'undefined' ? Core.options : {}
// Initial Options
Core.options.lineTrim = Core.options.lineTrim || 600
Core.options.lineThreshold = Core.options.lineThreshold || 1200

/* Helper functions */
Core.ready = function() {
  Core.cacheDOM()
  Core.h = Core._output_.scrollHeight - Core._output_.scrollTop;
  /*
    window.cancelAnimationFrame(Core.animation)
    Core.animation = window.requestAnimationFrame(Core.loop)
   */
}

// Cache jQuery/DOM selections
Core.cacheDOM = function() {
  Core._output    = $('#output')
  Core._output_   = document.getElementById('output')
  Core._addenda   = $('#addenda')
  Core._input     = $('#input')
  Core._container = $('#container')
}

// List of initial instructions to pass to the Preloader
Core.preloader = function() {
  // Replace the websocket's methods if it exists already
  if (Core._handler instanceof WebSocket) {
    Core._handler.onopen     = Core.open
    Core._handler.onmessage  = Engine.receive
    Core._handler.onclose    = Core.close
  }

  Utilities.ready()
  Engine.ready()
  Client.drawPanel()
  Client.redraw()
  Client.ready()
  Client.behaviours()
  Core.ready()
  
  GMCPHandler.ready()  // This can be quite game specific, so going to leave it here
  Coding.initial()
  
  Events.reset()
  Events.setup()
  
  $('#subpanel-3').attr('onclick','Coding.toggle()')
  // Coding.close()

  sub = function(m,n) {
    Triggers.subg({target:m, output:n})
  }
  append = function(str) {
    Triggers.append({output: str})
  }

  // Triggers.make('\\b(the)\\b','sub(matches[1], "<span class=\'red\'>" + matches[1] + "</span>")','the+')
  // Triggers.make('\\b(and)\\b','sub(matches[1], "<span class=\'red\'>" + matches[1] + "</span>")','and+')
  
  /*
  // We make one Alias
  Aliases.make('^`js[ ]+(.*)$','let u; let t = matches[1]; try { u = eval(t) } catch(err) { console.log(err) }; display(u); console.log(eval(t));')
  // and several Triggers

  gag = function(str) {
    Triggers.replace(str)
  }

  Triggers.make('^You will TIMEOUT in 1 minute unless you do something\.$','Core.send(\'p nothing\')','TIMEOUT+')
  Triggers.make(
    '^[\\S\\s]*([Hh]ttps?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)?)[\\S\\s]*$',
    `Triggers.ignore(true)
     var url = matches[1]
     console.log(Utilities.clone(matches))
     sub(matches[1], 'A')
    `,
    'link')
  Triggers.make('^Password correct\\. Welcome to Achaea\\.$','setTimeout(function() { Core.send(\'rankings pks | rankings pks tysandr\') }, 4300)','Tysandr')
  Triggers.make('^You see exits leading (.+)\\.$',
    `append(" <span class=\'violent\'>A</span>");
    `,
    'exits+')

  Triggers.make('^\\s+?([a-z]+[0-9]+) (.+?)\\s+?(\\d+)\\s+?(\\d+)gp$','shops.output(matches[3], matches[4])','shop.summative')
  Scripts.test(`
    shops = typeof shops != 'undefined' ? shops : {}
    shops.output = function(c, p) {
     var comma  = Utilities.commaThis
     var lpad   = Utilities.lpad
     var count = c
     var price = p

     append('<span class="topaz">' + lpad(comma(count * price), 11) + '</span> <span class="mute">gold</span>')
    }
  `)
  // Triggers.make('\\b(journal)\\b','sub(matches[1], "<span class=\'red\'>" + matches[1] + "</span>")','journal+')
  
  people = ['Tysandr','Penwize','Lyndee','Farrah','Baliuk','Van','Katalyst','Atalkez','Dunn','Vhaynna','Yen','Shirszae','Darrod','Drican','Kya','Saonji']
  for (var i = 0, len = people.length; i < len; i++) {
    Triggers.make('\\b(' + people[i] + ')\\b',
     `Triggers.ignore(true); sub(matches[1], "<span class=\'red\'>" + matches[1] + "</span>")`,
     people[i] + '+')
  }
  */
  
  // Triggers.make('a hefty shovel','append(" <span class=\'red\'><<<</span>")')
}

/* Core UI Functions */
// See below for scroll handling
Core.print = function(line) {
  if (Core._scrollback) { Core._addenda.append(line) }
  /* jQuery version */
  // Core._output.append(line)
  /* Pure Javascript version */
  fastdom.mutate(function() {
    /*
    var e = document.createElement('div')
        e.innerHTML = line
    document.getElementById('output').append(e) // fragment attachment
    */
    let c = document.createDocumentFragment()
    let e = document.createElement('div')
        e.className = 'packet'
        e.innerHTML = line
    document.getElementById('output').appendChild(e)
    // document.getElementById('output').insertAdjacentHTML('beforeend', line)
  })
}

Core.printdown = function(msg) {
  Core.print(msg)
  fastdom.measure(function() { // var h = Core._output_.scrollHeight;
    fastdom.mutate(function() { Core._output_.scrollTop = Core._output_.scrollHeight })
  })
}

// Loop using requestAnimationFrame for high precision rather than setTimeout,
//   and run heartbeat function that examines the buffer
Core.loop = function() {
  if ((window.performance.now() - Core._loopTick) > Core._loopFrequency || Core._loopTick == 0) {
    Core.heartbeat()
    Core._loopTick = window.performance.now()
  }
  window.requestAnimationFrame(Core.loop)
}

// Trim the buffer
Core.heartbeat = function() {
  let options = Core.options
  let count   = Math.max(options.lineThreshold, options.lineTrim)
  let rcount  = Math.min(options.lineThreshold, options.lineTrim)
  // this has to be dynamically created
  if (Client.lineCount() > count) {
     var perf = new Date().getTime()
     Client.lineCount(rcount)
     $('.QO-line:lt(' + rcount + ')').remove()

     var now = new Date().getTime()
     console.log((now - perf) + ' ms to perform cleanup.')
  }
  // Nexus' implementation
  /*
    output = $(selector +" .output_scrollback div.line");
    if (output.length >= scrollback_msg_limit)
    {
        var elem = output.slice(0, output.length - scrollback_msg_limit);
        var h = 0;
        elem.each(function() { h += $(this).height(); });
        var scrollback = $(selector +" .output_scrollback");
        var scroll = scrollback.scrollTop();
        elem.remove();
        scrollback.scrollTop(scroll - h);
        scrollback.prop('spos', scrollback.prop("scrollTop"));
    }
  */
}

Core.buffer = function() {
  let options = Core.options
  let count   = Math.max(options.lineThreshold, options.lineTrim)
  let rcount  = Math.min(options.lineThreshold, options.lineTrim)
  var c = Core._output_.childNodes.length
  var n = Math.min(Core._output_.childNodes.length - 100, rcount)
  if (c > count) {
    var perf = new Date().getTime()
    for (var i = 0; i < n; i++) {
      Core._output_.removeChild(Core._output_.childNodes[i])
    }
    var now = new Date().getTime()
    console.log((now - perf) + ' ms to perform cleanup.')
  }
  // this has to be dynamically created
  /*
  if (Client.lineCount() > count) {
     Client.lineCount(rcount)
     $('.QO-line:lt(' + rcount + ')').remove()
  }*/
}

/* Core Processing Functions */
Core.parcel = function(input) {
  var x = Aliases.process(input)
  if (!x) {
    Core.send(input, Math.random() > 0.01 ? true : false) 
  }
}

Core.send = function(input, ping) {
  input += '\r\n'
  var a = input.split('')
  for (var i = 0, len = a.length; i < len; i++) { 
    a[i] = a[i].charCodeAt(0)
  }

  // Ping, prepend request
  if (ping) {
    Core._ping = new Date().getTime()
    let u = [255, 250, 201,67, 111, 114, 101, 46, 80, 105, 110, 103, 255, 240]
    // literally, IAC SB GMCP Core.Ping IAC SE 
    a = u.concat(a)
  }

  a = new Uint8Array(a)
  // !Important
  if (typeof Core._handler != 'undefined' && Core._handler.readyState == 1) {
    Core._handler.send(a)
  } else {
    Core.printdown('<span class="darkred">Not connected: </span><span class="normal">' + input + '</span>')
  }
}

Core.Uint8 = function(str) { Core._handler.send(new Uint8Array(str)) }


/* Connection */
Core.tryConnect = function(args) {
  if (Core._handler) {
    if (Core._handler.readyState === 1) {
      $('body').trigger('connection-existing')
      return
    }
  }
  Core.connect(args)
}

Core.connect = function(args) {
  var a = args[2]
  var p = args[3]

  var address = Core._address
  if (a) { address = a }

  if (Core._protocol) {
    Core._handler = new WebSocket('wss://' + address,  Core._protocol)
  } else {
    Core._handler = new WebSocket('wss://' + address)
  }
  Core._handler.binaryType = Core._binaryType || 'arraybuffer'
  Core._handler.onopen     = Core.open
  Core._handler.onmessage  = Engine.receive
  Core._handler.onclose    = Core.close
  $('body').trigger('connecting')
}

Core.open = function(e) {
  Core._address   = Core._handler.url.replace('wss://','')
  Core._session   = new Date()
  Core._connected = true
  console.log('Connected to wss://' + Core._address + ' successfully.')
  $('body').trigger('connected')
}

Core.close = function(e) {
  // Set connectors
  Core._connected = false
  Core._handshake = 0
  // Close Engine
  Engine.close()
  // Retrieve metrics
  var packets, lines = Engine.metrics();
  
  console.log('Disconnected from server wss://' + Core._address + '.')
  // Fire event
  $('body').trigger('disconnected', [packets, lines])
}

/* Scroll Handling */
Core.scroll = function() {
  if (Core._scrollback) {
    fastdom.measure(function() { var h = document.getElementById('addenda').scrollHeight;
      fastdom.mutate(function() { Core._addenda.scrollTop(h) })
    })
  } else {
    fastdom.measure(function() { var h = Core._output_.scrollHeight - Core._output_.scrollTop;
      fastdom.mutate(function() {
        Core._output_.scrollTop = Core._output_.scrollHeight - h;
      })
    })
  }
}

Core._scrollbackHandler = function() {
  let f = 80
  let e = Core._output_
  let d = e.scrollHeight
  let p = e.scrollTop
  let h = e.clientHeight
  let o = d - (p + h)

  if (o < f) {
    Core._scrollback = false
    if (!Core._addenda.hasClass('hidden')) { Core._addenda.addClass('hidden'); Core._addenda.empty() }
  } else {
    Core._scrollback = true
    if (Core._addenda.hasClass('hidden')) { Core._addenda.removeClass('hidden') }
  }
}

Core._doubleclickHandler = function() {
  fastdom.mutate(function() {
    Core._output_.scrollTop = Core._output_.scrollHeight
  })
  Core._addenda.addClass('hidden').empty()
  Core._scrollback = false
  Core._input.select()
}

/* Visualisation */
Core.closedown = function(args) {
  var p = args[0]
  var c = args[1]
  var d  = Utilities.interval(Core._session, new Date())
  var s  = ''
      s += d.days + ' days '
      s += d.hrs  + ' hrs '
      s += d.mins + ' mins '
      s += d.secs + ' secs '
      s += d.msecs+ ' msecs'
  /* jQuery version */
  var g  = ''
      g += '<div class="QO-line normal"></div>'
      g += '<div class="QO-line normal">  <span class="sysecho"><span class="mute">Session duration :</span> ' + s + '</span></div>'
      g += '<div class="QO-line normal">  <span class="sysecho"><span class="mute">Packets processed:</span> ' + p + '</span></div>'
      g += '<div class="QO-line normal">  <span class="sysecho"><span class="mute">Lines processed  :</span> ' + c + '</span></div>'

  Core.printdown(g)
}

// Triggers.make('^Total credits for sale\:', 'Core.send(\'p nothing\')','testkit')
// Triggers.make('(?:^|\\s)the(?:^|\\s)','sub(matches[0],"<span class=\'violent\'>" + matches[0] + "</span>")','the+')
// Triggers.make('\\bequilibrium\\b','sub(matches[0],"<span class=\'red\'>" + matches[0] + "</span>")','equilibrium+')
// Triggers.make('\\bbalance\\b','sub(matches[0],"<span class=\'turquoise\'>" + matches[0] + "</span>")','balance+')
