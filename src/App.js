import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import styled from '@emotion/styled'
import image from './cryptomonedas.png'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'

/**
 *  Styled Components *************************************
 */
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`

 /* **************************************************** */

function App() {

  // useState
  const [ coin, setCoin ] = useState( '' )

  const [ cryptocoin, setCryptocoin ] = useState( '' )

  const [ result, setResult ] = useState( {} )

  const [ loaded, setLoaded ] = useState( false )


  // Search result of API whit useEffect
  useEffect( () => {

    if( coin === '' ) return 

    const getApi = async () => {

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cryptocoin }&tsyms=${ coin }`

      const res = await Axios.get( url )

      setLoaded( true )


      setTimeout(() => {

        setResult( res.data.DISPLAY[ cryptocoin ][ coin ] )
        setLoaded( false )

      }, 3000);
    }

    getApi()

  }, [ coin, cryptocoin ])

  const showComponent = ( loaded ) ? <Spinner /> : <Result result={ result } />


  return (
    <Container>
      <div>
        <Image 
          src={ image }
          alt="Imagen de criptomonedas"
        />
      </div>
      <div>
        <Heading>Cotizador de criptomonedas</Heading>

        <Form
          setCoin={ setCoin }
          setCryptocoin={ setCryptocoin }
        />

        {
          ( coin === '' ) ? null : showComponent
        }

      </div>
    </Container>
  )
}

export default App
