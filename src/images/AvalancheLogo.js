import React from 'react';
import LogoImage from './raw/avax-logo.png'

/*
    Avalanche logo that wraps the png
*/
class AvalancheLogo extends React.Component {
    render() {
        return (
            <img src={LogoImage} style={this.props.sx} alt='avalanche-logo' />
        )
    }
}

AvalancheLogo.defaultProps = {
    square: false,
    sx: {}
}
export default React.forwardRef((props, ref) => <AvalancheLogo {...props} forwardedRef={ref} /> );