import { Grid } from "@mui/material"
import Navbar from "../components/Navbar"
import ImageBox from "../components/ImageBox";

const HomePage: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <ImageBox title="ASD Face Detect" content="This column is detecting your children face." buttonText="Start" imagePath="src/assets/images/asd-face.jpeg" />
            </Grid>
            <Grid item xs={12}>
                <ImageBox title="ASD Behaviour" content="This column detect the Behaviour" buttonText="Start" imagePath="src/assets/images/behaviour.jpg" />
            </Grid>
        </Grid>
    )
}

export default HomePage;