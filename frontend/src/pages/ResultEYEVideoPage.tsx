import {
  Button,
  Card,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

const ResutlEYEVideoPage: React.FC = () => {
  const location = useLocation();
  const result: any[] = location.state.result.result;
  const videoPath = location.state.result.filePath;
  console.log(videoPath);
  console.log(location);

  //   console.log(Object.values(result[0]))
  return (
    <Box sx={{ display: "felex", justifyContent: "center", p: 5 }}>
      <Stack>
        <Card>
          <CardMedia
            sx={{}}
            component={"video"}
            src={`http://127.0.0.1:8000/${videoPath}`}
            controls
          ></CardMedia>
        </Card>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#2196f3", display: "flex", justifyContent: "center" }}
          >
            Result
          </Typography>
          {result.map((item: any) => {
            return (
              <Paper
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  mb: "20px",
                }}
              >
                {item.label == "Non_asd_eye_contact" && (
                  <Typography variant="h4">No ASD eye contact</Typography>
                )}
                {item.label == "ASD_eye_contact" && (
                  <Typography variant="h4">ASD eye contact</Typography>
                )}
                <Typography variant="h5">
                  Score: {item.score.toString().substr(2, 2)} %
                </Typography>
              </Paper>
            );
          })}
        </Stack>
        <Button href="/">Back to Home</Button>
      </Stack>
    </Box>
  );
};
export default ResutlEYEVideoPage;
