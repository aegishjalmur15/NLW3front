import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import SideBar from "../components/sideBar"
import MapIcon from "../utils/mapIcon";
import { FaNapster } from "react-icons/fa";
import { url } from "inspector";
import api from "../services/API";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage(){
  const history = useHistory()
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [images, setImages] = useState<File[]>([]);

  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [name,setName] = useState('');

  const [about,setAbout] = useState('');

  const [instructions,setInsctructions] = useState('');

  const [opening_hours,setOpeningHours] = useState('');

  const [open_on_weekends, setOpenOnWeekends] = useState(true)

  function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng}  =  event.latlng
    
    setPosition({
      latitude: lat,
      longitude: lng
    })
    
  } 

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image=>{
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedImagesPreview);
  }

  const { latitude, longitude} = position

  const data = new FormData;

  data.append('name', name);
  data.append('latitude', String(latitude));
  data.append('longitude', String(longitude));
  data.append('about', about);
  data.append('instructions', instructions);
  data.append('opening_hours', opening_hours);
  data.append('open_on_weekends', String(open_on_weekends));

  images.forEach(image=>{
    data.append('images', image)
  })



  function handleSubmit( event: FormEvent){
    event.preventDefault()

    api.post('orphanages', data).then(res=>{
      alert('Cadastro concluido!')
      history.push('/app');
    })
  }
  
  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-8.0231346,-34.9183836]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              { position.latitude !== 0 &&
              <Marker interactive={false} icon={MapIcon} position={[position.latitude, position.longitude]} />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event=> setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event=> setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              

              <div className="images-container">
              {previewImages.map(image=>{
                return(
                  <img key={image} src={image} alt={name}/>
                )
              })}
                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="images[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event=> setInsctructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event=> setOpeningHours(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                onClick={()=>setOpenOnWeekends(true)}
                >Sim
                </button>

                <button type="button" className={!open_on_weekends ? 'active' : ''}
                onClick={()=>setOpenOnWeekends(false)}
                >Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
