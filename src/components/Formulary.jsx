import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { currencies } from '../data/Currencies'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulary = ({setCurrencies}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {

        const consultAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const answer = await fetch(url);
            const result = await answer.json()

            const arrayCriptos = result.Data.map(cripto => {

                const object = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
                return object;
            })

            setCriptos(arrayCriptos)
        }
        consultAPI()
    }, [])
    
    const [currency, SelectCurrencies] = useSelectCurrency('Select Your Currency', currencies)

    const [criptocurrency, SelectCriptocurrency] = useSelectCurrency('Select Your Criptocurrency', criptos)

    const handleSubmit = e =>{
        e.preventDefault()
        if ([currency, criptocurrency].includes('')) {
            setError(true)
            return
        }
        setError(false)
        setCurrencies({
            currency,
            criptocurrency
        })
    }

    
    return (
    <>
      {error && <Error>All fields are mandatory</Error>}
      <form
      onSubmit={handleSubmit}
      >
          <SelectCurrencies />
          <SelectCriptocurrency/>
                  
          <InputSubmit
              type="submit"
              value="Quote"
          />
            </form>
            </>
  )
}

export default Formulary
