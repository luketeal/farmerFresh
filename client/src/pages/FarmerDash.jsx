import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { CREATE_FARM, REMOVE_FARM, REMOVE_ITEM, UPDATE_ITEM } from '../utils/mutations';
import { CREATE_ITEM } from '../utils/mutations';
import { USER_BY_ID } from '../utils/queries'
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';



const useStyles = makeStyles((theme) => ({

    title: {
        flexGrow: 1,
        margin: theme.spacing(4, 0, 2),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#F50057',
        borderRadius: 10,
        border: 0,
        color: 'white',
        height: 48,
        padding: '15px 45px',
        boxShadow: '5 0 20px #eee',
        marginTop: theme.spacing(3),
    },
    editIconSpace: {
        marginRight: theme.spacing(5),
    },
}));

export default function FarmerDash() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    // const [farmName, setFarmName] = React.useState()
    const [farmFormState, setFarmFormState] = React.useState({
        name: '',
        description: '',
        state: '',
        town: '',
        address: '',
        zip: '',
        website: '',
    })
    const [itemFormState, setItemFormState] = React.useState({
        name: '',
        price: '',
        unit: '',
        count: '',
        farmID: '',
    })
    let data1;

    let [addFarm, { loading: loadingNewFarm, error: errorNewFarm, data: dataNewFarm }] = useMutation(CREATE_FARM);
    let [addItem, { loading: loadingNewItem, error: errorNewItem, data: dataNewItem }] = useMutation(CREATE_ITEM);
    let [removeItem, { loading: loadingRemoveItem, error: errorRemoveItem, data: dataRemoveItem }] = useMutation(REMOVE_ITEM);
    let { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(USER_BY_ID, { pollInterval: 500 });
    let [isRegistered, setRegistered] = React.useState(loadingUser || dataUser.user.farms === undefined || dataUser.user.farms.length === 0 ? false : true);
    let [hasItems, setHasItems] = React.useState(isRegistered === false || dataUser.user.farms.items === undefined || dataUser.user.farms.items.length === 0 ? false : true)
    let [items, setItems] = React.useState(hasItems ? dataUser.user.farms[0].items : [])
    useEffect(() => {
        if (!loadingUser && dataUser.user.farms !== undefined && dataUser.user.farms.length !== 0) {
            setRegistered(true)
            setItemFormState(
                {
                    ...itemFormState,
                    farmID: dataUser.user.farms[0]._id,
                }
            )
            if (dataUser.user.farms[0].items !== undefined && dataUser.user.farms.length !== 0) {
                setHasItems(true)
                setItems(dataUser.user.farms[0].items)
            }
        }


    }, [dataUser, dataNewItem, dataNewFarm])

    const username = dataUser?.user?.name || "hmmm....";

    const handleFarmFormChange = (event) => {
        const { name, value } = event.target;

        setFarmFormState({
            ...farmFormState,
            [name]: value,
        });
    };

    const handleItemFormChange = (event) => {
        const { name, value } = event.target;

        setItemFormState({
            ...itemFormState,
            [name]: value
        })
    }

    const handleFarmFormSubmit = async (event) => {
        setRegistered(true)
        event.preventDefault();
        console.log(farmFormState);
        console.log(isRegistered)
        try {
            let { data } = await addFarm({
                variables: { ...farmFormState },
            })
            setItemFormState(
                {
                    ...itemFormState,
                    farmID: data.addFarm._id,
                }
            )

            //   Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }


        // clear form values
        setFarmFormState({
            name: '',
            description: '',
            state: '',
            town: '',
            address: '',
            zip: '',
            website: '',
        });
    };

    const handleItemFormSubmit = async (event) => {
        event.preventDefault();
        console.log(itemFormState);
        console.log(items)

        try {
            let { loading, error, data } = await addItem({
                variables: { ...itemFormState }
            });
            console.log(data)
        } catch (error) {
            console.error(error)
        }

        setItemFormState({
            ...itemFormState,
            name: '',
            price: '',
            unit: '',
            count: '',
        })
    };

    const handleRemoveItem = async (itemId) => {
        let removeItemVariables = {
            farmId: itemFormState.farmID,
            itemId: itemId
        }
        console.log(removeItemVariables)
        try {
            let { loading, error, data } = await removeItem({
                variables: { ...removeItemVariables }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container component="main" maxWidth="md" id="farmerDashContainer">

            <CssBaseline />

            <Typography component="h1" variant="h2">
                Hi {username}
            </Typography>

            <div className={classes.appBarSpacer} />

            <main className={classes.content}>
                {isRegistered === false ? (
                    <Typography variant="h4">
                        Register a farm below:
                    </Typography>
                ) : <Typography variant="h4">
                    Enter your farm items:
                </Typography>}

                {/* Farm input field */}
                {isRegistered === false ? (
                    <form className={classes.form} noValidate onSubmit={handleFarmFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Farm Name"
                                    name="name"
                                    autoComplete="name"
                                    value={farmFormState.name}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Farm Description"
                                    name="description"
                                    autoComplete="description"
                                    value={farmFormState.description}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="state"
                                    label="State"
                                    name="state"
                                    autoComplete="state"
                                    value={farmFormState.state}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="town"
                                    label="Town"
                                    name="town"
                                    autoComplete="town"
                                    value={farmFormState.town}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    value={farmFormState.address}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="zip"
                                    label="Zip Code"
                                    name="zip"
                                    autoComplete="zip"
                                    value={farmFormState.zip}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="website"
                                    label="Website"
                                    name="website"
                                    autoComplete="website"
                                    value={farmFormState.website}
                                    onChange={handleFarmFormChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Register
                        </Button>
                    </form>
                ) : <div></div>}

                <div className={classes.appBarSpacer} />

                <div>
                    {isRegistered ? (
                        <div>
                            {/* Veggie input field? */}
                            <form className={classes.form} noValidate onSubmit={handleItemFormSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Item Name"
                                            name="name"
                                            autoComplete="name"
                                            value={itemFormState.name}
                                            onChange={handleItemFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="price"
                                            label="Cost"
                                            name="price"
                                            autoComplete="price"
                                            value={itemFormState.price}
                                            onChange={handleItemFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="unit"
                                            label="Per? (example: lb or each)"
                                            name="unit"
                                            autoComplete="unit"
                                            value={itemFormState.unit}
                                            onChange={handleItemFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="count"
                                            label="Quantity Available"
                                            name="count"
                                            autoComplete="count"
                                            value={itemFormState.count}
                                            onChange={handleItemFormChange}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Submit Item
                                </Button>
                            </form>
                        </div>
                    ) : <div></div>}
                </div>

                <div>
                    {hasItems ? (
                        <div>
                            <Typography variant="h4" className={classes.title}>
                                Farm items and produce:
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <div id="listItems">
                                        <List dense={dense}>
                                            {items.length > 0 ? items.map((item) => (
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FolderIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={<p>{item.name}</p>}
                                                        secondary={<p>Costs: ${item.price}/{item.unit}.   Quantity Available: {item.count}</p>}
                                                    />

                                                    <div className={classes.appBarSpacer} />

                                                    <ListItemSecondaryAction>
                                                        <IconButton color="secondary" edge="end" aria-label="delete" onClick={() => handleRemoveItem(item._id,)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )) : <div></div>}
                                        </List>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                    ) : <div></div>}
                </div>

            </main>
        </Container >
    );
}
