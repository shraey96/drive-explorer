import React, { useMemo } from "react";
import { arrayOf, object, string, oneOf, func } from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import BreadCrumbs from "../../../components/BreadCrumbs";
import SearchInputContainer from "./SearchInputContainer";
import { getBreadCrumbsFromFolderStack } from "../../../utils/drive";
import { isEmpty } from "../../../utils/generic";
import backArrowIcon from "../../../assets/icons/back_arrow.png";
import { NAVBAR_CONTAINER_STYLE } from "../styles";

const Navbar = ({
  title,
  navbarPosition,
  breadCrumbs,
  itemToPaste,
  onBackButtonClick,
  onBreadCrumbClick,
  onSearchTermUpdate,
  onItemPaste,
}) => {
  const formattedBreadCrumbs = useMemo(
    () => getBreadCrumbsFromFolderStack(breadCrumbs, onBreadCrumbClick),
    [breadCrumbs.length]
  );

  const isBackButtonDisabled = breadCrumbs.length === 1;

  return (
    <AppBar position={navbarPosition}>
      <Toolbar>
        <Box sx={NAVBAR_CONTAINER_STYLE}>
          {!isEmpty(title) ? (
            <p>{title}</p>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={backArrowIcon}
                alt="arrow-back"
                onClick={isBackButtonDisabled ? null : onBackButtonClick}
                className={`navbar-arrow-back ${
                  isBackButtonDisabled ? "navbar-arrow-back--disabled" : ""
                }`}
              />
              <BreadCrumbs breadCrumbs={formattedBreadCrumbs} />
            </Box>
          )}
          <Box>
            {itemToPaste ? (
              <Button
                sx={{ mr: 2 }}
                color="success"
                variant="contained"
                onClick={onItemPaste}
              >
                Paste
              </Button>
            ) : null}
            <SearchInputContainer onDebouncedChange={onSearchTermUpdate} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  title: string,
  navbarPosition: string,
  breadCrumbs: arrayOf(object),
  itemToPaste: oneOf([object, null]),
  onBackButtonClick: func,
  onBreadCrumbClick: func,
  onSearchTermUpdate: func,
  onItemPaste: func,
};

Navbar.defaultProps = {
  title: "",
  navbarPosition: "relative",
  breadCrumbs: [],
  itemToPaste: null,
  onBackButtonClick: () => null,
  onBreadCrumbClick: () => null,
  onSearchTermUpdate: () => null,
  onItemPaste: () => null,
};

export default Navbar;
