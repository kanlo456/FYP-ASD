import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

const ResultVideoPage: React.FC = () => {
  const location = useLocation();
  const result: any[] = location.state.result;

  return (
    <Box sx={{ display: "felex", justifyContent: "center", p: 5 }}>
      <Stack>
        {result.map((item) => {
          item.label = item.label.replace("_", " ");
          return (
            <Box>
              <Typography variant="h4">{item.label}</Typography>
              <Typography variant="h5">{item.score}</Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
export default ResultVideoPage;
