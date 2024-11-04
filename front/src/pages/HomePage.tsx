import React from 'react';
import { Typography, Container, Button, Box, Grid, Paper, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import firstImage from './heec.jpg'; // Example images
import secondImage from './aventures1.jpg';
import thirdImage from './aventures2.jpg';
import fourthImage from './aventures3.jpg';
import aImage from './culturelle.jpg';
import bImage from './entreprenariat.jpg';
import cImage from './formation.jpg';
import heroBackground from './shifters.jpg'; // Your background image for the hero section

const Background = styled(Box)({
  background: 'linear-gradient(485deg,#f4a261 10%,#1d3557 90%,#f4a261 20%)',
  padding: '40px 0',
});

const HeroSection = styled(Box)({
  padding: '100px 0',
  color: 'white',
  textAlign: 'center',
  backgroundImage: `url(${heroBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const HeroTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '3rem',
  marginBottom: '20px',
  color: 'black'
});

const HeroSubtitle = styled(Typography)({
  fontSize: '1.5rem',
  marginBottom: '40px',
  color: 'black'
});

const Section = styled(Box)({
  padding: '60px 0',
});

const SectionTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: '20px',
  fontSize: '2rem',
  textAlign: 'center',
  color: 'white'
});

const Content = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.1rem',
  lineHeight: 1.8,
  margin: '0 auto',
  maxWidth: '800px',
  color: '#003049'
});

const Content1 = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.1rem',
  lineHeight: 1.8,
  margin: '0 auto',
  maxWidth: '800px',
  color: '#003049'
});

const Content2 = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.1rem',
  lineHeight: 1.8,
  margin: '0 auto',
  maxWidth: '800px',
  color: 'yellow'
});

const StyledGridItem = styled(Grid)({
  textAlign: 'center',
  padding: '20px',
});

const ImageContainer = styled('div')({
  position: 'relative',
  '& img': {
    width: '100%',
    borderRadius: '8px',
  },
});

// Nouveau style pour ajouter l'effet lumineux
const StyledPaper = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f4a261',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Ombre par défaut
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 90px 10px rgba(255, 255, 255, 0.8)', // Effet lumineux
  },
});
const StyledPaper2 = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f4a261',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Ombre par défaut
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 90px 10px rgba(255, 255, 255, 0.8)', // Effet lumineux blanc
  },
});
const StyledPaper1 = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Ombre par défaut
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 0px 90px 10px rgba(255, 255, 255, 0.8)', // Effet lumineux blanc
  },
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

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <HeroTitle>Bienvenue à Shifters</HeroTitle>
          <HeroSubtitle>Révolutionner la façon dont vous gérez votre main-d'œuvre</HeroSubtitle>
          <Button variant="contained" color="primary" component={Link} to="/about">En savoir plus</Button>
        </Container>
      </HeroSection>

      <Background>
        <Container>
        <Section>
          <SectionTitle variant="h4">Notre École</SectionTitle>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
            <StyledGridItem item xs={12} md={6}>
            <Content1 variant="body1">
            Découvrez notre école et ce qui nous distingue. Nous offrons une formation de qualité avec des programmes variés et adaptés aux besoins du marché.
            </Content1>
            </StyledGridItem>
            <StyledGridItem item xs={12} md={6}>
            <StyledPaper1>
            <ImageContainer>
            < img src={firstImage} alt="Notre École" />
            </ImageContainer>
            </StyledPaper1>
            </StyledGridItem>
            </Grid>
          </Section>


          <Section>
            <SectionTitle variant="h4">Nos Aventures</SectionTitle>
            <Grid container spacing={4}>
              <StyledGridItem item xs={12} md={4}>
                <StyledPaper2>
                <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#003049', }}>
                  <ImageContainer>
                    <img src={secondImage} alt="Événement 1" />
                  </ImageContainer>
                  <Typography variant="h6" style={{ marginTop: '20px' }}></Typography>
                </Paper>
                </StyledPaper2>
              </StyledGridItem>
              <StyledGridItem item xs={12} md={4}>
              <StyledPaper2>
                <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#003049' }}>
                  <ImageContainer>
                    <img src={thirdImage} alt="Événement 2" />
                  </ImageContainer>
                  <Typography variant="h6" style={{ marginTop: '20px' }}></Typography>
                </Paper>
                </StyledPaper2>
              </StyledGridItem>
              <StyledGridItem item xs={12} md={4}>
              <StyledPaper2>
                <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#003049' }}>
                  <ImageContainer>
                    <img src={fourthImage} alt="Événement 3" />
                  </ImageContainer>
                  <Typography variant="h6" style={{ marginTop: '20px' }}></Typography>
                </Paper>
                </StyledPaper2>
              </StyledGridItem>
            </Grid>
          </Section>

          <Section>
            <SectionTitle variant="h4">Nos Groupes</SectionTitle>
            <Grid container spacing={4}>
              <StyledGridItem item xs={12} md={4}>
                <StyledPaper>
                  <ImageContainer>
                    <img src={aImage} alt="Social&&Culturel" />
                  </ImageContainer>
                  <Typography variant="h6" style={{ marginTop: '20px' }}>Social&&Culturel</Typography>
                  <Content variant="body2">
                    Participez à nos événements et découvrez nos cultures.
                  </Content>
                </StyledPaper>
              </StyledGridItem>
              <StyledGridItem item xs={12} md={4}>
                <StyledPaper>
                  <ImageContainer>
                    <img src={bImage} alt="Entreprenariat" />
                  </ImageContainer>
                  <Typography variant="h6" style={{ marginTop: '20px' }}>Entreprenariat</Typography>
                  <Content variant="body2">
                    Rejoignez-nous pour des séminaires et des ateliers inspirants.
                  </Content>
                </StyledPaper>
              </StyledGridItem>
              <StyledGridItem item xs={12} md={4}>
                <StyledPaper>
                  <ImageContainer>
                    <img src={cImage} alt="Formation" />
                  </ImageContainer>
                  <Typography variant="h6" style={{ marginTop: '20px' }}>Formation</Typography>
                  <Content variant="body2">
                    Assistez à nos conférences et développez vos compétences.
                  </Content>
                </StyledPaper>
              </StyledGridItem>
            </Grid>
          </Section>

          <Section>
            <SectionTitle variant="h4">Contact</SectionTitle>
            <Content2 variant="body1">
              Pour toute question ou information, n'hésitez pas à nous contacter.
            </Content2>
            <Content2 variant="body1">Numéro de téléphone : ********************</Content2>
            <Content2 variant="body1">Email : ********************</Content2>
            <Content2 variant="body1">Adresse postale : ********************</Content2>
            <Content variant="body1">
              Suivez-nous sur Instagram : 
            </Content>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="outlined" style={{ borderColor: 'orange', color: 'orange' }} component={Link} to="https://www.instagram.com/shifters.heec/">Instagram</Button>
            </Box>
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

export default HomePage;
