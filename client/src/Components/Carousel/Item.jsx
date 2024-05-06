import { Paper, Button } from "@mui/material";

function Item({ item }) {
  return (
    <Paper>
      <img
        className="w-full"
        style={{ height: "30rem" }}
        src={item.image}
        alt="Farming Image"
      />
    </Paper>
  );
}

export default Item;
