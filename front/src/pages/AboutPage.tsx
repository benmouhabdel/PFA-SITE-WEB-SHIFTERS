import React from 'react';
import { Container, Box, Typography, Paper, Grid, styled } from '@mui/material';

// Importation des images locales
import firstImage from './1.jpg';
import secondImage from './2.jpg';
import fiveImage from './5.jpg';
import fourImage from './4.jpg';
import sevenImage from './7.jpg';

const Background = styled(Box)({
  background: 'linear-gradient(135deg, #1d3557 70%, #f4a261 90%)',
  padding: '40px 0',
});
const Header = styled(Box)({
  textAlign: 'center',
  padding: '60px 0',  // Ajustez la valeur du padding pour réduire l'espace vertical
  marginTop: '-40px',  // Utilisez une marge négative pour le déplacer vers le haut
  color: 'white',
  background: 'linear-gradient(145deg, #FF8E53 10%, #003566 50%, #FF8E53 10%)',
});


const Title = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 700,
  fontSize: '3rem',
});

const Section = styled(Box)({
  padding: '60px 0',
});

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: '20px',
  fontSize: '2rem',
  textAlign: 'center',
  color:'white'
});

const Content1 = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.3rem',
  lineHeight: 1.8,
  margin: '0 auto',
  maxWidth: '900px',
   padding: '20px',
   color:'yellow'
});


const Content = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.1rem',
  lineHeight: 1.8,
  margin: '0 auto',
  maxWidth: '800px',
  color:'yellow'
});

const StyledGridItem = styled(Grid)({
  textAlign: 'center',
  padding: '20px',
  
});

const Image = styled('img')({
  width: '100%',
  borderRadius: '8px',
 
});

const Footer = styled(Box)({
  height: '50px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  position: 'fixed',
  bottom: 0,
});

const AboutPage: React.FC = () => {
  return (
    <>
      <Background>
        <Header>
          <Container>
            <Title variant="h6">À propos de nous</Title>
            <Typography variant="h5">Découvrez notre histoire, notre mission et nos valeurs</Typography>
          </Container>
        </Header>

        <Container>
          <Section>
            <SectionTitle variant="h4">Notre Histoire</SectionTitle>
            <Grid container spacing={4}>
              <StyledGridItem item xs={12} md={6}>
                <Image src={sevenImage} alt="Notre Histoire" />
              </StyledGridItem>
              <StyledGridItem item xs={12} md={6}>
                <Content1 variant="body1">
                  Nous avons commencé notre voyage il y a quelque temps  avec une vision claire : offrir des solutions innovantes et direct pour répondre aux défis modernes en ce formant et se confrontant a la realite.  Notre équipe passionnée et expérimentée travaille sans relâche pour garantir la satisfaction d abord de nous meme puis des gens qui nous entour.
                </Content1>
              </StyledGridItem>
            </Grid>
          </Section>

          <Section>
            <SectionTitle variant="h4">Notre Mission</SectionTitle>
            <Grid container spacing={4}>
              <StyledGridItem item xs={12} md={6}>
                <Content1 variant="body1">
                  Notre mission est de fournir des services de la plus haute qualité tout en respectant les valeurs fondamentales d'intégrité, d'innovation et de collaboration. Nous croyons fermement en l'impact positif que nous pouvons avoir sur la communauté et sur les projets de nos partenaires.
                </Content1>
              </StyledGridItem>
              <StyledGridItem item xs={12} md={6}>
                <Image src={secondImage} alt="Notre Mission" />
              </StyledGridItem>
            </Grid>
          </Section>

          <Section>
            <SectionTitle variant="h4">Nos Valeurs</SectionTitle>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#023047' }}>
                  <Image src={firstImage} alt="Innovation" />
                  <Typography variant="h6" style={{ marginTop: '20px',color: 'white' }}>Innovation</Typography>
                  <Content variant="body2">
                    Nous cherchons constamment à innover et à améliorer nos méthodes et nos produits pour rester à la pointe de la technologie.
                  </Content>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#023047' }}>
                  <Image src={fourImage} alt="Intégrité" />
                  <Typography variant="h6" style={{ marginTop: '20px',color: 'white' }}>Intégrité</Typography>
                  <Content variant="body2">
                    Nous agissons toujours avec honnêteté et transparence, en respectant nos engagements envers nous meme et nos partenaires.
                  </Content>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#023047' }}>
                  <Image src={fiveImage} alt="Collaboration" />
                  <Typography variant="h6" style={{ marginTop: '15px',color: 'white' }}>Collaboration</Typography>
                  <Content variant="body2">
                    Nous croyons en la force du travail d'équipe et en la collaboration avec nos membres pour atteindre les meilleurs résultats.
                  </Content>
                </Paper>
              </Grid>
            </Grid>
          </Section>
        </Container>
      </Background>
      <Footer>
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <Typography variant="body2" color="yellow">
            &copy; 2024 Shifters--Heec. Created by Abderrahman Benmouh.
          </Typography>
        </Container>
      </Footer>
    </>
  );
};

export default AboutPage;