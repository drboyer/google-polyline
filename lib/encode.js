module.exports = encode


function encode( points ) {

  var x, y
  var px = 0, py = 0
  var str = []

  for( var i = 0; i < points.length; ++i ) {
    x = points[i][0];
    y = points[i][1];

    // note the reverse order
    chars( str, sign( y - py ) )
    chars( str, sign( x - px ) )

    px = x
    py = y
  }

  return str.join('')
}

function sign( value ) {
  value *= 1e5
  if ( value < 0 ) {
    // Google's polyline algorithm uses round to -∞ for negative numbers
    value = Math.floor( 0.5 - value )
    if (value !== 0) {
      value = ~( -value << 1 )
    }
  } else {
    value = Math.round( value )
    value = value << 1
  }
  return value
}


function chars( str, value ) {
  while( value >= 0x20 ) {
    str.push(String.fromCharCode( (( value & 0x1F ) | 0x20 ) + 63 ))
    value = value >> 5
  }
  str.push(String.fromCharCode( value + 63 ))
}
