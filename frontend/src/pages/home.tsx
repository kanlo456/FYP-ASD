import { Container, Grid } from "@mui/material";
import ImageBox from "../components/ImageBox";

const HomePage: React.FC = () => {
  const imageContext = [
    {
      title: "ASD Face Detect",
      content: "This column is detecting your children face.",
      buttonText: "Start",
      imagePath: "src/assets/images/asd-face.jpeg",
      path: "/face_detection",
    },
    {
      title: "ASD Behaviour",
      content: "This column detect the Behaviour",
      buttonText: "Start",
      imagePath: "src/assets/images/behaviour.jpg",
      path: "/behaviour_detection",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: "1rem" }}>
      <Grid container spacing={2}>
        {imageContext.map((item) => {
          return (
            <Grid item xs={12}>
              <ImageBox {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default HomePage;
