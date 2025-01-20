'use client'
import Image from "next/image";
import React, { useState } from "react";
import {franc} from 'franc';
import langs from 'langs';


export default function Home() {
  
  const idiomasAceptados = ['en', 'es', 'fr', 'hi','pt'];

  const [texto, setTexto] = useState('Hello, how are you?');
  const [idiomaDetectado, setIdiomaDetectado] = useState<string>('en');
  const [ idiomaT, setIdiomaT ] = useState('fr');
  const [textoTaducido, setTextoTraducido]= useState('Bonjour, comment allez-vous');
  const [ErrorIdioma, setErrorDetectarIdioma]= useState('');
  
  

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const textoIngresado = event.target.value;
    setTexto(textoIngresado);
  
  };
  const detectarIdioma = (idioma: string)=>{
    if (idioma.length > 60) {
      const langCode = franc(idioma, { minLength: 4 });
      const idiomas = langs.where('3', langCode);
      if (idiomas) {
        
        setErrorDetectarIdioma('')
        const codeIdioma = idiomas[1]
        setIdiomaDetectado(codeIdioma)
      }
    }else{
      console.log('Texto muy corto para identidicar el idioma');
      setErrorDetectarIdioma('texto muy corto para identificar el idioma')
    }
  }
 
  const handleclick = async ( )=>{
      detectarIdioma(texto)
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${texto}&langpair=${idiomaDetectado}|${idiomaT}`);
      const data = await res.json()
      setTextoTraducido(data.responseData.translatedText)  
  }

  const handleIdioma = (idioma: string)=>{
    setIdiomaDetectado(idioma);
  }

  const textToSpeech = (text: string, idioma: string ) => {
    if (text.length > 0) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = idioma;
          speechSynthesis.speak(utterance);
      } else {
        alert('Lo siento, tu navegador no soporta la síntesis de voz.');
      }
    }
  }

  const cambiarTexto = ()=>{
    setIdiomaDetectado(idiomaT);
    
    setIdiomaT(idiomaDetectado);
    
    setTextoTraducido(texto);
    setTexto(textoTaducido)
  }

  return (
    <div className=" relative " >
      <div className=" absolute top-0 left-0 w-full h-[350px] overflow-hidden -z-10 " >
        <Image alt="" src={"/hero_img.jpg"} width={500} height={500} className=" max-w-[130%] w-[130%] " priority  />
      </div>
      <div className=" w-full m-auto flex justify-center pt-20 flex-col max-w-[90%] " >
        <div className=" w-[200px] h-[70px] relative m-auto " >
        <Image alt="" src={"/logo.svg"} fill />
        </div>
        <div className=" md:grid md:grid-cols-2 md:gap-3 md:mt-6 ">
          <div className=" rounded-3xl bg-[#191f2be0] bg-opacity-75 p-7  " >
             <ul className=" flex space-x-4 border-b border-b-[#D2D5DA] pb-4 items-center " >
              <li onClick={()=>detectarIdioma(texto)} className={`${idiomasAceptados.includes(idiomaDetectado) ? '':'bg-[#6e7177]'}   p-1 cursor-pointer bg-opacity-50 hover:bg-[#6e7177] rounded-lg `}  >Detect Language</li>
              <li className={`p-1 cursor-pointer bg-opacity-50 hover:bg-[#45474b] rounded-lg
                 ${ idiomaDetectado == 'en' ? 'bg-[#6e7177]':'' } `} onClick={()=>handleIdioma('en')}>English</li>
              <li  className={`p-1 cursor-pointer bg-opacity-50 hover:bg-[#6e7177] rounded-lg
                 ${ idiomaDetectado == 'fr' ? 'bg-[#6e7177]':'' } `} onClick={()=>handleIdioma('fr')}>French</li>
              <select name="" id="" onChange={(e) => handleIdioma(e.target.value)} className={` p-1 ${ idiomaDetectado == 'es' || idiomaDetectado == 'pt'|| idiomaDetectado == 'hi'  ? 'bg-[#6e7177] rounded-lg':'bg-transparent'   } `} value={idiomaDetectado} >
                <option value="" >Select language</option>
                <option value="es" className="  p-2 bg-[#394150] " >Spanish</option>
                <option value="hi" className="  p-2 bg-[#394150] " >Hindi</option>
                <option value="pt" className="  p-2 bg-[#394150] " >Portugués</option>
              </select>
             </ul>
             <textarea onChange={handleChange} name="" id="" className=" w-full h-[200px] bg-transparent pt-4 focus:outline-none font-semibold " value={texto} placeholder="Hello, how are you" maxLength={500} ></textarea>
             <div className="flex justify-between items-center">
              <p>{ErrorIdioma}</p>
             <span className=" flex justify-end " >{texto.length}/500</span>
             </div>
             <div className=" grid items-center  grid-cols-[max-content_max-content_1fr] gap-[10px] mt-2 " >
              <button onClick={()=>textToSpeech(texto, idiomaDetectado)} className=" border-[#2e3746ef]  border-2   rounded-lg p-1 ">
                 <Image src={"/sound_max_fill.svg"} alt={""} width={25} height={25}  />
              </button>
              <button  className=" border-[#2e3746ef] border-2   rounded-lg p-1 ">
              <Image src={"/Copy.svg"} alt={""} width={25} height={25}  />
              </button>
              <button onClick={handleclick} className=" space-x-3 flex items-center  font-bold justify-self-end rounded-lg py-2 px-5 bg-[#263FA9]" >
               <span> <Image alt="" src="/Sort_alfa.svg" width={20} height={20}  /> </span> Translate</button>
             </div>
          </div>
          <div className=" rounded-3xl bg-[#191f2be0] bg-opacity-75 p-7 mt-4 md:mt-0  " >
             <ul className=" grid grid-cols-[max-content_max-content_max-content_1fr] items-center space-x-4 border-b border-b-[#D2D5DA] pb-4 " >
              <li className={`p-1 cursor-pointer bg-opacity-50 hover:bg-[#6e7177] rounded-lg
                 ${ idiomaT == 'en' ? 'bg-[#6e7177]':'' } `}  onClick={()=>{setIdiomaT('en')}} >English</li>
              <li className={`p-1 cursor-pointer bg-opacity-50 hover:bg-[#6e7177] rounded-lg
                 ${ idiomaT == 'fr' ? 'bg-[#6e7177]':'' } `}  onClick={()=>{setIdiomaT('fr')}} >French</li>
              <select name="" id="" onChange={(e)=>{
                setIdiomaT(e.target.value)}} value={idiomaT} className={` p-1 ${ idiomaT == 'es' || idiomaT == 'pt'|| idiomaT == 'hi'  ? 'bg-[#6e7177] rounded-lg':'bg-transparent'   } `}  >
                <option value="">Select language</option>
                <option value="es" className="  p-2 bg-[#394150] " >Spanish</option>
                <option value="hi" className="  p-2 bg-[#394150] " >Hindi</option>
                <option value="pt" className="  p-2 bg-[#394150] " >Portugés</option>
              </select>
              <button onClick={cambiarTexto} className="border-[#2e3746ef] border-2 justify-self-end   rounded-lg p-1" >
                <Image src={"/Horizontal_top_left_main.svg"} alt={""} width={25} height={25} />
              </button>
             </ul>
             <textarea onChange={(e)=>setTextoTraducido(e.target.value)} name="" id="" className=" w-full h-[200px] bg-transparent pt-4 focus:outline-none font-semibold " maxLength={500} value={textoTaducido} ></textarea>
             <div className=" grid items-center  grid-cols-[max-content_max-content] gap-[10px] mt-2 " >
              <button onClick={()=>textToSpeech(textoTaducido, idiomaT)} className=" border-[#2e3746ef]  border-2   rounded-lg p-1 ">
                 <Image src={"/sound_max_fill.svg"} alt={""} width={25} height={25}  />
              </button>
              <button className=" border-[#2e3746ef] border-2   rounded-lg p-1 ">
              <Image src={"/Copy.svg"} alt={""} width={25} height={25}  />
              </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
