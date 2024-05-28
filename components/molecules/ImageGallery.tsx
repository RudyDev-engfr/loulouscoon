import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

const ImageGallery: React.FC<{ pictures: { link?: string }[] }> = ({ pictures }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handleClickThumbnail = (index: number) => {
    setActiveImageIndex(index)
  }

  if (!pictures || pictures.length === 0) {
    return (
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Pas d'images disponibles.
      </Typography>
    )
  }

  return (
    <>
      <Box
        sx={{
          width: 'calc(100vw - 30px)',
          height: '50vh',
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <Image
          src={pictures[activeImageIndex]?.link ?? ''}
          alt="Image principale du chat"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {pictures.slice(0, 5).map((picture, index) => (
          <Box
            key={index}
            sx={{
              width: 'calc(20% - 10px)',
              height: '60px',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => handleClickThumbnail(index)}
          >
            <Image
              src={picture?.link ?? ''}
              alt={`Miniature ${index + 1} du chat`}
              layout="fill"
              objectFit="cover"
              style={{ border: index === activeImageIndex ? '2px solid blue' : 'none' }}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ImageGallery
