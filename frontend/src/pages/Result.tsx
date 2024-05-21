import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

const ResutlASDImagePage: React.FC = () => {
  const location = useLocation();
  const result = location.state.result;
  const path = Object.values(result)[0];

  const type = String(Object.values(result)[1]);
  const confident = String(Object.values(result)[2]);
  //   console.log(Object.values(result[0]))
  return (
    <Box sx={{ display: "felex", justifyContent: "center", p: 5 }}>
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {type == "ASD_FACE" ? (
            <Typography variant="h3">ASD Face</Typography>
          ) : (
            <Typography>Non ASD Face</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">Confident: {confident}</Typography>
        </Box>
        <Box component="img" sx={{}} src={`http://127.0.0.1:8000/${path}`} />
      </Stack>
    </Box>
  );
};
export default ResutlASDImagePage;
