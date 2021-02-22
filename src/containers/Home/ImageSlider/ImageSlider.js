//Image Slider Tutorial from https://youtu.be/l1MYfu5YWHc
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SliderData } from './SliderData';
import { Grid, Button, Paper } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme => ({ 
    slider: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
    },
    sliderImage: {
        opacity: 1,
        animation: "$fadeInOpacity 1500ms",
        width: "100%",
        height: "auto",
    },
    "@keyframes fadeInOpacity": {
        "0%": {
          opacity: 0,
        },
        "100%": {
          opacity: 1,
        }
    },
    arrowLeft: {
        position: "absolute",
        left: "2%",
        fontSize: theme.spacing(10),
        color: "#008cff",
        cursor: "pointer",
        zIndex: 2,
        "&:hover": {
            color: "#3f51b5",
        },
    },
    arrowRight: {
        position: "absolute",
        right: "2%",
        fontSize: theme.spacing(10),
        color: "#008cff",
        cursor: "pointer",
        zIndex: 2,
        "&:hover": {
            color: "#3f51b5",
        },
    },
}));

export default function ImageSlider() {
    const classes = useStyles();
    const [current, setCurrent] = React.useState(0);
    const length = SliderData.length;

    const nextImage = () => {
        
        if (current === length - 1) {
            setCurrent(0);
        }
        else {
            setCurrent(current + 1);
        }
    }

    const prevImage = () => {
        if (current === 0) {
            setCurrent(length - 1);
        }
        else {
            setCurrent(current - 1);
        }
    }

    React.useEffect(() => {
        const timer = setInterval(() => nextImage(), 3000)
        
        return () => clearInterval(timer)
    })
     

    console.log(current)
    return (
        <section className={classes.slider} >
            <ChevronLeftIcon className={classes.arrowLeft} onClick={prevImage} />
            <ChevronRightIcon className={classes.arrowRight} onClick={nextImage} />
            {SliderData.map((slider, index) => {
                return (
                    <div className={index === current ? 'slider active' : 'slide'} key={index}>
                        {index === current && (
                            <img src={slider.image} alt="nails" className={classes.sliderImage} />
                        )}
                    </div>
                )
            })}
        </section>
    );

}

