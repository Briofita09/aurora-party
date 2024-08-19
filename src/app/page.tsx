'use client'

import { useState } from "react";

import Image from "next/image";
import { Button, HStack, Input, List, ListIcon, ListItem, useNumberInput } from "@chakra-ui/react";
import { Hearts } from 'react-loader-spinner'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import everest from '@/logos/everest.png'
import skye from '@/logos/patrulha-canina-skye-11.png'
import pawLogo from '@/logos/paw_logo.svg'

import wheel from '../logos/wheel.png'
import redCar from '../logos/redCar.png'
import blueCar from '../logos/blueCar.png'



export default function Home() {
  const [name, setName] = useState<string>('')
  const [adultsValue, setAdultsValue] = useState<number>(0);
  const [kidsValue, setKidsValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)
  const [hints, setHints] = useState<boolean>(false)
  const [thanks, setThanks] = useState<boolean>(true)
  const {
    getInputProps: getAdultsInputProps,
    getIncrementButtonProps: getAdultsIncrementButtonProps,
    getDecrementButtonProps: getAdultsDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 0,
    max: 6,
    onChange: (valueString) => setAdultsValue(parseInt(valueString)),
    isDisabled: loading
  });

  const adults = getAdultsInputProps();

  const {
    getInputProps: getKidsInputProps,
    getIncrementButtonProps: getKidsIncrementButtonProps,
    getDecrementButtonProps: getKidsDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 0,
    max: 6,
    onChange: (valueString) => setKidsValue(parseInt(valueString)),
    isDisabled: loading
  });
  const kids = getKidsInputProps();

  async function handleSubmit() {
    try {
      setLoading(true)
      const payload = {
        name,
        kids: kidsValue,
        adults: adultsValue
      }
      await axios.post('https://aurora-party-back.onrender.com', payload)
      toast('Obrigado por confirmar sua presença!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast('Ocorreu um erro, entre em contato com os pais!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

  }

  return (
    <main
      className="bg-custom-image bg-cover bg-center min-h-screen p-4"
    >
      <ToastContainer />
      <div className="flex justify-around">
        <div className="flex flex-col justify-center">
          <Image src={redCar} alt="car1" height={80} />
        </div>
        <div>
          <h1 className="font-bold text-center text-2xl text-white">Adam</h1>
          <h2 className="text-center text-white">convida vocês para o seu</h2>
          <h2 className="text-center text-white">sexto aniversário</h2>

          <h2 className="text-xl text-center font-bold mt-4 text-white">Quando?</h2>
          <p className="text-center text-white">Sábado, 31 de agosto - 16h</p>

          <h2 className="text-xl text-center font-bold mt-4 text-white">Onde?</h2>
          <p className="text-center text-white">Av, Doutor Moura Ribeiro, 125 - AcquaPlay</p>

        </div>
        <div className="flex flex-col justify-center">
          <Image src={blueCar} alt="blue car" height={80} />
        </div>

      </div>


      <div className="w-[90vw] flex items-center mt-2">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.0864353599554!2d-46.35298812380839!3d-23.957383478529767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce03442c4c4d73%3A0x11f29d3d129d21da!2sAcqua%20Play%20Home%20%26%20Resort!5e0!3m2!1spt-BR!2sbr!4v1724039663604!5m2!1spt-BR!2sbr" width="100%" height="180" style={{ border: '0px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {
        !hints ? (
          <form className="mt-4 flex flex-col gap-3">

            <div className="flex justify-between items-center text-white">
              <label htmlFor="name">Seu nome:</label>
              <input type="text" className="bg-yellow-200 rounded-md w-60 text-black p-2" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
            </div>
            <div className="flex justify-between items-center text-white">
              <label>Número de adultos</label>

              <HStack maxW='140px'>

                <Button {...getAdultsDecrementButtonProps()}>-</Button>
                <Input {...adults} bgColor='#fff894' variant='filled' className="text-black" />
                <Button {...getAdultsIncrementButtonProps()}>+</Button>
              </HStack>
            </div>

            <div className="flex justify-between items-center text-white">
              <label>Número de crianças</label>

              <HStack maxW='140px'>

                <Button {...getKidsDecrementButtonProps()}>-</Button>
                <Input {...kids} bgColor='#fff894' variant='filled' className="text-black" />
                <Button {...getKidsIncrementButtonProps()}>+</Button>
              </HStack>
            </div>


            <Button bgColor='#fff894' onClick={handleSubmit} isDisabled={loading}>
              {!loading ? "Confirmar Presença" : <Hearts
                height="80"
                width="80"
                color="#d99ec3"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />}
            </Button>

          </form>
        ) :
          (
            <List spacing={3} mt={4}>
              <ListItem className="flex items-center text-white">
                <ListIcon as={Image} src={wheel} boxSize={8} />
                Adam calça 29 e veste tamanho 6
              </ListItem>
              <ListItem className="flex items-center text-white">
                <ListIcon as={Image} src={wheel} boxSize={8} />
                Ama meios de transporte
              </ListItem>
              <ListItem className="flex items-center text-white">
                <ListIcon as={Image} src={wheel} boxSize={8} />
                Adora heróis, principalmente o homem aranha Miles Morales.
              </ListItem>
              <ListItem className="flex items-center text-white">
                <ListIcon as={Image} src={wheel} boxSize={8} />
                Gosta de jogos de tabuleiro (ex.: pizza maluca, Cara a cara…), quebra cabeça, carros, aviões, helicóptero, beyblades e instrumentos musicais (bateria e microfone)
              </ListItem>
              <ListItem className="flex items-center text-white">
                <ListIcon as={Image} src={wheel} boxSize={8} />
                Aprecia roupa de time de futebol.
              </ListItem>
            </List>
          )
      }

      <h3 className="mt-5 text-center font-bold text-white" onClick={() => setHints(!hints)}>{!hints ? "Ideias de presente? Clique aqui!" : "Confirme sua presença clicando aqui!"}</h3>
    </main >
  );
}
