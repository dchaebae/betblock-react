import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import {ReactComponent as PolygonSvg} from './raw/polygon-logo.svg'

/*
    Polygon SVG converted into an Icon component for material-UI
*/
class PolygonLogo extends React.Component {
    render() {
        const {forwardedRef, ...props} = this.props
        return (
            <SvgIcon {...props} inheritViewBox component={PolygonSvg} ref={forwardedRef} />
        )
    }
}

export default React.forwardRef((props, ref) => <PolygonLogo {...props} forwardedRef={ref} /> );