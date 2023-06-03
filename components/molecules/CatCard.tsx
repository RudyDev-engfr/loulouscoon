import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'CatCard' })(theme => ({
  cardRoot: {
    backgroundColor: 'lightgrey',
  },
}))

const CatCard = () => {
  const { classes, cx } = useStyles()
  const [reverseCard, setReverseCard] = useState(false)
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card className={classes.cardRoot} sx={{ width: isXs ? '85vw' : '450px' }}>
      <CardActionArea onClick={() => setReverseCard(true)}>
        <CardContent>
          <Box>
            <Typography>Bob</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CatCard
