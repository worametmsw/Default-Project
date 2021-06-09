/**
 * See `./tailwind.config.js` for color code reference
 * @param {string} color
 */
 const setColor = (color) => {
    let _color = color
  
    if (color === 'black') _color = '#333333'
    if (color === 'gray') _color = '#7D7D7D'
    if (color === 'white') _color = '#ffffff'
    if (color === 'primary-blue') _color = '#5CE1E6'
    if (color === 'secondary-blue') _color = '#4349eb'
    if (color === 'danger') _color = '#EB5757'
    if (color === 'disabled') _color = '#BDBDBD'
    if (color === 'success') _color = '#6FCF97'
  
    return _color
  }
  
  export default setColor
  