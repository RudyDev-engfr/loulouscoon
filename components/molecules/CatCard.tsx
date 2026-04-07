import { Box, Card, CardActionArea, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'CatCard' })(theme => ({
  cardRoot: {
    backgroundColor: '#5E5E5E',
    borderRadius: 30,
    padding: 12,
    width: 300,
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 60px)',
      margin: '0 auto',
    },
  },

  // wrapper global cliquable
  actionArea: {
    borderRadius: 30,
  },

  // Zone image : ratio stable (no % height)
  imageFrame: {
    position: 'relative',
    width: '100%',
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
    aspectRatio: '4 / 5', // ✅ super stable mobile
  },

  // Footer réservé au texte (fixe)
  footer: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 2,
    paddingTop: 10,
  },

  name: {
    color: 'white',
    fontFamily: 'Great Vibes',
    fontSize: 30,
    lineHeight: 1,
  },

  sex: {
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 500,
  },
}))

type Props = {
  catName?: string
  catImage: string
  catSex?: string
  catLink?: string
}

const CatCard = ({ catName, catImage, catSex, catLink }: Props) => {
  const { classes } = useStyles()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card className={classes.cardRoot}>
      <CardActionArea
        href={catLink ?? '#'}
        className={classes.actionArea}
        sx={{ borderRadius: '30px' }}
      >
        <Box className={classes.imageFrame}>
          <Image
            src={catImage}
            alt={catName ? `Photo de ${catName}` : 'Photo du chat'}
            fill
            sizes={isXs ? 'calc(100vw - 60px)' : '300px'}
            style={{ objectFit: 'cover' }}
            priority={isXs} // optionnel (LCP mobile)
          />
        </Box>

        <Box className={classes.footer}>
          <Typography className={classes.name}>{catName ?? 'Sans nom'}</Typography>
          {!!catSex && <Typography className={classes.sex}>{catSex}</Typography>}
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default CatCard
