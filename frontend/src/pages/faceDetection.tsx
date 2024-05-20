import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDropzone } from "react-dropzone";
import { FileRejection } from "react-dropzone";
import PublishIcon from "@mui/icons-material/Publish";
import { useState } from "react";
import { Form, useNavigate, useSubmit } from "react-router-dom";
import { sendAsdImage } from "../util/http";
import axios from "axios";

const FaceDetectionPage: React.FC = () => {
  // const submit = useSubmit();
  function handleImageSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("asdImageFile", image[0]);
    axios.post("http://127.0.0.1:8000/autism_image", formData, {
      headers: { "Content-Type": "multipart.form-data" },
    });
    // sendAsdImage()
  }

  function handleTest() {}
  const [files, setFiles] = useState<any>([]);
  const [image, setImage] = useState<any>();
  const [submitFile, setSubmitFile] = useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
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
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: FileRejection) => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );
  const thumbs = files.map((file: any) => (
    <Box
      sx={{ maxWidth: "50vw" }}
      component="img"
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
      <Typography variant="h3">Please upload your child image</Typography>
      <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          sx={{
            minHeight: "40vh",
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
                <Typography variant="h5">Drag drop your image here</Typography>
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

export default FaceDetectionPage;

export async function action() {}
