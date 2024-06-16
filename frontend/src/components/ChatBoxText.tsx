import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { Box, Button, Typography } from "@mui/material";

const ChatBotText: React.FC = ({ chatText }: any) => {
  return (
    <>
      {chatText.map((message: any, index: any) => (
        <>
          {message.role[0] === "model" && (
            <Box
              component="div"
              sx={{ my: 2, p: 3, display: "flex", whiteSpace: "normal" }}
            >
              <SmartToyOutlinedIcon />:<Typography>{message.parts}</Typography>
            </Box>
          )}
          {message.role[0] === "user" && (
            <Box component="div" sx={{ my: 2, p: 3, whiteSpace: "normal" }}>
              <Typography textAlign="right">{message.parts}</Typography>
            </Box>
          )}
        </>
      ))}
      {chatText.length == 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Typography
            sx={{
              height: "40rem",
              fontSize: "40px",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            Type or Say Hello to Start
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChatBotText;
