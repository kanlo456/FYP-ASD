import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDropzone } from "react-dropzone";
import { FileRejection } from "react-dropzone";
import PublishIcon from "@mui/icons-material/Publish";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenLoader } from "../util/auth";

const VideoDetectionPage: React.FC = () => {
  // const submit = useSubmit();
  const navigate = useNavigate();
  async function handleImageSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    const token = tokenLoader() || "";

    formData.append("asdVideoFile", image[0]);
    formData.append("token", token);
    const result = await axios.post(
      "http://127.0.0.1:8000/autism_video",

      formData,
      {
        headers: { "Content-Type": "multipart.form-data" },
      }
    );
    // sendAsdImage()
    console.log(result.data);

    navigate("../result_Video", { state: { result: result.data } });
  }

  const [files, setFiles] = useState<any>([]);
  const [image, setImage] = useState<any>();
  const [submitFile, setSubmitFile] = useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "video/mp4": [],
      },
      onDrop: (acceptedFiles) => {
        setImage(acceptedFiles);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        setSubmitFile(true);
      },
      //   autoFocus: true,
    });

  const acceptedFileItems = acceptedFiles.map((file: File) => (
    <>
      {file.name} - {file.size} bytes
    </>
  ));

  const thumbs = files.map((file: any) => (
    <Box
      sx={{ maxWidth: "50vw", maxHeight: "40vh" }}
      component="video"
      controls
      src={file.preview}
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  return (
    <Grid2
      container
      sx={{ display: "flex", justifyContent: "center" }}
      component="form"
      onSubmit={handleImageSubmit}
    >
      <Typography variant="h3">
        Please upload your child behaviour video(MP4)
      </Typography>
      <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            minHeight: "40vh",
            maxHeight: "40vh",
            maxWidth: "50vw",
            minWidth: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} name="ASD_image" type="file" />
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {thumbs}
            {!submitFile && (
              <>
                <Typography variant="h5">Drag drop your video here</Typography>
                <PublishIcon sx={{ fontSize: "5rem" }} />
              </>
            )}
          </Stack>
        </Paper>
      </Grid2>
      <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        {acceptedFileItems}
      </Grid2>
      <Grid2 xs={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Button>Cancel</Button>
      </Grid2>
      <Grid2 xs={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit">Submit</Button>
      </Grid2>
    </Grid2>
  );
};

export default VideoDetectionPage;

export async function action() {}
