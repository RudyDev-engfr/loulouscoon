import { GetStaticProps, GetStaticPaths } from 'next'
import { Box, Typography, Button, Dialog, IconButton, useMediaQuery, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Image from 'next/image'
import { useState } from 'react'
import fs from 'fs'
import path from 'path'
import { getCatSlug } from '@/lib/cat'

type CatType = 'kitten' | 'breeder'
type CatAvailability = 'Disponible' | 'Réservé' | 'Adopté'

interface Cat {
  id: string
  name?: string | null
  slug?: string | null
  dateOfBirth?: string | null
  sex?: 'Male' | 'Female' | null
  type?: CatType | null
  availability?: CatAvailability | null
  vaccines?:
    | {
        vaccineName?: string | null
        dateGiven?: string | null
      }[]
    | null
  chip?: {
    number?: string | null
    dateInserted?: string | null
  } | null
  colors?: string[] | string | null
  details?: string | null
  pictures?: string[] | null
}

interface CatProps {
  cat: Cat
}

interface Database {
  cats: Cat[]
}

const getDbPath = () => path.join(process.cwd(), 'data', 'db.json')

const getAllCats = (): Cat[] => {
  const filePath = getDbPath()
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const db: Database = JSON.parse(fileContent)
  return Array.isArray(db.cats) ? db.cats : []
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cats = getAllCats()

  const paths = cats
    .filter(cat => cat.name && cat.id)
    .map(cat => ({
      params: { slug: getCatSlug(cat) },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<CatProps> = async ({ params }) => {
  const slug = String(params?.slug || '')
  const cats = getAllCats()

  const cat = cats.find(item => getCatSlug({ id: item.id, name: item.name ?? '' }) === slug) || null

  if (!cat) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      cat,
    },
  }
}

const calculateAge = (dateOfBirth: string | null | undefined): number | null => {
  if (!dateOfBirth) return null

  const birthDate = new Date(dateOfBirth)
  const ageDifMs = Date.now() - birthDate.getTime()
  const ageDate = new Date(ageDifMs)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return ''

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }

  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const CatPage: React.FC<CatProps> = ({ cat }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const pictures = cat.pictures ?? []
  const hasPictures = pictures.length > 0

  const openViewer = (index: number) => {
    setActiveImageIndex(index)
    setViewerOpen(true)
  }

  const closeViewer = () => {
    setViewerOpen(false)
  }

  const handleClickThumbnail = (index: number) => {
    setActiveImageIndex(index)
  }

  const showPrev = () => {
    if (!pictures.length) return
    setActiveImageIndex(prev => (prev === 0 ? pictures.length - 1 : prev - 1))
  }

  const showNext = () => {
    if (!pictures.length) return
    setActiveImageIndex(prev => (prev === pictures.length - 1 ? 0 : prev + 1))
  }

  const age = calculateAge(cat.dateOfBirth)
  const displayColors = Array.isArray(cat.colors) ? cat.colors.join(', ') : cat.colors || ''

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1100px',
          mx: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {cat.name}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          <Box>
            {hasPictures ? (
              <>
                <Box
                  onClick={() => openViewer(activeImageIndex)}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 340, sm: 460, md: 560 },
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#f3f0eb',
                    cursor: 'zoom-in',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  }}
                >
                  <Image
                    src={pictures[activeImageIndex] ?? ''}
                    alt={`Photo de ${cat.name}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 700px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'flex-start', sm: 'center' },
                    gap: 1.5,
                    mt: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  {pictures.map((picture, index) => (
                    <Box
                      key={`${picture}-${index}`}
                      onClick={() => handleClickThumbnail(index)}
                      sx={{
                        width: { xs: 92, sm: 80 },
                        height: { xs: 92, sm: 80 },
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border:
                          index === activeImageIndex
                            ? '2px solid #c9a46a'
                            : '2px solid transparent',
                        boxShadow:
                          index === activeImageIndex
                            ? '0 4px 14px rgba(0,0,0,0.18)'
                            : '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={picture}
                        alt={`Miniature de ${cat.name}`}
                        fill
                        sizes="(max-width: 600px) 92px, 80px"
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <Typography variant="subtitle1">Pas d&rsquo;images disponibles.</Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Sexe : {cat.sex || 'Non renseigné'}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Date de naissance : {formatDate(cat.dateOfBirth ?? '')}{' '}
              {age !== null && `(${age} ans)`}
            </Typography>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Couleurs : {displayColors || 'Non renseigné'}
            </Typography>

            {cat.details && (
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                {cat.details}
              </Typography>
            )}

            {cat.vaccines && cat.vaccines.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Vaccins
                </Typography>

                {cat.vaccines.map((vaccine, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 0.5 }}>
                    {vaccine.vaccineName} - {formatDate(vaccine.dateGiven ?? '')}
                  </Typography>
                ))}
              </Box>
            )}

            {cat.availability === 'Disponible' && cat.type === 'kitten' && (
              <Box mt={4}>
                <Button variant="contained" color="primary">
                  Adopte moi
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog
        open={viewerOpen}
        onClose={closeViewer}
        fullScreen={isMobile}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.96)',
            width: isMobile ? '100%' : '100vw',
            height: isMobile ? '100%' : '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: 0,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={closeViewer}
            sx={{
              position: 'absolute',
              top: { xs: 14, sm: 20 },
              right: { xs: 14, sm: 20 },
              zIndex: 3,
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.12)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {pictures.length > 1 && (
            <>
              <IconButton
                onClick={showPrev}
                sx={{
                  position: 'absolute',
                  left: { xs: 10, sm: 20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <IconButton
                onClick={showNext}
                sx={{
                  position: 'absolute',
                  right: { xs: 10, sm: 20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}

          <Box
            sx={{
              position: 'relative',
              width: { xs: '90vw', sm: '88vw' },
              height: { xs: '82vh', sm: '90vh' },
            }}
          >
            <Image
              src={pictures[activeImageIndex] ?? ''}
              alt={`Photo de ${cat.name}`}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default CatPage
