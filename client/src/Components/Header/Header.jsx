import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { getLocalStorageData, getUserInitials } from "@/utils/helper";
import { logout } from "@/Features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartDetailsAsync,
  selectCartDetail,
  selectIsAddCart,
} from "@/Features/Cart/cartSlice";
import {
  getCreditsAsync,
  selectUserCredits,
} from "@/Features/Credit/creditSlice";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAuthenticated, selectIsAuthenticated] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartDetail);
  const isAddToCart = useSelector(selectIsAddCart);
  const userCredits = useSelector(selectUserCredits);

  useEffect(() => {
    dispatch(getCartDetailsAsync());
  }, [dispatch, isAddToCart]);

  useEffect(() => {
    dispatch(getCreditsAsync());
  }, []);

  useEffect(() => {
    selectIsAuthenticated(getLocalStorageData("isAuthenticated"));
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  const handleLogout = () => {
    router.push("/");
    dispatch(logout());
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleHomeRoute = () => {
    router.push("/");
  };

  return (
    <AppBar
      className="bg-green-400"
      position="fixed"
      style={{ top: visible ? 0 : -64, transition: "top 0.5s" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AgricultureIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "3rem",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            INSTAFARM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  handleHomeRoute();
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* Mobile View */}
          <AgricultureIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "3rem",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            INSTAFARM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                handleHomeRoute();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
          </Box>

          {isAuthenticated && (
            <div className="flex justify-end items-center gap-5 mr-8 ">
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <div sx={{ my: 2, color: "white", display: "block" }}>
                  InstaCredits{" "}
                  <BoltRoundedIcon className="bg-yellow-500 rounded-full text-xl" />{" "}
                  {userCredits || 0}
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => router.push("/cart")}
                  className="hover:cursor-pointer"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <div className="flex items-center">
                    <LocalMallOutlinedIcon className="text-3xl" />{" "}
                    <span className="ml-1 text-xl">
                      {cart?.totalItems || 0}
                    </span>
                  </div>
                </div>
              </Box>
            </div>
          )}

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    className="text-2xl"
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Add Credits</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link
              className="text-lg font-semibold p-2 rounded-lg hover:bg-white hover:text-black"
              href={"/login"}
            >
              Log In
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
