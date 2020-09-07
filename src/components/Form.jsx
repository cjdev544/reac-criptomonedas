import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import useCoin from '../hooks/useCoin'
import useCryptocoin from '../hooks/useCrytocoin'
import Error from './Error'

/**
 *  Styled Components *************************************
 */
const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

 /* **************************************************** */

const Form = ( { setCoin, setCryptocoin }) => {

// useState ***********************************************
const [ criptoList, setCrytoList ] = useState( [] )

const [ error, setError ] = useState( false )

// useEffect **********************************************
useEffect( () => {
    const getApi = async () => {
        
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

        const res = await axios.get( url )

        setCrytoList( res.data.Data )
    }

    getApi()

}, [] )

/* ***************************************************** */

    const COINS = [
        { name: 'Dolar Americano', cod: 'USD' },
        { name: 'Euro', cod: 'EUR' },
        { name: 'Libra Esterlina', cod: 'GBP' },
        { name: 'Peso Mexicano', cod: 'MXN' }
    ]

// Custom Hooks from Select Form
    const [ coin, SelectCoin ] = useCoin( 'Elije la Mondeda', '', COINS );

    const [ cryptocoin, SelectCriptocoin ] = useCryptocoin( 'Elijee la Criptomoneda', '', criptoList ) 

    // Read Form and sen from App
    const readForm = e => {
        e.preventDefault()

        if( coin === '' || cryptocoin === '' ) {
            setError( true )
            return
        }

        setError( false )

        setCoin( coin )
        setCryptocoin( cryptocoin )
    }

    return ( 
        <form
            onSubmit={ readForm }
        >
            { error ? <Error message='Ambos campos deben der seleccionados' /> : null }

           <SelectCoin /> 

           <SelectCriptocoin />

            <Button 
                type="submit"
                value="Calcular"
            />
        </form>
     )
}

Form.propTypes = {
    setCoin: PropTypes.func.isRequired,
    setCryptocoin: PropTypes.func.isRequired
}
 
export default Form