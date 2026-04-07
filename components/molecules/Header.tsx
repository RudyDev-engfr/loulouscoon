import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos chats', href: '/chats' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state)
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#ede7de',
          color: '#1f1a17',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 76, md: 88 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 4 },
            width: '100%',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0,
            }}
          >
            <img
              src="/images/logo-aurelie.jpeg"
              alt="Chatterie des Loulou Coon's"
              style={{
                width: '58px',
                height: '58px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Link>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="ouvrir le menu"
              onClick={toggleDrawer(true)}
              sx={{
                ml: 'auto',
                color: '#2a211d',
                '&:hover': {
                  color: '#b32626',
                  backgroundColor: 'rgba(179, 38, 38, 0.08)',
                },
              }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                ml: 'auto',
              }}
            >
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      transition: '0.2s ease',
                      '&:hover': {
                        color: '#b32626',
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 260 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Menu</Typography>
          </Box>

          <List>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemButton>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* espace pour compenser le header fixe */}
      <Toolbar sx={{ minHeight: { xs: 72, md: 88 } }} />
    </>
  )
}
