import React from 'react';
import clsx from 'clsx';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';

import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

import config from '../../config/config.json';

import { StateContext } from '../Context/Context';

const MAP_STYLE = {
  position: 'relative',
  width: 'calc(100vw - 408px)',
  height: '100vh',
};

const DEFAULT_ZOOM = 12;

const DEFAULT_CENTER = {
  lat: 31.768319,
  lng: 35.21371,
};

const useStyles = makeStyles((theme) => ({
  imgSwipe: {
    width: '216px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '384px',
  },
  prevBtn: {
    backgroundColor: '#ffffff99',
    position: 'absolute',
    left: 0,
    top: 0,
    transform: 'translateY(180px)',
  },
  nextBtn: {
    backgroundColor: '#ffffff99',
    position: 'absolute',
    right: 0,
    top: 0,
    transform: 'translateY(180px)',
  },
}));

const PropertyMap = ({ google }) => {
  const [property, setProperty] = React.useState();
  const [bounds, setBounds] = React.useState();
  const [center, setCenter] = React.useState(DEFAULT_CENTER);
  const [activeMarker, setActiveMarker] = React.useState();
  const [isShowInfoWindow, setIsShowInfoWindow] = React.useState(false);

  const [img, setImg] = React.useState();
  const [imgIndex, setImgIndex] = React.useState(0);
  const [isFirstImg, setIsFirstImg] = React.useState(true);
  const [isLastImg, setIsLastImg] = React.useState(false);

  const classes = useStyles();
  const { properties } = React.useContext(StateContext);

  const onClickMarker = React.useCallback((props, marker, ev) => {
    setProperty(props.property);

    setActiveMarker(marker);
    setIsShowInfoWindow(true);

    const newCenter = {
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    };
    setCenter(newCenter);
  }, []);

  const markerRenderer = React.useMemo(
    () =>
      properties.map((p, index) => (
        <Marker
          key={index.toString()}
          property={p}
          position={{ lat: p.lat, lng: p.lng }}
          onClick={onClickMarker}
        />
      )),
    [onClickMarker, properties],
  );

  const onClickNextBtn = React.useCallback(() => {
    const imgLength = property.images.length - 1;
    const nextIndex = imgIndex === imgLength ? imgLength : imgIndex + 1;
    setImgIndex(nextIndex);
  }, [imgIndex, property]);

  const onClickPrevBtn = React.useCallback(() => {
    const prevIndex = imgIndex === 0 ? 0 : imgIndex - 1;
    setImgIndex(prevIndex);
  }, [imgIndex]);

  const onOpenInfoWindow = React.useCallback(() => {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    nextBtn && nextBtn.addEventListener('click', onClickNextBtn);
    prevBtn && prevBtn.addEventListener('click', onClickPrevBtn);
  }, [onClickNextBtn, onClickPrevBtn]);

  const onCloseInfoWindow = React.useCallback(() => {
    setIsShowInfoWindow(false);

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    nextBtn && nextBtn.removeEventListener('click', onClickNextBtn);
    prevBtn && prevBtn.removeEventListener('click', onClickPrevBtn);
  }, [onClickNextBtn, onClickPrevBtn]);

  const infoWindowRenderer = React.useMemo(
    () =>
      property && (
        <InfoWindow
          marker={activeMarker}
          visible={isShowInfoWindow}
          onOpen={onOpenInfoWindow}
          onClose={onCloseInfoWindow}>
          <div className="w-240">
            <h2 className="my-0"> {property.name} </h2>
            <p className="my-0 text-muted f-12"> {property.address} </p>
            {img && (
              <div className={classes.imgSwipe}>
                <img
                  alt={img.description}
                  src={img.url}
                  className={classes.img}
                />
                {!isLastImg && (
                  <button
                    type="button"
                    id="next-btn"
                    className={clsx('btn', 'btn-fab', classes.nextBtn)}>
                    <NavigateNextIcon />
                  </button>
                )}
                {!isFirstImg && (
                  <button
                    type="button"
                    id="prev-btn"
                    className={clsx('btn', 'btn-fab', classes.prevBtn)}>
                    <NavigateBeforeIcon />
                  </button>
                )}
                <span className="f-16 mr-1">{img.description}</span>
                <span>&#x25CF;</span>
                <span className="ml-1 text-italic">{img.size}</span>
              </div>
            )}
          </div>
        </InfoWindow>
      ),
    [
      property,
      activeMarker,
      isShowInfoWindow,
      onOpenInfoWindow,
      onCloseInfoWindow,
      img,
      classes,
      isFirstImg,
      isLastImg,
    ],
  );

  React.useEffect(() => {
    if (!property) return;

    const newImg = property.images[imgIndex];
    setImg(newImg);

    const firstImg = imgIndex === 0;
    const lastImg = imgIndex === property.images.length - 1;
    setIsFirstImg(firstImg);
    setIsLastImg(lastImg);
  }, [imgIndex, property]);

  // set map center & bounds according to properties length
  React.useEffect(() => {
    const boundsTemp = new google.maps.LatLngBounds();

    switch (properties.length) {
      case 0:
        break;
      case 1:
        setCenter({ lat: properties[0].lat, lng: properties[0].lng });
        break;
      default:
        properties.forEach((p) =>
          boundsTemp.extend({ lat: p.lat, lng: p.lng }),
        );
        setBounds(boundsTemp);
        break;
    }
  }, [google, properties]);

  React.useEffect(() => {
    if (!property) return;

    setImg(property.images[0]);
    setImgIndex(0);
  }, [property]);

  return (
    <Map
      google={google}
      containerStyle={MAP_STYLE}
      zoom={DEFAULT_ZOOM}
      initialCenter={center}
      center={center}
      bounds={bounds}>
      {markerRenderer}
      {infoWindowRenderer}
    </Map>
  );
};

export default GoogleApiWrapper({ apiKey: config.googlemapkey })(PropertyMap);
