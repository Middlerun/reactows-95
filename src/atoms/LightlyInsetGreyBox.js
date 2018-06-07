import GreyBox from './GreyBox'

const borderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gYHCwcvbQqZTwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAiSURBVAjXLcFBAQAwCAQgXDKbafPzM6jdDcyMB90NKkl8B77rCL0xJqapAAAAAElFTkSuQmCC'

export default GreyBox.extend`
  border-width: 1px;
  border-style: solid;
  border-image: url('${borderImage}') 1;
`
