import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { ChangeEvent, FormEvent } from "react";
import React, { useState, useEffect } from "react";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

import { tokenLoader } from "../util/auth";
import useSpeechRecognition from "../hook/useSpeechToText";
import {
  ActionFunctionArgs,
  Await,
  Form,
  defer,
  useLoaderData,
} from "react-router-dom";
import ChatBotText from "../components/ChatBoxText";

const ChatbotPage: React.FC = () => {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const [inputText, setInputText] = useState("");
  const [sendData, setSendData] = useState(false);

  const handleSubmitData = () => {
    setSendData(true);
    console.log("submit...");
    if (sendData) {
      console.log("reset");
      setInputText("");
      setSendData(false);
    }
  };
  const { chatText } = useLoaderData();
  useEffect(() => {
    if (text) {
      setInputText(inputText + text);
    }
  }, [text]);
  {
    console.log(chatText);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = tokenLoader();
    const response = await fetch("http://127.0.0.1:8000/geminChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatText: chatText,
        token: token,
      }),
    });
    // console.log(test)
  };
  function handleChange(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setInputText((prev) => e.target.value);
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper
        elevation={6}
        sx={{
          height: "75vh",
          minHeight: "75%",
          overflow: "auto",
          overscrollBehaviorY: "contain",
        }}
      >
        <Await resolve={chatText}>
          {/* <>{console.log(chatText.data)}</> */}
          {(loadedChatText) => <ChatBotText chatText={loadedChatText} />}
        </Await>
      </Paper>
      <Box>
        {text}
        <Form
          method="post"
          onSubmit={() => {
            setInputText("");
          }}
        >
          <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
            <InputLabel htmlFor="inputText">Input Text or Speak</InputLabel>
            <OutlinedInput
              id="chatText"
              name="chatText"
              onChange={handleChange}
              value={inputText}
              endAdornment={
                <InputAdornment position="end" sx={{ display: "flex", gap: 1 }}>
                  {!isListening ? (
                    <IconButton
                      edge="end"
                      onClick={startListening}
                      sx={{ color: "green" }}
                    >
                      <KeyboardVoiceOutlinedIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      onClick={stopListening}
                      sx={{ color: "red" }}
                    >
                      <StopCircleOutlinedIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    type="submit"
                    edge="end"
                    color="primary"
                    // onClick={handleSubmitData}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Input Text or Speak"
            />
          </FormControl>
        </Form>
      </Box>
    </Container>
  );
};

export default ChatbotPage;

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const method = request.method;

  const data = await request.formData();
  const chatText: any = data.get("chatText") || "";
  console.log("submitting", chatText);
  const token = tokenLoader();
  console.log("token", tokenLoader());
  console.log(method);
  const synthesis = window.speechSynthesis;

  try {
    if (chatText == "") {
      console.log("hello");
      return null;
    }
    if (chatText != "") {
      const response = await fetch("http://127.0.0.1:8000/geminChat", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatText: chatText,
          token: token,
        }),
      });
      const resData = await response.json();
      const utterance = new SpeechSynthesisUtterance(resData);
      const voices = synthesis.getVoices();
      utterance.lang = "zh-HK";
      utterance.voice = voices[1];
      utterance.rate = 1.7;
      synthesis.speak(utterance);

      return response.json;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
  return null;
}

async function loadChatData() {
  const response = await fetch("http://127.0.0.1:8000/get_chat_user_history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: tokenLoader() }),
  });

  const chatData = await response.json();
  // console.log(chatData["-O-L8kL33Qem5hJwjI4h"]["history"]["chatData"]);
  return chatData;
}

export async function loader() {
  return defer({
    chatText: loadChatData(),
  });
}
