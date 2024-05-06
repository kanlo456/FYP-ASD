import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from "@mui/material"
import Box from '@mui/material/Box';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { getGeminiChat } from "../util/http";
import { FormEvent, ReactElement } from "react";
import { useSubmit } from "react-router-dom";

const ChatbotPage: React.FC = () => {
    // const { data, isError, error } = useQuery({
    //     queryKey: ['chatBotData'],
    //     queryFn: ({ signal }) => getGeminiChat()
    // })
    const submit = useSubmit()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        submit(formData)
        const data = Object.fromEntries(formData);
        console.log(data)

        // console.log(test)
        console.log("Submitting....")
    }
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Paper elevation={6} sx={{ height: '75vh', minHeight: '75%' }}>
                <Box component='div' sx={{ my: 2, p: 3, display: 'flex', whiteSpace: 'normal' }}>
                    <SmartToyOutlinedIcon />:
                    <Typography>Hello</Typography>
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
                            id="chatText"
                            name="chatText"
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

export async function actions(request:any) {
    console.log("action...")
    const formData = await request.formData();
    const updatedChatData = Object.fromEntries(formData);
    const newText = await getGeminiChat(updatedChatData);
    console.log(newText);
}