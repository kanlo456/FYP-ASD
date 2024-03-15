import Stack from '@mui/material/Stack';
import ResponsiveAppBar from './components/navbar'
import AsdSHowImage from './components/asd_image';
import { Grid } from '@mui/material';
// import AsdImage from './components/'

function App() {
  return(
    <Stack spacing={2}>
      <ResponsiveAppBar/>
      <Grid item xs={12}>
      <AsdSHowImage/>
      </Grid>
    </Stack>
  )
}

export default App
