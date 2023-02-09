import Stack from "@mui/material/Stack";

export default function Story() {
  return (
    <>
      <Stack direction="row" spacing={2} className="storyContainer">
        <img
          className="storyAvatar"
          src="https://images.unsplash.com/photo-1670328592688-83708188bb26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt="Remy Sharp"
          className="storyAvatar"
          src="https://images.unsplash.com/photo-1669844777296-7319443f0e30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
        <img
          alt="Remy Sharp"
          className="storyAvatar"
          src="https://images.unsplash.com/photo-1670296168599-f34d9beb2147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        />
      </Stack>
    </>
  );
}
