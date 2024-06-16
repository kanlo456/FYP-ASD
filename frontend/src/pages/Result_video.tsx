import {
  Button,
  Card,
  CardMedia,
  Paper,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

const ResultVideoPage: React.FC = () => {
  const location = useLocation();
  const result: any[] = location.state.result.result;
  const videoPath = location.state.result.filePath;
  console.log(videoPath);

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
            item.label = item.label.replace("_", "");
            console.log(typeof item.score);
            return (
              <Paper
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  mb: "20px",
                }}
              >
                {item.label == "Headbanging" && (
                  <Typography variant="h4">Head banging</Typography>
                )}
                {item.label == "Spinning" && (
                  <Typography variant="h4">Spinning</Typography>
                )}
                {item.label == "Armflapping" && (
                  <Typography variant="h4">Arm flapping</Typography>
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
export default ResultVideoPage;
