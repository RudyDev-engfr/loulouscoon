import { Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(theme => ({
  rootButton: {
    backgroundColor: 'lightgrey',
  },
}))

const CatCardButton = () => {
  const { classes, cx } = useStyles()

  return <Button className={classes.rootButton}>En savoir plus</Button>
}
export default CatCardButton
