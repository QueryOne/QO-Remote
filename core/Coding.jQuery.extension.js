// https://stackoverflow.com/a/27174920

$.ui.plugin.add('resizable', 'kidney', {
  start: function() {
    var that = $(this).resizable('instance'),
           o = that.options,
      _store = function(x) {
        $(x).each(function() {
          var u = $(this)
              u.data('ui-resizable-kidney', {
                width : parseInt(u.width(),     10),
                height: parseInt(u.height(),    10),
                left  : parseInt(u.css('left'), 10),
                top   : parseInt(u.css('top'),  10),
              })
        })
      }
   
    if (typeof(o.kidney) === 'object' && !o.kidney.parentNode) {
      if (o.kidney.length) {
        o.kidney = o.kidney[0]
        _store(o.kidney)
      } else {
        $.each(o.kidney, function(x) {
          _store(x) 
        })
      }
    } else {
      _store(o.kidney)
    }
  },

  resize: function(event, ui) {
    var that = $(this).resizable("instance"),
      o = that.options,
      os = that.originalSize,
      op = that.originalPosition,
      delta = {
        height: (that.size.height - os.height) || 0,
        width: (that.size.width - os.width) || 0,
        top: (that.position.top - op.top) || 0,
        left: (that.position.left - op.left) || 0
      },

      _kidney = function(exp, c) {
        $(exp).each(function() {
          var el = $(this),
            start = $(this).data("ui-resizable-kidney"),
            style = {},
            css = c && c.length ?
            c :
            el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];

          $.each(css, function(i, prop) {
            if (prop == 'width' && delta[prop] != 0) {
              style['left'] = start['left'] + delta[prop]
              style['width'] = start['width'] - delta[prop]
            }
          });
          
          /*
          $.each(css, function(i, prop) {
            var sum = (start[prop] || 0) - (delta[prop] || 0);
            if (sum && sum >= 0) {
              style[prop] = sum || null;
            }
          });
          */

          el.css(style);
        });
      };

    if (typeof(o.kidney) === "object" && !o.kidney.nodeType) {
      $.each(o.kidney, function(exp, c) {
        _kidney(exp, c);
      });
    } else {
      _kidney(o.kidney);
    }
  },
  
  stop: function() {
    $(this).removeData('resizable-kidney');
  }
})

$.ui.plugin.add('resizable', 'spine', {
  start: function() {
    var that = $(this).resizable('instance'),
           o = that.options,
      _store = function(x) {
        $(x).each(function() {
          var u = $(this)
              u.data('ui-resizable-spine', {
                width : parseInt(u.width(),     10),
                height: parseInt(u.height(),    10),
                left  : parseInt(u.css('left'), 10),
                top   : parseInt(u.css('top'),  10),
              })
        })
      }
   
    if (typeof(o.spine) === 'object' && !o.spine.parentNode) {
      if (o.spine.length) {
        o.spine = o.spine[0]
        _store(o.spine)
      } else {
        $.each(o.spine, function(x) {
          _store(x) 
        })
      }
    } else {
      _store(o.spine)
    }
  },

  resize: function(event, ui) {
    var that = $(this).resizable("instance"),
      o = that.options,
      os = that.originalSize,
      op = that.originalPosition,
      delta = {
        height: (that.size.height - os.height) || 0,
        width: (that.size.width - os.width) || 0,
        top: (that.position.top - op.top) || 0,
        left: (that.position.left - op.left) || 0
      },

      _spine = function(exp, c) {
        $(exp).each(function() {
          var el = $(this),
            start = $(this).data("ui-resizable-spine"),
            style = {},
            css = c && c.length ?
            c :
            el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];

          $.each(css, function(i, prop) {
            if (prop == 'height' && delta[prop] != 0) {
              style['height'] = start['height'] - delta[prop]
              style['top'] = start['top'] + delta[prop]
            }
          });
          
          /*
          $.each(css, function(i, prop) {
            var sum = (start[prop] || 0) - (delta[prop] || 0);
            if (sum && sum >= 0) {
              style[prop] = sum || null;
            }
          });
          */

          el.css(style);
        });
      };

    if (typeof(o.spine) === "object" && !o.spine.nodeType) {
      $.each(o.spine, function(exp, c) {
        _spine(exp, c);
      });
    } else {
      _spine(o.spine);
    }
  },
  
  stop: function() {
    $(this).removeData('resizable-spine');
  }
})
