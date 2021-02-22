//axios-hooks from https://github.com/simoneb/axios-hooks
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import useAxios from 'axios-hooks';
import StarIcon from '@material-ui/icons/Star';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({ 
    subHead: {
        textAlign: "center",
        paddingBottom: theme.spacing(3),
        background: "#3f51b5",
        color: "#ffffff",
    },
    star: {
        color: "#ffdc1f;",
    }
}));

export default function GoogleReview() {
    const classes = useStyles();
 
    return (
        <List>
            <ListItem className={classes.subHead} > 
                <ListItemText>
                    <Typography variant="h4" className={classes.promotes}>
                        Google Reviews
                    </Typography>
                </ListItemText>
            </ListItem>

            <Divider component="li" />

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="1" src="https://lh3.googleusercontent.com/-k_EefXq2QKs/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnypTYtq-qn4OpmVxW2v-9pznC7RQ/s50-c-c0x00000000/photo.jpg" />
                </ListItemAvatar>
            
            <ListItemText
                primary="Eva Al-Switi"
                secondary={
                    <React.Fragment>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    {" — Sherry has been doing my nails for over 3yrs! This establishment is so professional and I always leave with the best shellac manicure I’ve had. Strongly recommend this place!"}
                    </React.Fragment>
                }
            />
            </ListItem>
            
            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="1" src="https://lh3.googleusercontent.com/a-/AOh14Ggbu2g8BMora6KSUyiXKFrrsypUNpp3KObJsSMgDn8=s50-c-c0x00000000-ba2" />
                </ListItemAvatar>
            
            <ListItemText
                primary="Karley Hopwood"
                secondary={
                    <React.Fragment>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    {" — Cute spot in Humber Bay Shores! Sherry is wonderful and very professional, her nail salon is very clean and she did a really good job on my nails ! Will definitely be back ☺️"}
                    </React.Fragment>
                }
            />
            </ListItem>
            
            <Divider variant="inset" component="li" />

            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="1" src="https://lh3.googleusercontent.com/a-/AOh14GjGs0zhFIFZleDRZMFwIF9S0Ce6KyD0VJlEDKtc5Q=s50-c-c0x00000000" />
                </ListItemAvatar>

                <ListItemText
                    primary="Mabel Alvarez"
                    secondary={
                    <React.Fragment>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                    <StarIcon className={classes.star}/>
                        {" — great service, very clean and great prices. they always on time. the staff is very friendly. Happy to have a great place for nails in the neighborhood. 👌"}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}

