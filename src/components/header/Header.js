import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppBar, Badge, Button, MenuItem, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import LanguageSwitcher from "../switcher/LanguageSwitcher";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopMenuItem from "./ShopMenuItem";
import {removeUser} from "../../store/slices/userSlice";

const Header = () => {

    const products = useSelector(state => state.cart);
    const totalQuantity = products.reduce((sum, {cartQuantity}) => sum + cartQuantity, 0);
    const {t} = useTranslation('header');
    const user = useSelector(state => state.user.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispach = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispach(removeUser());
    }

    return (
        <AppBar
            position="static"
            color="default"
            elevation={ 0 }
            sx={ {borderBottom: (theme) => `1px solid ${ theme.palette.divider }`} }>
            <Toolbar sx={ {flexWrap: 'wrap'} }>
                <Typography variant="h6"
                            color="inherit"
                            noWrap
                            sx={ {flexGrow: 1, textDecoration: 'unset'} }
                            to="/"
                            component={ NavLink }>
                    F.O.R.M
                </Typography>
                <nav>
                    <ShopMenuItem path="/" value={ t('products') }/>
                    { user?.roles.includes('ADMIN') && <ShopMenuItem path="/products/create" value={ t('create.product') }/>}

                    <ShopMenuItem path="/users/registration" value={ t('create.user') }/>

                </nav>
                {
                    user ?
                        <>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={ handleClick }
                                    size="small"
                                    sx={ {mx: 2} }
                                    aria-controls={ open ? 'account-menu' : undefined }
                                    aria-haspopup="true"
                                    aria-expanded={ open ? 'true' : undefined }
                                >
                                    <Avatar sx={ {width: 32, height: 32} }></Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={ anchorEl }
                                id="account-menu"
                                open={ open }
                                onClose={ handleClose }
                                onClick={ handleClose }
                                PaperProps={ {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                } }
                                transformOrigin={ {horizontal: 'right', vertical: 'top'} }
                                anchorOrigin={ {horizontal: 'right', vertical: 'bottom'} }>
                                <MenuItem>
                                    <Avatar/> {user.fullName}
                                </MenuItem>
                                <Divider/>
                                <MenuItem onClick={ handleClose }>
                                    <ListItemIcon>
                                        <Settings fontSize="small"/>
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={ onLogout }>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                        :
                        <Button variant="outlined"
                                sx={ {my: 1, mx: 1.5} }
                                component={ NavLink }
                                to="/login">
                            Login
                        </Button>
                }

                <LanguageSwitcher/>
            </Toolbar>
        </AppBar>
    )
        ;
}

export default Header;