import {NavLink} from "react-router-dom";
import {Link} from "@mui/material";

const ShopMenuItem = ({path, value}) => (
    <Link
        variant="button"
        color="text.primary"
        to={path}
        component={NavLink}
        sx={{my: 1, mx: 1.5}}>
        {value}
    </Link>
)

export default ShopMenuItem;