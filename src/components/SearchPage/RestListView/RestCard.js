import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StarIcon from '@material-ui/icons/Star';
import WalkIcon from '@material-ui/icons/DirectionsWalk';
import blue from '@material-ui/core/colors/blue';

const restCardStyles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit * 2
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: theme.spacing.unit * 3
  },
  restImage: {
    width: '30%',
    '&>img': {
      width: '100%',
      height: '100%'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '70%'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    '&>a': {
      textDecoration: 'none',
    },
    '&>svg': {
      marginRight: theme.spacing.unit,
      color: blue[400]
    }
  },
  description: {
    color: blue[400]
  },
  featuredText: {
    display: 'flex',
    alignItems: 'center',
    '&>svg': {
      marginRight: theme.spacing.unit,
    }
  },
  restCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.unit
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  walkRatingContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  iconStat: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing.unit * 2,
    '&>svg': {
      marginRight: theme.spacing.unit * 0.5,
      color: blue[600]
    }
  },
  openCloseText: {
    color: blue[600]
  }
});

class RestCard extends PureComponent {
  render() {
    const {
      classes,
      id,
      image,
      title,
      description,
      featuredText,
      distance,
      openClose,
      rating
    } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <div>
              <div className={classes.title}>
                <LocationOnIcon />
                <Link to={`/rest/${id}`}>
                  <Typography variant="subtitle1" inline>
                    {title}
                  </Typography>
                </Link>
              </div>
              <Typography className={classes.description} variant="caption">
                {description}
              </Typography>
            </div>
            <div className={classes.featuredText}>
              <StarIcon />
              <Typography variant="caption" inline>
                {featuredText}
              </Typography>
            </div>
          </CardContent>
          <div className={classes.restImage}>
            <img
              src={image}
              alt={title}
            />
          </div>

        </Card>
        <div className={classes.restCardFooter}>
          <Typography variant="caption" className={classes.openCloseText}>
            {openClose}
            {bull}
            {`${distance} miles away`}
          </Typography>
          <div className={classes.walkRatingContainer}>
            <div className={classes.iconStat}>
              <WalkIcon />
              <Typography variant="caption" inline>
                6min
              </Typography>
            </div>
            <div className={classes.iconStat}>
              <StarIcon />
              <Typography variant="caption" inline>
                {`${rating}/5`}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(restCardStyles)(RestCard);
