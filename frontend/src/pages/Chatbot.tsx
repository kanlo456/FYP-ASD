import { Box, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from "@mui/material"
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';

const ChatbotPage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting....")
    }
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Paper elevation={6} sx={{ height: '75vh', minHeight: '75%' }}>
                <Box component='div' sx={{ my: 2, p: 3, display: 'flex', whiteSpace: 'normal' }}>
                    <SmartToyOutlinedIcon />
                    <Typography >
                        :123wewewew2132asadsadfdsfdssadfddsfsdffdsfdsda212121212121212</Typography>
                </Box>
                <Box component='div' sx={{ my: 2, p: 3, whiteSpace: 'normal' }}>
                    <Typography textAlign='right'>Test</Typography>
                </Box>
            </Paper>
            <Box>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
                        <InputLabel htmlFor="inputText" >Input Text or Speak</InputLabel>
                        <OutlinedInput
                            id="inputText"
                            endAdornment={
                                <InputAdornment position="end" sx={{ display: "flex", gap: 1 }}>
                                    <IconButton edge="end">
                                        <KeyboardVoiceOutlinedIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        type="submit"
                                        edge="end"
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Input Text or Speak"
                        />
                    </FormControl>
                </form>
            </Box>
        </Container>
    )
}

export default ChatbotPage