import GreyBox from './GreyBox'

export const borderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gYHCCwHLIlyhQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA6SURBVAjXdc3BCYBQDATRF/n995DOkkriQRC/6BxnGTZmZryICAuq6paZCdcA3b1Vhx/WM99+MF/FCasiDhjDfoTeAAAAAElFTkSuQmCC'

export const borderImageInset = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gYHCDUwDzR+kgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVAjXdcvBCcAgAMXQZ3EQR3ETV3FTR/k9FAoWm2NCCuJDEhXmnK8cY8AToPe+XZcfCrLW2mRrTU1yPG5zLg5jI7D2pAAAAABJRU5ErkJggg=='

export default GreyBox.extend`
  border-width: 2px;
  border-style: solid;
  border-image: url('${({inset}) => inset ? borderImageInset : borderImage}') 2;
`
