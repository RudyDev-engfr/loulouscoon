import { Box, Card, CardActionArea, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({ name: 'CatCard' })(theme => ({
  cardRoot: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '100%',
    maxWidth: 380,
    overflow: 'hidden',
    boxShadow: '0 14px 35px rgba(0,0,0,0.12)',

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 40px)',
      maxWidth: 430,
      margin: '0 auto',
    },
  },

  reservedCard: {
    boxShadow: '0 14px 35px rgba(183,28,28,0.14)',
  },

  actionArea: {
    borderRadius: 30,
  },

  imageFrame: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    aspectRatio: '4 / 3.55',
  },

  footer: {
    minHeight: 230,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '28px 40px 34px',
    backgroundColor: '#fff',
  },

  topLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  name: {
    color: '#1f1f1f',
    fontFamily: 'Great Vibes',
    fontSize: 34,
    lineHeight: 1,
  },

  sexPill: {
    backgroundColor: '#eeeeee',
    color: '#222',
    borderRadius: 999,
    padding: '7px 14px',
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },

  colorText: {
    color: '#666',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 500,
  },

  statusBanner: {
    width: 'fit-content',
    maxWidth: '100%',
    borderRadius: 999,
    padding: '7px 14px',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0.15,
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },

  reservedBanner: {
    background: 'rgba(183, 28, 28, 0.10)',
    color: '#b71c1c',
    border: '1px solid rgba(183, 28, 28, 0.22)',
  },

  availableBanner: {
    background: 'rgba(46, 125, 50, 0.10)',
    color: '#2e7d32',
    border: '1px solid rgba(46, 125, 50, 0.22)',
  },

  defaultBanner: {
    background: '#eeeeee',
    color: '#333',
    border: '1px solid transparent',
  },

  priceSeparator: {
    opacity: 0.55,
    fontWeight: 500,
  },

  priceText: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },

  details: {
    color: '#666',
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 1.55,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
}))

type Props = {
  catName?: string
  catImage: string
  catSex?: string
  catLink?: string
  availability: string | null | undefined
  catColors?: string[]
  catDetails?: string
  catPrice?: number | null
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

const CatCard = ({
  catName,
  catImage,
  catSex,
  catLink,
  availability,
  catColors,
  catDetails,
  catPrice,
}: Props) => {
  const { classes, cx } = useStyles()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))

  const normalizedAvailability = availability
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const isReserved = normalizedAvailability === 'reserve'
  const isAvailable = normalizedAvailability === 'disponible'
  const isAdopted = normalizedAvailability === 'adopte'

  const shouldDisplayPrice =
    !isAdopted &&
    catPrice !== null &&
    catPrice !== undefined &&
    Number.isFinite(catPrice) &&
    catPrice >= 0

  const statusLabel = isReserved ? 'Réservé ❤️' : isAvailable ? 'Disponible' : availability

  return (
    <Card className={cx(classes.cardRoot, isReserved && classes.reservedCard)}>
      <CardActionArea
        href={catLink ?? '#'}
        className={classes.actionArea}
        sx={{ borderRadius: '30px' }}
      >
        <Box className={classes.imageFrame}>
          {catImage && (
            <Image
              src={catImage}
              alt={catName ? `Photo de ${catName}` : 'Photo du chat'}
              fill
              sizes={isXs ? 'calc(100vw - 40px)' : '380px'}
              style={{
                objectFit: 'cover',
                filter: isReserved ? 'grayscale(10%) brightness(0.94)' : 'none',
              }}
              priority={isXs}
            />
          )}
        </Box>

        <Box className={classes.footer}>
          <Box className={classes.topLine}>
            <Typography className={classes.name}>{catName ?? 'Sans nom'}</Typography>

            {!!catSex && <Typography className={classes.sexPill}>{catSex}</Typography>}
          </Box>

          {!!catColors?.length && (
            <Typography className={classes.colorText}>{catColors.join(', ')}</Typography>
          )}

          {!!statusLabel && (
            <Box
              className={cx(
                classes.statusBanner,
                isReserved && classes.reservedBanner,
                isAvailable && classes.availableBanner,
                !isReserved && !isAvailable && classes.defaultBanner
              )}
            >
              <span>{statusLabel}</span>

              {shouldDisplayPrice && (
                <>
                  <span className={classes.priceSeparator}>•</span>

                  <span className={classes.priceText}>{formatPrice(catPrice)}</span>
                </>
              )}
            </Box>
          )}

          {!!catDetails && <Typography className={classes.details}>{catDetails}</Typography>}
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default CatCard
