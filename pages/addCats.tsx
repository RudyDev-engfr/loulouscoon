import { Box, Button, FormControl } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import AddIcon from '@mui/icons-material/Add'

const useStyles = makeStyles({ name: 'AddCatsPage' })(theme => ({}))
const AddCats = () => {
  const { classes, cx } = useStyles()
  const handleSubmit = data => {}
  return (
    <Box>
      <FormControl>
        <Button variant="contained" component="label">
          Ajouter des photos
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </FormControl>
    </Box>
  )
}
export default AddCats
