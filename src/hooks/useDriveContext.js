import { useContext } from "react";
import DriveContext from "../contexts/driveContext";

const useDriveContext = () => {
  const context = useContext(DriveContext);
  return context;
};

export default useDriveContext;
