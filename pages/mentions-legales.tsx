// pages/mentions-legales.tsx

import { Box, Container, Typography } from '@mui/material'
import Seo from '@/components/molecules/Seo'

export default function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Consultez les mentions légales du site Des Loulou Coon's, élevage familial de Maine Coon situé à Arthenac en Charente-Maritime."
        canonical="/mentions-legales"
      />

      <Container maxWidth="md">
        <Box py={{ xs: 5, md: 7 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
            }}
          >
            Mentions légales
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Conformément aux dispositions de la loi pour la confiance dans l’économie numérique, les
            présentes mentions légales ont pour objet d’identifier l’éditeur et l’hébergeur du site
            internet louloucoons.fr.
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Éditeur du site
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Nom de l’élevage : Des loulou coon&apos;s
            <br />
            Responsable de publication : Piron Aurélie
            <br />
            Statut : Micro bénéfice agricole
            <br />
            SIRET : 891 596 157 00026
            <br />
            Adresse : 8 Chez Bourdet, 17520 Arthenac
            <br />
            Email : deslouloucoons@outlook.fr
            <br />
            Téléphone : 06 71 16 94 38
            <br />
            Site internet : louloucoons.fr
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Hébergement
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Le site est hébergé par :
            <br />
            Vercel Inc.
            <br />
            440 N Barranca Avenue #4133
            <br />
            Covina, CA 91723
            <br />
            États-Unis
            <br />
            Site internet : https://vercel.com
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Création du site
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Site réalisé par Rudy Prévaud.
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Propriété intellectuelle
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            L’ensemble des contenus présents sur ce site, notamment les textes, photographies,
            images, graphismes, logo, éléments visuels et éléments de mise en page, est protégé par
            le droit de la propriété intellectuelle.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Sauf mention contraire, les contenus présents sur le site sont la propriété de l’élevage
            Des loulou coon&apos;s ou sont utilisés avec autorisation. Toute reproduction,
            représentation, modification, publication, adaptation ou exploitation, totale ou
            partielle, est interdite sans autorisation préalable.
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Données personnelles
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Le site Des loulou coon&apos;s ne propose pas de création de compte utilisateur, de
            paiement en ligne ou d’espace personnel.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Les données personnelles éventuellement transmises par contact direct avec l’élevage,
            notamment par email, téléphone ou messagerie externe, sont utilisées uniquement afin de
            répondre aux demandes des visiteurs et d’assurer le suivi des échanges.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Conformément à la réglementation applicable en matière de protection des données
            personnelles, toute personne peut demander l’accès, la rectification ou la suppression
            des données la concernant en contactant l’éditeur du site à l’adresse suivante :
            deslouloucoons@outlook.fr.
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Cookies
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Le site peut utiliser des cookies strictement nécessaires à son bon fonctionnement. À ce
            jour, aucun outil de mesure d’audience, de publicité ciblée ou de suivi marketing n’est
            indiqué comme étant utilisé sur le site.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Si des outils de statistiques, de mesure d’audience ou de suivi sont ajoutés
            ultérieurement, une information spécifique pourra être mise en place.
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
            Responsabilité
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            L’éditeur du site s’efforce de fournir des informations aussi précises que possible.
            Toutefois, il ne peut garantir l’exactitude, la complétude ou l’actualité permanente des
            informations diffusées sur le site.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Les informations relatives aux chats, chatons, disponibilités, réservations ou portées
            sont données à titre indicatif et peuvent évoluer. Pour toute information à jour, les
            visiteurs sont invités à contacter directement l’élevage.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
