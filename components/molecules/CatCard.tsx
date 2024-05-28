// components/molecules/CatCard.tsx
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'CatCard' })(theme => ({
  cardRoot: {
    backgroundColor: '#5E5E5E',
    width: '300px',
    height: '60vh', // Use vh for responsive height
    padding: '12px',
    borderRadius: '30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 60px)',
      height: 'calc(100vw - 60px)', // Adjusted height for responsiveness
    },
  },
  imageContainer: {
    width: '100%',
    height: '40vh', // Fixed height using vh
    position: 'relative',
    borderRadius: '30px 30px 0 0', // Rounded corners only at the top
    overflow: 'hidden',
  },
  cardContentRoot: {
    padding: '12px',
    textAlign: 'center',
    backgroundColor: '#5E5E5E',
    borderRadius: '0 0 30px 30px',
  },
  catImage: {
    objectFit: 'cover',
  },
}))

interface Props {
  catName?: string
  catImage: string
  catSex?: string
  catLink?: string
}

const CatCard: React.FC<Props> = ({ catName, catImage, catSex, catLink }) => {
  const { classes } = useStyles()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card className={classes.cardRoot} sx={{ width: isXs ? '85vw' : '300px', margin: 'auto' }}>
      <CardActionArea href={catLink ?? '#'}>
        <Box className={classes.imageContainer}>
          <Image
            src={catImage}
            alt={`Image of ${catName}`}
            fill
            className={classes.catImage}
            sizes="(max-width: 600px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Typography sx={{ color: 'white', fontFamily: 'Great Vibes', fontSize: '20px' }}>
            {catName ?? 'Bob'}
          </Typography>
          {catSex && (
            <Typography sx={{ color: 'white', fontFamily: 'Great Vibes', fontSize: '16px' }}>
              {catSex}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CatCard
