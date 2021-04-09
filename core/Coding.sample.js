
Coding = typeof Coding != 'undefined' ? Coding : {}

Coding.samplesCredit = `
credit = typeof credit != 'undefined' ? credit : {}

credit.reset = function() {
  credit.collation = []
  $('.credit-anchor')
     .removeClass('credit-replaceable')
     .removeAttr('onmouseover').removeAttr('onmouseout');
}
credit.reset()

credit.summation = function(m) {
  var comma  = Utilities.commaThis
  var lpad   = Utilities.lpad
  var rpad   = Utilities.rpad
  
  var number = parseInt(m[2].replace(/[^0-9]/g,''))
  var cost   = parseInt(m[3].replace(/[^0-9]/g,''))

  sub({
    method: 'inline-substitution',
    target: m[1],
    output: '',
  })
  sub({
    method: 'inline-substitution',
    target: m[2],
    output: '<span class="darkyellow">' + lpad(comma(number), 9) + '</span> credit',
  })
  sub({
    method: 'inline-substitution',
    target: m[3],
    output: '<span class="yellow">' + lpad(comma(cost), 8) + '</span> gold',
  })
  
  var cum = 0
  var last = credit.collation[(credit.collation.length - 1)]
  if (last) {
    cum = number * cost + last.cum
  } else { cum = number * cost }
  credit.collation.push({number: number, cost: cost, sum: number * cost, cum: cum})
  
  var mode = 'hover'
  var output  = '.'
      output += '<span class="credit-anchor credit-replaceable" '
      if (mode == 'hover') {
       output += 'onmouseover="credit.display(this, \\'' + (credit.collation.length - 1) + '\\')" '
       output += 'onmouseleave="credit.disguise()">'
      } else {
       output += 'onmouseover="credit.show(this, \\'' + cum + '\\')" '
       output += 'onmouseleave="credit.hide()">'
      }
      output += ' <span class="darkyellow">'
      output += lpad(comma(number * cost), 12)
      output += '</span> gold</span>'
  
  sub({
    method: 'inline-substitution',
    target: '.',
    output: output,
  })
}

credit.display = function(e, index) {
  var comma  = Utilities.commaThis
  var lpad   = Utilities.lpad
  var len    = $('.credit-replaceable').length
  for (var k = 0; k < (len-1); k++) {
    var v  = credit.collation[k].sum
    var el = $('.credit-replaceable')[k]
        el.children[0].classList.remove('topaz', 'credit-cumulative')
        el.children[0].classList.add('darkyellow')
        el.children[0].innerHTML = lpad(comma(v), 12)
  }
  
  for (var k = 0; k < (parseInt(index) + 1); k++) {
    var v  = credit.collation[k].cum
    var el = $('.credit-replaceable')[k]
        el.children[0].classList.remove('darkyellow')
        el.children[0].classList.add('topaz', 'credit-cumulative')
        el.children[0].innerHTML = lpad(comma(v), 12)
  }
}

credit.disguise = function() {
  var comma  = Utilities.commaThis
  var lpad   = Utilities.lpad
  
  $('.credit-replaceable').each(function(index, el){
    var v = credit.collation[index].sum
    el.children[0].classList.remove('topaz', 'credit-cumulative')
    el.children[0].classList.add('darkyellow')
    el.children[0].innerHTML = lpad(comma(v), 12)
  })
}

credit.show = function(e, v) {
  var comma   = Utilities.commaThis
  var r       = e.getBoundingClientRect()
  var offsetX = r.right + 13
  var offsetY = r.top

  var d  = ''
      d += '<div class="credit-display" style="font-family:\\'Lekton\\'; font-size:9pt;'
      d += ' position: absolute; z-index: 44; left: ' + offsetX + 'px; top: ' + offsetY + 'px;'
      d += ' height: 16px; width: auto; padding-left: 2px; '
      d += ' background-color: rgba( 1, 1, 1, 0.88 ); border-radius: 3px;"'
      d += '><span class="darkyellow">' + comma(v) + '</span><span class="mute"> cum.</span>'
      d += '</div>'
  $('#container').append(d)
}

credit.hide = function() {
  $('.credit-display').remove()
}
`

Coding.samplesShop = `
var comma  = Utilities.commaThis
var lpad   = Utilities.lpad

var count = matches[3]
var price = matches[4]

append('<span class="topaz">' + lpad(comma(count * price), 11) + '</span> <span class="mute">gold</span>')
`

Coding.samplesCodingOpacification = `
$('body')
  .off('QO-Coding-moused')
  .off('QO-Coding-unmoused')
  .on('QO-Coding-moused', function() { 
    $('#QO-Coding').css('opacity','100%') })
  .on('QO-Coding-unmoused', function() {
    $('#QO-Coding').css('opacity','45%')
  })
`

Coding.sampleData = [
    { name: 'Utilities',
      type: 'folder',
      desc: 'Feel free to delete with impunity.',
      children: [
        { name: 'http.link',
          type: 'trigger',
          patterns: [
           '^[\\S\\s]*([Hh]ttps?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)?)[\\S\\s]*$',
          ],
          output: ` Triggers.ignore(true)\n var url = matches[1]\n sub({\n   method: 'inline-substitution',\n   target: url,\n   output: '<a href="' + url + '" target="_blank">' + url + '</a>'\n })`,
        },
        { name: '`js, Execute Javascript',
          type: 'alias',
          patterns: [
           '^`js[ ]+(.*)$',
          ],
          output: ' var x = eval(matches[1])\n display(x)\n console.log(x)',
        },
        { name: 'TIMEOUT', 
          type: 'trigger', 
          patterns: ['^You will TIMEOUT in 1 minute unless you do something\\.$'], 
          output: ' Core.send("p nothing")',
        },
        { name: 'codebox behaviour',
          type: 'script',
          output: Coding.samplesCodingOpacification,
        },
      ]
    },
    { name: 'Samples',
      type: 'folder',
      desc: 'Feel free to also delete this with impunity.',
      children: [
        { name: 'credit.summation',
          type: 'trigger',
          patterns: [
           '^([ ]+)(\\d+ credit)s* at (\\d+ gold) per credit\\.$',
          ],
          output: ' credit.summation(matches)',
        },
        { name: 'credit.reset',
          type: 'trigger',
          patterns: [
           '^Credits currently available for purchase\:$',
          ],
          output: ' credit.reset()',
        },
        { name: 'credit',
          type: 'script',
          output: Coding.samplesCredit,
        },
        { name: 'shop.summative',
          type: 'trigger',
          patterns: [
           '^[ ]+(.+?) (.+?)[ ]+(\\d+)[ ]+(\\d+)gp$',
          ],
          output: Coding.samplesShop,
        },
      ],
    }
  ];
