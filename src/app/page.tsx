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
      toast('🦄 Obrigado por confirmar sua presença!', {
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
    <main className="bg-pink-300 min-h-screen p-4">
      <ToastContainer />
      <div className="flex justify-around">
        <div className="flex flex-col justify-center">
          <Image src={everest} alt="everest" height={80} />
        </div>
        <div>
          <h1 className="font-bold text-center text-2xl">Aurora</h1>
          <h2 className="text-center">convida vocês para o seu</h2>
          <h2 className="text-center">sexto aniversário</h2>

          <h2 className="text-xl text-center font-bold mt-4">Quando?</h2>
          <p className="text-center">Sábado, 8 de Junho</p>

          <h2 className="text-xl text-center font-bold mt-4">Onde?</h2>
          <p className="text-center">Rua, Fabio Montenegro, 10</p>

        </div>
        <div className="flex flex-col justify-center">
          <Image src={skye} alt="skye" height={80} />
        </div>

      </div>


      <div className="w-[90vw] flex items-center mt-2">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.893233721446!2d-46.33168368859918!3d-23.964215276427336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce030f539a7c39%3A0x8f1bdaf5af42e6da!2sR.%20F%C3%A1bio%20Montenegro%2C%2010%20-%20Gonzaga%2C%20Santos%20-%20SP%2C%2011060-475!5e0!3m2!1spt-BR!2sbr!4v1715562587210!5m2!1spt-BR!2sbr" width="100%" height="180" style={{ border: '0px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {
        !hints ? (
          <form className="mt-4 flex flex-col gap-3">

            <div className="flex justify-between items-center">
              <label htmlFor="name">Seu nome:</label>
              <input type="text" className="bg-yellow-200 rounded-md w-60 text-black p-2" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
            </div>
            <div className="flex justify-between items-center">
              <label>Número de adultos</label>

              <HStack maxW='140px'>

                <Button {...getAdultsDecrementButtonProps()}>-</Button>
                <Input {...adults} bgColor='#fff894' variant='filled' />
                <Button {...getAdultsIncrementButtonProps()}>+</Button>
              </HStack>
            </div>

            <div className="flex justify-between items-center">
              <label>Número de crianças</label>

              <HStack maxW='140px'>

                <Button {...getKidsDecrementButtonProps()}>-</Button>
                <Input {...kids} bgColor='#fff894' variant='filled' />
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
              <ListItem className="flex items-center">
                <ListIcon as={Image} src={pawLogo} boxSize={8} />
                Aurora calça 27 e veste 6-8
              </ListItem>
              <ListItem className="flex items-center">
                <ListIcon as={Image} src={pawLogo} boxSize={8} />
                Ama brilho e cores
              </ListItem>
              <ListItem className="flex items-center">
                <ListIcon as={Image} src={pawLogo} boxSize={8} />
                Adora roupas, laços e calçados
              </ListItem>
              <ListItem className="flex items-center">
                <ListIcon as={Image} src={pawLogo} boxSize={8} />
                Gosta de jogos de tabuleiro e itens de maquiagem/beleza
              </ListItem>
              <ListItem className="flex items-center">
                <ListIcon as={Image} src={pawLogo} boxSize={8} />
                Aprecia bichos de pelucia
              </ListItem>
            </List>
          )
      }

      <h3 className="mt-5 text-center font-bold" onClick={() => setHints(!hints)}>{!hints ? "Ideias de presente? Clique aqui!" : "Confirme sua presença clicando aqui!"}</h3>
    </main >
  );
}
