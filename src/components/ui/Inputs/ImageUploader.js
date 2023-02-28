import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import Image from "next/image";
import Alert from "@mui/material/Alert";

import { useState } from "react";
import { Box } from "@mui/system";

const maxNumber = 1;

const ImageUploader = (props) => {
  const [image, setImage] = useState([]);
  const imageUploadHandler = (imageList) => {
    setImage(imageList);
    if (imageList.length > 0) {
      props.value(imageList[0].data_url.split(",")[1]);
    }
  };

  return (
    <ImageUploading
      multiple={false}
      value={image}
      onChange={imageUploadHandler}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={["jpg", "png", "jpeg"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemoveAll,
        errors,
      }) => (
        <>
          {!(imageList.length > 0) && (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onImageUpload}
            >
              Click Here To Upload Profile Picture
            </Button>
          )}

          {imageList.length > 0 && (
            <>
              <Box>
                <Image
                  alt="profilePicture"
                  src={imageList[0]["data_url"]}
                  width="150"
                  height="150"
                  className="profile"
                  style={{
                    borderRadius: "50%",
                    marginLeft: "15px",
                    marginBottom: "5px",
                    border: "1px solid",
                    borderColor: "#C2C2C2",
                  }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={onImageUpdate}
                sx={{ mr: 2, ml: 2 }}
              >
                Update
              </Button>
              <Button variant="contained" onClick={onImageRemoveAll}>
                Delete
              </Button>
            </>
          )}
          {errors && (
            <div>
              {errors.maxNumber && (
                <Alert key="maxNumberError" variant="filled" severity="warning">
                  Number of selected images exceed maxNumber
                </Alert>
              )}
              {errors.acceptType && (
                <Alert key="fileTypeError" variant="filled" severity="warning">
                  Your selected file type is not allow
                </Alert>
              )}
              {errors.maxFileSize && (
                <Alert
                  key="maxfileSizeError"
                  variant="filled"
                  severity="warning"
                >
                  Selected file size exceed maxFileSize
                </Alert>
              )}
              {errors.resolution && (
                <Alert
                  key="resolutionError"
                  variant="filled"
                  severity="warning"
                >
                  Selected file is not match your desired resolution
                </Alert>
              )}
            </div>
          )}
        </>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
