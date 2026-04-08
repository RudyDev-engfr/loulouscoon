import { GetStaticProps, GetStaticPaths } from 'next'
import { Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import fs from 'fs'
import path from 'path'

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

const slugify = (value: string): string => {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const getCatSlug = (cat: Cat): string => {
  if (cat.slug) return cat.slug
  return slugify(cat.name || '')
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cats = getAllCats()

  const paths = cats
    .filter(cat => cat.name)
    .map(cat => ({
      params: { slug: getCatSlug(cat) },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as { slug: string }
  const cats = getAllCats()

  const cat = cats.find(cat => getCatSlug(cat).toLowerCase() === slug.toLowerCase()) || null

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

  const handleClickThumbnail = (index: number) => {
    setActiveImageIndex(index)
  }

  const age = calculateAge(cat.dateOfBirth)

  const displayColors = Array.isArray(cat.colors) ? cat.colors.join(', ') : cat.colors || ''

  return (
    <Box sx={{ width: '100vw', padding: '30px' }}>
      <Box sx={{ paddingTop: '50px' }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            {cat.name}
          </Typography>

          <Typography variant="subtitle1">Sexe: {cat.sex}</Typography>

          <Typography variant="subtitle1">
            Date de naissance: {formatDate(cat.dateOfBirth ?? '')} {age !== null && `(${age} ans)`}
          </Typography>

          <Typography variant="subtitle1">Couleurs: {displayColors}</Typography>

          {cat.details && (
            <Typography variant="body1" marginTop={2}>
              {cat.details}
            </Typography>
          )}

          {cat.vaccines && (
            <Box marginTop={2}>
              <Typography variant="h6">Vaccins</Typography>
              {cat.vaccines.map((vaccine, index) => (
                <Typography key={index} variant="body1">
                  {vaccine.vaccineName} - {formatDate(vaccine.dateGiven ?? '')}
                </Typography>
              ))}
            </Box>
          )}

          <Box
            sx={{
              width: 'calc(100vw - 60px)',
              maxWidth: '600px',
              height: 'auto',
              position: 'relative',
              margin: '20px auto',
            }}
          >
            {cat.pictures && cat.pictures.length > 0 ? (
              <>
                <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
                  <Image
                    src={cat.pictures[activeImageIndex] ?? ''}
                    alt={`Image of ${cat.name}`}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: '10px' }}
                  />
                </Box>

                <Box display="flex" justifyContent="center" marginTop={2} gap={1}>
                  {cat.pictures.slice(0, 5).map((picture, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: '60px',
                        height: '60px',
                        position: 'relative',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        border:
                          index === activeImageIndex ? '2px solid blue' : '2px solid transparent',
                      }}
                      onClick={() => handleClickThumbnail(index)}
                    >
                      <Image
                        src={picture}
                        alt={`Thumbnail of ${cat.name}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <Typography variant="subtitle1">Pas d&rsquo;images disponibles.</Typography>
            )}
          </Box>

          {cat.availability === 'Disponible' && cat.type === 'kitten' && (
            <Box mt={2}>
              <Button variant="contained" color="primary">
                Adopte moi
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default CatPage
