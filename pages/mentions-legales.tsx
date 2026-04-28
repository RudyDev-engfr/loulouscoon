// pages/mentions-legales.tsx

import { Box, Container, Typography } from '@mui/material'

export default function MentionsLegales() {
  return (
    <Container maxWidth="md">
      <Box py={6}>
        <Typography variant="h1" gutterBottom>
          Mentions légales
        </Typography>

        <Typography variant="body1" paragraph>
          Conformément aux dispositions de la loi pour la confiance dans l’économie numérique, les
          présentes mentions légales ont pour objet d’identifier l’éditeur et l’hébergeur du site
          internet louloucoons.fr.
        </Typography>

        <Typography variant="h2" gutterBottom>
          Éditeur du site
        </Typography>

        <Typography variant="body1" paragraph>
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

        <Typography variant="h2" gutterBottom>
          Hébergement
        </Typography>

        <Typography variant="body1" paragraph>
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

        <Typography variant="h2" gutterBottom>
          Création du site
        </Typography>

        <Typography variant="body1" paragraph>
          Site réalisé par Rudy Prévaud.
        </Typography>

        <Typography variant="h2" gutterBottom>
          Propriété intellectuelle
        </Typography>

        <Typography variant="body1" paragraph>
          L’ensemble des contenus présents sur ce site, notamment les textes, photographies, images,
          graphismes, logo, éléments visuels et éléments de mise en page, est protégé par le droit
          de la propriété intellectuelle.
        </Typography>

        <Typography variant="body1" paragraph>
          Sauf mention contraire, les contenus présents sur le site sont la propriété de l’élevage
          Des loulou coon&apos;s ou sont utilisés avec autorisation. Toute reproduction,
          représentation, modification, publication, adaptation ou exploitation, totale ou
          partielle, est interdite sans autorisation préalable.
        </Typography>

        <Typography variant="h2" gutterBottom>
          Données personnelles
        </Typography>

        <Typography variant="body1" paragraph>
          Le site Des loulou coon&apos;s ne propose pas de création de compte utilisateur, de
          paiement en ligne ou d’espace personnel.
        </Typography>

        <Typography variant="body1" paragraph>
          Les données personnelles éventuellement transmises par contact direct avec l’élevage,
          notamment par email, téléphone ou messagerie externe, sont utilisées uniquement afin de
          répondre aux demandes des visiteurs et d’assurer le suivi des échanges.
        </Typography>

        <Typography variant="body1" paragraph>
          Conformément à la réglementation applicable en matière de protection des données
          personnelles, toute personne peut demander l’accès, la rectification ou la suppression des
          données la concernant en contactant l’éditeur du site à l’adresse suivante :
          deslouloucoons@outlook.fr.
        </Typography>

        <Typography variant="h2" gutterBottom>
          Cookies
        </Typography>

        <Typography variant="body1" paragraph>
          Le site peut utiliser des cookies strictement nécessaires à son bon fonctionnement. À ce
          jour, aucun outil de mesure d’audience, de publicité ciblée ou de suivi marketing n’est
          indiqué comme étant utilisé sur le site.
        </Typography>

        <Typography variant="body1" paragraph>
          Si des outils de statistiques, de mesure d’audience ou de suivi sont ajoutés
          ultérieurement, une information spécifique pourra être mise en place.
        </Typography>

        <Typography variant="h2" gutterBottom>
          Responsabilité
        </Typography>

        <Typography variant="body1" paragraph>
          L’éditeur du site s’efforce de fournir des informations aussi précises que possible.
          Toutefois, il ne peut garantir l’exactitude, la complétude ou l’actualité permanente des
          informations diffusées sur le site.
        </Typography>

        <Typography variant="body1" paragraph>
          Les informations relatives aux chats, chatons, disponibilités, réservations ou portées
          sont données à titre indicatif et peuvent évoluer. Pour toute information à jour, les
          visiteurs sont invités à contacter directement l’élevage.
        </Typography>
      </Box>
    </Container>
  )
}
