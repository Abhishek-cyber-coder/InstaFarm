import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { NoSsr } from "@mui/material";
import { useDispatch } from "react-redux";
import { addedToCart, addToCartAsync } from "@/Features/Cart/cartSlice";
import { getLocalStorageData } from "@/utils/helper";
import { useRouter } from "next/router";

function ProductCard({ productDetails }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = getLocalStorageData("isAuthenticated");

  const handleAddToCart = (productId, quantity, e) => {
    e.stopPropagation();
    dispatch(addToCartAsync({ productId, quantity })).then(() => {
      dispatch(addedToCart());
    });
  };

  return (
    <NoSsr>
      <Card
        className="hover:cursor-pointer"
        onClick={() => router.push(`/product/${productDetails?._id}`)}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "30%",
        }}
      >
        <CardMedia
          sx={{ height: "20%", objectFit: "cover", aspectRatio: 1 }}
          image={productDetails?.images[0]}
          title="Product image"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {productDetails?.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <BoltRoundedIcon className="bg-yellow-400 rounded-full mr-1" />
            Credits: {productDetails?.calculatedCredits}
          </Typography>
        </CardContent>
        {isAuthenticated && (
          <CardActions>
            <Button
              onClick={(e) => handleAddToCart(productDetails?._id, 1, e)}
              size="small"
            >
              Add to Cart
            </Button>
          </CardActions>
        )}
      </Card>
    </NoSsr>
  );
}

export default ProductCard;
