import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

/**
 *  Styled Components *************************************
 */
const ResultDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Price = styled.p`
    font-size: 30px;

    span {
        font-weight:bold;
    }
`

 /* **************************************************** */

const Result = ( { result } ) => {
    return (  
        <ResultDiv>
            <Price>
                El precio es: <span>{ result.PRICE }</span> 
            </Price>
            <Info>
                Precio más alto del día: <span>{ result.HIGHDAY }</span> 
            </Info>
            <Info>
                Precio más bajo del día: <span>{ result.LOWDAY }</span> 
            </Info>
            <Info>
                Variación últimas 24 horas: <span>{ result.CHANGEPCT24HOUR }</span> 
            </Info>
            <Info>
                Última Actualización: <span>{ result.LASTUPDATE }</span> 
            </Info>
        </ResultDiv>
    )
}

Result.propTypes = {
    result: PropTypes.object.isRequired
}
 
export default Result