import { default as MUIBreadcrumbs } from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Breadcrumbs = ({ breadCrumbs = [] }) => (
  <MUIBreadcrumbs aria-label="breadcrumb">
    {breadCrumbs.map((breadCrumb) => {
      const ElementToUse = breadCrumb.type === "link" ? Link : Typography;
      return (
        <ElementToUse
          key={breadCrumb.id}
          underline="hover"
          color={breadCrumb.color}
          sx={breadCrumb.sx || {}}
          onClick={(event) => {
            event.preventDefault();
            if (!breadCrumb.disabled) breadCrumb.onClick(breadCrumb);
          }}
        >
          {breadCrumb.label}
        </ElementToUse>
      );
    })}
  </MUIBreadcrumbs>
);

export default Breadcrumbs;
